import React, { useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
const { Option } = Select;

const UpdateAnnouncement = ({
  isUpdateAnnouncementModalVisible,
  setIsUpdateAnnouncementModalVisible,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const announcementSubmitHandler = (value) => {
    console.log("from ", value);
    const formData = {
      ...value,
    };
    dispatch({ type: "ADD_ANNOUNCEMENT_REQUEST", payload: formData });
    // form.resetFields();
    setIsUpdateAnnouncementModalVisible(false);
  };
  return (
    <Modal
      title="Add Announcement"
      open={isUpdateAnnouncementModalVisible}
      onCancel={() => {
        setIsUpdateAnnouncementModalVisible(false);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={announcementSubmitHandler}
        colon={true}
        form={form}
      >
        <div
          className="flexRowWithoutStyle"
          style={{ justifyContent: "space-between", gap: "1rem" }}
        >
          <Form.Item
            label=""
            name={""}
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please enter !",
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            label=""
            name={""}
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please enter !",
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
        </div>
        <div
          className="flexRowWithoutStyle"
          style={{ justifyContent: "space-between", gap: "1rem" }}
        >
          <Form.Item
            label=""
            name={""}
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please enter",
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            label=""
            name={""}
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please enter",
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
        </div>
        <Form.Item
          label=""
          name={""}
          rules={[
            {
              required: true,
              message: "Please enter !",
            },
          ]}
        >
          <Input placeholder="" />
        </Form.Item>
        <div
          className="flexRowWithoutStyle"
          style={{ justifyContent: "space-between", gap: "1rem" }}
        >
          <Form.Item
            label=""
            name={""}
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please enter !",
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            label=""
            name={""}
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please enter !",
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
        </div>
        <div
          className="flexRowWithoutStyle"
          style={{ justifyContent: "space-between", gap: "1rem" }}
        >
          <Form.Item
            label=""
            name={""}
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please enter !",
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            label=""
            name={""}
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please enter !",
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
        </div>
        <Form.Item name={""} valuePropName="checked">
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Add Announcement
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateAnnouncement;
