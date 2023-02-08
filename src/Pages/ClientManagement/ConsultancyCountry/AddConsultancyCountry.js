import { Button, Form, Input, Modal } from "antd";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { allActions } from "../../../Redux/myActions";

const AddConsultancyCountry = ({
  params,
  isAddCountryModalVisible,
  setIsAddCountryModalVisible,
}) => {
  const actions = useDispatch();
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const fetchCountryFromConsultancy = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/country/get-all/${params.id}`,
          attempt: "FETCH_CONSULTANCY_COUNTRY_REQUEST",
          success: "FETCH_CONSULTANCY_COUNTRY_REQUEST_SUCCESS",
          failure: "FETCH_CONSULTANCY_COUNTRY_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        }
      )
    );
  };

  const countryAddResponseToAddImage = (response) => {
    let formData = new FormData();
    formData.append("image", selectedFile);
    selectedFile !== undefined &&
      selectedFile !== null &&
      actions(
        allActions(formData, {
          method: "post",
          endPoint: `/country/upload-image/${response.id}`,
          attempt: "UPLOAD_CONSULTANCY_COUNTRY_IMAGE_REQUEST",
          success: "UPLOAD_CONSULTANCY_COUNTRY_IMAGE_REQUEST_SUCCESS",
          failure: "UPLOAD_CONSULTANCY_COUNTRY_IMAGE_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            fetchCountryFromConsultancy();
          },
          multipartFormData: true,
          saveBearerToken: true,
        })
      );

    //   dispatch({
    //     type: "UPLOAD_COUNTRY_IMAGE_REQUEST",
    //     payload: { id: response?.data?.id, formData },
    //   });
    setSelectedFile(null);
  };

  const addCountrySubmitHandler = (value) => {
    actions(
      allActions(
        { ...value },
        {
          method: "post",
          endPoint: `/country/add/${params.id}`,
          attempt: "ADD_CONSULTANCY_COUNTRY_REQUEST",
          success: "ADD_CONSULTANCY_COUNTRY_REQUEST_SUCCESS",
          failure: "ADD_CONSULTANCY_COUNTRY_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            countryAddResponseToAddImage(data);
            fetchCountryFromConsultancy();
          },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({
    //   type: "ADD_COUNTRY_REQUEST",
    //   payload: value,
    //   payload2: countryAddResponseToAddImage,
    // });
    form.resetFields();
    setIsAddCountryModalVisible(false);
    console.log(value);
  };
  return (
    <Modal
      title="Add Country"
      open={isAddCountryModalVisible}
      onCancel={() => {
        setIsAddCountryModalVisible(false);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={addCountrySubmitHandler}
        colon={true}
        form={form}
      >
        <Form.Item
          label="Country Name"
          name={"countryName"}
          rules={[
            {
              required: true,
              message: "Please enter country name",
            },
          ]}
        >
          <Input placeholder="Country Name" />
        </Form.Item>
        <Form.Item
          label="Calling Code"
          name={"callingCode"}
          rules={[
            {
              required: true,
              message: "Please enter country calling code",
            },
          ]}
        >
          <Input type="number" placeholder="E.g. 977" />
        </Form.Item>
        <Form.Item label="Country Image">
          <Input
            type="file"
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Add Country
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddConsultancyCountry;
