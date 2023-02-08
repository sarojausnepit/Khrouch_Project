import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { allActions } from "../../../Redux/myActions";
const { Option } = Select;

const UpdateDocumentCheckList = ({
  record,

  isOnshore,
  isUpdateDocumentChecklistModalVisible,
  setIsUpdateDocumentChecklistModalVisible,
  fetchOffshoreDocuments,
  fetchOnshoreDocuments,
}) => {
  const actions = useDispatch();
  const [form] = Form.useForm();
  // const fetchOnshoreDocuments = () => {
  //   actions(
  //     allActions(
  //       {},
  //       {
  //         method: "get",
  //         endPoint: `/course/checkList/get-all/${
  //           isOnshore ? "onshore" : "offshore"
  //         }`,
  //         attempt: "FETCH_ONSHORE_DOCUMENTS_REQUEST",
  //         success: "FETCH_ONSHORE_DOCUMENTS_REQUEST_SUCCESS",
  //         failure: "FETCH_ONSHORE_DOCUMENTS_REQUEST_FAILURE",
  //         //   navigateTo: null,
  //         //   successInternalState: (data) => {
  //         //     navigation.navigate("LeadDetails", { item });
  //         //   },
  //         saveBearerToken: true,
  //       }
  //     )
  //   );
  // };
  const updateDocumentCheckListSubmitHandler = (value) => {
    console.log("from ", value);
    const formData = {
      ...value,
      documentType: value.item,
    };
    const type = isOnshore === true ? "onshore" : "offshore";
    actions(
      allActions(
        { ...formData, isOnshore },
        {
          method: "put",
          endPoint: `/course/checkList/update/${record.id}`,
          attempt: "UPDATE_COURSES_DOCUMENT_CHECKLIST_REQUEST",
          success: "UPDATE_COURSES_DOCUMENT_CHECKLIST_REQUEST_SUCCESS",
          failure: "UPDATE_COURSES_DOCUMENT_CHECKLIST_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            if (isOnshore) {
              fetchOnshoreDocuments();
            } else {
              fetchOffshoreDocuments();
            }
          },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({
    //   type: "UPDATE_COURSES_DOCUMENT_CHECKLIST_REQUEST",
    //   payload: {
    //     courseIdtoFetch: record.id,
    //     id: documentRecord.id,
    //     type,
    //     formData: { ...formData, isOnshore },
    //   },
    // });
    form.resetFields();
    setIsUpdateDocumentChecklistModalVisible(false);
  };
  return (
    <Modal
      title="Update Document Checklist"
      open={isUpdateDocumentChecklistModalVisible}
      onCancel={() => {
        setIsUpdateDocumentChecklistModalVisible(false);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={updateDocumentCheckListSubmitHandler}
        colon={true}
        form={form}
        fields={[
          {
            name: ["item"],
            value: record.item,
          },
          {
            name: ["documentSize"],
            value: record.documentSize,
          },
          {
            name: ["documentType"],
            value: record.documentType,
          },
        ]}
      >
        <Form.Item
          label="Document Name"
          name={"item"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter a item!",
            },
          ]}
        >
          <Input placeholder="Item" />
        </Form.Item>
        <Form.Item
          label="Document Size (in KB)"
          name={"documentSize"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter a document size!",
            },
          ]}
        >
          <Input type="number" placeholder="Document Size" />
        </Form.Item>
        {/* <Form.Item
          label="Document Type"
          name={"documentType"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter document type",
            },
          ]}
        >
          <Select>
            <Option value={"PORTABLE_DOCUMENT_FORMAT"}>
              Portable Document Format
            </Option>
            <Option value="WORD">Word</Option>
            <Option value="COMMA_SEPERATED_VALUE">Comma Seperated Value</Option>
            <Option value="EXCEL">Excel</Option>
            <Option value="IMAGE">Image</Option>
          </Select>
        </Form.Item> */}
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Update Document Checklist
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateDocumentCheckList;
