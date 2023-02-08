import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { allActions } from "../../../Redux/myActions";
const { Option } = Select;

const AddDocuments = ({
  workflowRecord,
  isAddDocumentsModalVisible,
  setIsAddDocumentsModalVisible,
}) => {
  const actions = useDispatch();
  const [form] = Form.useForm();
  const fetchWorkflowDocumentChecklist = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/client/workflow/get-all-document-check-list/${workflowRecord.id}`,
          attempt: "FETCH_DOCUMENTS_REQUEST",
          success: "FETCH_DOCUMENTS_REQUEST_SUCCESS",
          failure: "FETCH_DOCUMENTS_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        }
      )
    );
  };
  const addDocumentsSubmitHandler = (value) => {
    console.log("from ", value);
    const formData = {
      ...value,
      documentType: value.item,
    };
    actions(
      allActions(
        { ...formData },
        {
          method: "post",
          endPoint: `/client/workflow/add-document-check-list/${workflowRecord.id}`,
          attempt: "ADD_DOCUMENTS_REQUEST",
          success: "ADD_DOCUMENTS_REQUEST_SUCCESS",
          failure: "ADD_DOCUMENTS_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            fetchWorkflowDocumentChecklist();
          },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({
    //   type: "ADD_DOCUMENTS_REQUEST",
    //   payload: { workflowId: workflowRecord.id, formData },
    // });
    form.resetFields();
    setIsAddDocumentsModalVisible(false);
  };
  return (
    <Modal
      title="Add Document Checklist"
      open={isAddDocumentsModalVisible}
      onCancel={() => {
        setIsAddDocumentsModalVisible(false);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={addDocumentsSubmitHandler}
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
            Add Document
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDocuments;
