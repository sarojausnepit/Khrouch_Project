import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { act } from "react-dom/test-utils";
import { allActions } from "../../Redux/myActions";
const { Option } = Select;

const AssignSupportTicket = ({
  record,
  isAssignSupportTicketModalVisible,
  setIsAssignSupportTicketModalVisible,
}) => {
  const actions = useDispatch();
  const [form] = Form.useForm();
  const assignSupportTicketSubmitHandler = (value) => {
    console.log("from ", value);
    const formData = {
      ...value,
    };
    actions(
      allActions(
        { ...formData },
        {
          method: "put",
          endPoint: `/assign-support-ticket/${record.id}`,
          attempt: "ASSIGN_SUPPORT_TICKET_REQUEST",
          success: "ASSIGN_SUPPORT_TICKET_REQUEST_SUCCESS",
          failure: "ASSIGN_SUPPORT_TICKET_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({ type: "ASSIGN_SUPPORT_TICKET_REQUEST", payload: formData });
    // form.resetFields();
    setIsAssignSupportTicketModalVisible(false);
  };
  return (
    <Modal
      title="Assign Support Ticket To:"
      open={isAssignSupportTicketModalVisible}
      onCancel={() => {
        setIsAssignSupportTicketModalVisible(false);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={assignSupportTicketSubmitHandler}
        colon={true}
        form={form}
      >
        <Form.Item
          label="Assign To"
          name={"name"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter name that you want to assign ticket to!",
            },
          ]}
        >
          <Input placeholder="Assign ticket to" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Assign Support Ticket
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssignSupportTicket;
