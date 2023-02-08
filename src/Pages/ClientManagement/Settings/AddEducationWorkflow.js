import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { allActions } from "../../../Redux/myActions";
const { Option } = Select;

const AddEducationWorkflow = ({
  params,
  countryRecord,
  isAddEducationWorkflowModalVisible,
  setIsAddEducationWorkflowModalVisible,
}) => {
  const actions = useDispatch();
  const [form] = Form.useForm();
  const fetchEducationWorkflow = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/client/workflow/get-all-work-flow/${countryRecord.id}/education/${params.id}`,
          attempt: "FETCH_EDUCATION_WORKFLOW_REQUEST",
          success: "FETCH_EDUCATION_WORKFLOW_REQUEST_SUCCESS",
          failure: "FETCH_EDUCATION_WORKFLOW_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        }
      )
    );
  };
  const addEducationWorkflowSubmitHandler = (value) => {
    console.log("from ", value);
    const formData = {
      ...value,
    };
    actions(
      allActions(
        { ...formData },
        {
          method: "post",
          endPoint: `/client/workflow/add-work-flow/${countryRecord.id}/education/${params.id}`,
          attempt: "ADD_EDUCATION_WORKFLOW_REQUEST",
          success: "ADD_EDUCATION_WORKFLOW_REQUEST_SUCCESS",
          failure: "ADD_EDUCATION_WORKFLOW_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            fetchEducationWorkflow();
          },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({
    //   type: "ADD_EDUCATION_WORKFLOW_REQUEST",
    //   payload: { id: countryRecord.id, formData },
    // });
    form.resetFields();
    setIsAddEducationWorkflowModalVisible(false);
  };
  return (
    <Modal
      title="Add Workflow"
      open={isAddEducationWorkflowModalVisible}
      onCancel={() => {
        setIsAddEducationWorkflowModalVisible(false);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={addEducationWorkflowSubmitHandler}
        colon={true}
        form={form}
      >
        <Form.Item
          label="Name"
          name={"name"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter name!",
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Add Workflow
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEducationWorkflow;
