import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { allActions } from "../../../Redux/myActions";
const { Option } = Select;

const AddMigrationWorkflow = ({
  params,
  countryRecord,
  isAddMigrationWorkFlowModalVisible,
  setIsAddMigrationWorkFlowModalVisible,
}) => {
  const actions = useDispatch();
  const [form] = Form.useForm();
  const fetchMigrationWorkflow = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/client/workflow/get-all-work-flow/${countryRecord.id}/migration/${params.id}`,
          attempt: "FETCH_MIGRATION_WORKFLOW_REQUEST",
          success: "FETCH_MIGRATION_WORKFLOW_REQUEST_SUCCESS",
          failure: "FETCH_MIGRATION_WORKFLOW_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        }
      )
    );
  };
  const addMigrationWorkFlowSubmitHandler = (value) => {
    console.log("from ", value);
    const formData = {
      ...value,
    };
    actions(
      allActions(
        { ...formData },
        {
          method: "post",
          endPoint: `/client/workflow/add-work-flow/${countryRecord.id}/migration/${params.id}`,
          attempt: "ADD_MIGRATION_WORKFLOW_REQUEST",
          success: "ADD_MIGRATION_WORKFLOW_REQUEST_SUCCESS",
          failure: "ADD_MIGRATION_WORKFLOW_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            fetchMigrationWorkflow();
          },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({
    //   type: "ADD_MIGRATION_WORKFLOW_REQUEST",
    //   payload: { id: countryRecord.id, formData },
    // });
    // form.resetFields();
    setIsAddMigrationWorkFlowModalVisible(false);
  };
  return (
    <Modal
      title="Add Migration Workflow"
      open={isAddMigrationWorkFlowModalVisible}
      onCancel={() => {
        setIsAddMigrationWorkFlowModalVisible(false);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={addMigrationWorkFlowSubmitHandler}
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
            Add Migration Workflow
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMigrationWorkflow;
