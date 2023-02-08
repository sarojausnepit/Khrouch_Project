import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { allActions } from "../../../Redux/myActions";
const { Option } = Select;

const UpdateWorkflowStatus = ({
  statusList,
  setStatusList,
  workflowStatusRecord,
  workflowRecord,
  isUpdateWorkflowStatusModalVisible,
  setIsUpdateWorkflowStatusModalVisible,
}) => {
  const actions = useDispatch();
  const [form] = Form.useForm();
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
  const successFn = (response) => {
    console.log("data from fetch workflow by id response", response);
    setStatusList(response?.data);
  };

  const updateWorkflowStatusSubmitHandler = (value) => {
    console.log("from ", value);
    const formData = {
      ...value,
    };
    actions(
      allActions(
        { ...formData },
        {
          method: "put",
          endPoint: `/client/workflow/update-work-flow-status/${workflowStatusRecord.id}`,
          attempt: "UPDATE_WORKFLOW_STATUS_REQUEST",
          success: "UPDATE_WORKFLOW_STATUS_REQUEST_SUCCESS",
          failure: "UPDATE_WORKFLOW_STATUS_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            fetchWorkflowStatusById();
          },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({
    //   type: "UPDATE_WORKFLOW_STATUS_REQUEST",
    //   payload: {
    //     fetchId: workflowRecord.id,
    //     id: workflowStatusRecord.id,
    //     formData,
    //   },
    //   payload2: successFn,
    // });
    // form.resetFields();
    setIsUpdateWorkflowStatusModalVisible(false);
  };
  console.log("workfolw status record", workflowStatusRecord);
  return (
    <Modal
      title="Update Workflow Status"
      open={isUpdateWorkflowStatusModalVisible}
      onCancel={() => {
        setIsUpdateWorkflowStatusModalVisible(false);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={updateWorkflowStatusSubmitHandler}
        colon={true}
        form={form}
        fields={[
          {
            name: ["statusName"],
            value: workflowStatusRecord?.statusName,
          },
          {
            name: ["tasks"],
            value: workflowStatusRecord?.tasks,
          },
          {
            name: ["colorCode"],
            value: workflowStatusRecord?.colorCode,
          },
        ]}
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
            Update Workflow Status
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateWorkflowStatus;
