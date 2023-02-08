import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { BsRecord } from "react-icons/bs";
import { allActions } from "../../../Redux/myActions";
const { Option } = Select;

const AddDocumentChecklist = ({
  record,
  isOnshore,
  isAddDocumentChecklistModalVisible,
  setIsAddDocumentChecklistModalVisible,
  fetchOnshoreDocuments,
  fetchOffshoreDocuments,
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
  const addDocumentChecklistSubmitHandler = (value) => {
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
          method: "post",
          endPoint: `/course/checkList/add`,
          attempt: "ADD_COURSES_DOCUMENT_CHECKLIST_REQUEST",
          success: "ADD_COURSES_DOCUMENT_CHECKLIST_REQUEST_SUCCESS",
          failure: "ADD_COURSES_DOCUMENT_CHECKLIST_REQUEST_FAILURE",
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
    //   type: "ADD_COURSES_DOCUMENT_CHECKLIST_REQUEST",
    //   payload: { id: record.id, type, formData: { ...formData, isOnshore } },
    // });
    form.resetFields();
    setIsAddDocumentChecklistModalVisible(false);
  };
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
            Add Document Checklist
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDocumentChecklist;
