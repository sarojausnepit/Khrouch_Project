import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { allActions } from "../../../Redux/myActions";
const { Option } = Select;

const AddWorkFlowStatus = ({
  workflowRecord,
  statusList,
  setStatusList,
  isAddWorkFlowStatusModalVisible,
  setIsAddWorkFlowStatusModalVisible,
}) => {
  const actions = useDispatch();
  const [form] = Form.useForm();
  const successFn = (response) => {
    console.log("data from fetch workflow by id response", response);
    setStatusList(response?.data);
  };
  const fetchWorkflowStatusById = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/client/workflow/get-all-work-flow-status/${workflowRecord.id}`,
          attempt: "FETCH_WORKFLOW_BY_ID_REQUEST",
          success: "FETCH_WORKFLOW_BY_ID_REQUEST_SUCCESS",
          failure: "FETCH_WORKFLOW_BY_ID_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            successFn(data);
          },
          saveBearerToken: true,
        }
      )
    );
  };
  const addWorkFlowStatusSubmitHandler = (value) => {
    console.log("from ", value);
    const formData = {
      ...value,
    };
    actions(
      allActions(
        { ...formData },
        {
          method: "post",
          endPoint: `/client/workflow/add-work-flow-status/${workflowRecord.id}`,
          attempt: "ADD_WORKFLOW_STATUS_REQUEST",
          success: "ADD_WORKFLOW_STATUS_REQUEST_SUCCESS",
          failure: "ADD_WORKFLOW_STATUS_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            fetchWorkflowStatusById();
          },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({
    //   type: "ADD_WORKFLOW_STATUS_REQUEST",
    //   payload: { id: workflowRecord.id, formData },
    //   payload2: successFn,
    // });
    form.resetFields();
    setIsAddWorkFlowStatusModalVisible(false);
  };
  return (
    <Modal
      title="Add Workflow Status"
      open={isAddWorkFlowStatusModalVisible}
      onCancel={() => {
        setIsAddWorkFlowStatusModalVisible(false);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={addWorkFlowStatusSubmitHandler}
        colon={true}
        form={form}
      >
        <Form.Item
          label="Work Flow Status"
          name={"statusName"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter a workflow name!",
            },
          ]}
        >
          <Input placeholder="Enter Work Flow Name" />
        </Form.Item>
        <Form.Item
          label="Task"
          name={"tasks"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter a task!",
            },
          ]}
        >
          <Input placeholder="Enter a Task" />
        </Form.Item>
        <Form.Item
          label="Color Code"
          name={"colorCode"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter color code for the status!",
            },
          ]}
        >
          <Input placeholder="Hex value for color code" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Add Workflow Status
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddWorkFlowStatus;
