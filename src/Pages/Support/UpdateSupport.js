import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import { useDispatch } from "react-redux";
import { BsRecord } from "react-icons/bs";
import { allActions } from "../../Redux/myActions";
const { Option } = Select;
const { TextArea } = Input;

const UpdateSupport = ({
  record,
  isUpdateSupportModalVisible,
  setIsUpdateSupportModalVisible,
}) => {
  const actions = useDispatch();
  const [form] = Form.useForm();
  const updateSupportSubmitHandler = (value) => {
    console.log("from ", value);
    const formData = {
      ...value,
      replyTitle: "",
    };
    actions(
      allActions(
        { ...formData },
        {
          method: "put",
          endPoint: `/add-support-reply/${record.id}`,
          attempt: "REPLY_TO_TICKET_REQUEST",
          success: "REPLY_TO_TICKET_REQUEST_SUCCESS",
          failure: "REPLY_TO_TICKET_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({
    //   type: "REPLY_TO_TICKET_REQUEST",
    //   payload: { id: record.id, values: formData },
    // });
    form.resetFields();
    setIsUpdateSupportModalVisible(false);
  };
  return (
    <Modal
      title="Reply to Ticket"
      open={isUpdateSupportModalVisible}
      onCancel={() => {
        setIsUpdateSupportModalVisible(false);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={updateSupportSubmitHandler}
        colon={true}
        form={form}
      >
        {/* <Form.Item
          label="Reply Title"
          name={"replyTitle"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter title!",
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item> */}
        <Form.Item
          label="Support Reply"
          name={"supportReply"}
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "please enter support reply!",
            },
          ]}
        >
          <TextArea
            rows={10}
            placeholder="write something about support reply"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Reply
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateSupport;
