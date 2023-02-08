import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { BsRecord } from "react-icons/bs";
import { allActions } from "../../../Redux/myActions";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const { Option } = Select;

const AddDocumentChecklistForCourse = ({
  record,
  isOnshore,
  isAddDocumentChecklistModalVisible,
  setIsAddDocumentChecklistModalVisible,
  fetchCourseDocumentChecklist,
}) => {
  const store = useSelector((state) => {
    return {
      documentState: state.DocumentManagementReducer,
      courseState: state.CoursesReducer,
    };
  });
  const actions = useDispatch();
  const [form] = Form.useForm();
  const [documentChecklistIdArr, setDocumentChecklistIdArr] = useState([]);
  const fetchDocuments = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/course/checkList/get-all/${
            isOnshore ? "onshore" : "offshore"
          }`,
          attempt: "FETCH_OFFSHORE_DOCUMENTS_REQUEST",
          success: "FETCH_OFFSHORE_DOCUMENTS_REQUEST_SUCCESS",
          failure: "FETCH_OFFSHORE_DOCUMENTS_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        }
      )
    );
  };
  useEffect(() => {
    if (isAddDocumentChecklistModalVisible) {
      fetchDocuments();
    }
  }, [isAddDocumentChecklistModalVisible]);
  const addDocumentChecklistSubmitHandler = (value) => {
    console.log("from ", value);
    const formData = {
      ...value,
      documentType: value.item,
    };
    const type = isOnshore === true ? "onshore" : "offshore";
    const formArrayData = value.checkListIds.map((item) => {
      return {
        id: item,
      };
    });
    const offShoreCheckListData = [
      ...store.courseState.documents.offShoreCheckList,
    ];
    const onShoreCheckListData = [
      ...store.courseState.documents.onShoreCheckList,
    ];
    const anotherChecklistDataArray = isOnshore
      ? offShoreCheckListData
      : onShoreCheckListData;
    console.log("checklis formatted array", formArrayData);
    console.log("anotherChecklistDataArray", anotherChecklistDataArray);
    console.log("Merged formatted array", [
      ...formArrayData,
      ...anotherChecklistDataArray,
    ]);

    actions(
      allActions(
        { checkListIds: [...formArrayData, ...anotherChecklistDataArray] },
        {
          method: "post",
          endPoint: `/course/checkList/select/${record.id}`,
          attempt: "ADD_COURSES_DOCUMENT_CHECKLIST_REQUEST",
          success: "ADD_COURSES_DOCUMENT_CHECKLIST_REQUEST_SUCCESS",
          failure: "ADD_COURSES_DOCUMENT_CHECKLIST_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            fetchCourseDocumentChecklist();
          },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({
    //   type: "ADD_COURSES_DOCUMENT_CHECKLIST_REQUEST",
    //   payload: { id: record.id, type, formData: { ...formData, isOnshore } },
    // });
    form.resetFields();
    setIsAddDocumentChecklistModalVisible(false);
  };
  console.log("fafksdjl onshore", store.courseState.documents.onShoreCheckList);
  console.log(
    "fafksdjl offshore",
    store.courseState.documents.offShoreCheckList
  );
  return (
    <Modal
      title="Add Document Checklist"
      open={isAddDocumentChecklistModalVisible}
      onCancel={() => {
        setIsAddDocumentChecklistModalVisible(false);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={addDocumentChecklistSubmitHandler}
        colon={true}
        form={form}
      >
        <Form.Item
          label="Documents"
          name={"checkListIds"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter a item!",
            },
          ]}
        >
          {isOnshore ? (
            <Checkbox.Group
              onChange={(e) => {
                console.log("from consultant group", e);
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {store.documentState?.onshoreDocuments?.data?.map((dataObj) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                      width: "50%",
                    }}
                  >
                    <Checkbox key={dataObj.id} value={dataObj.id}>
                      {dataObj.documentType}
                    </Checkbox>
                  </div>
                );
              })}
            </Checkbox.Group>
          ) : (
            <Checkbox.Group
              onChange={(e) => {
                console.log("from consultant group", e);
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {store.documentState?.offshoreDocuments?.data?.map((dataObj) => {
                return (
                  <div
                    key={dataObj.id}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                      width: "50%",
                    }}
                  >
                    <Checkbox value={dataObj.id}>
                      {dataObj.documentType}
                    </Checkbox>
                  </div>
                );
              })}
            </Checkbox.Group>
          )}
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Add Document Checklist
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDocumentChecklistForCourse;
