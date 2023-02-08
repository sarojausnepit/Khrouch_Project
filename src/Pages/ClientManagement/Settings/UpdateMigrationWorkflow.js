import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { BsRecord } from "react-icons/bs";
import { allActions } from "../../../Redux/myActions";
const { Option } = Select;

const UpdateMigrationWorkflow = ({
  type,
  params,
  workflowRecord,
  countryRecord,
  isUpdateMigrationWorkflowModalVisible,
  setIsUpdateMigrationWorkflowModalVisible,
}) => {
  const actions = useDispatch();
  const [form] = Form.useForm();
  const fetchEducationWorkflow = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/client/workflow/get-all-work-flow/${countryRecord.id}/${type}/${params.id}`,
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
  const updateMigrationWorkflowSubmitHandler = (value) => {
    console.log("from ", value);
    const formData = {
      ...value,
    };
    actions(
      allActions(
        { ...formData },
        {
          method: "put",
          endPoint: `/client/workflow/update-work-flow/${workflowRecord.id}`,
          attempt: "UPDATE_MIGRATION_WORKFLOW_REQUEST",
          success: "UPDATE_MIGRATION_WORKFLOW_REQUEST_SUCCESS",
          failure: "UPDATE_MIGRATION_WORKFLOW_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            fetchEducationWorkflow();
          },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({
    //   type: "UPDATE_MIGRATION_WORKFLOW_REQUEST",
    //   payload: { id: workflowRecord.id, formData, countryId: countryRecord.id },
    // });
    form.resetFields();
    setIsUpdateMigrationWorkflowModalVisible(false);
  };
  console.log("worflow update", workflowRecord);
  return (
    <Modal
      title="Update Workflow"
      open={isUpdateMigrationWorkflowModalVisible}
      onCancel={() => {
        setIsUpdateMigrationWorkflowModalVisible(false);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={updateMigrationWorkflowSubmitHandler}
        colon={true}
        form={form}
        fields={[{ name: ["name"], value: workflowRecord.statusName }]}
      >
        <Form.Item
          label="Workflow Name"
          name={"name"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter workflow name!",
            },
          ]}
        >
          <Input placeholder="Workflow Name" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Update Workflow
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateMigrationWorkflow;
