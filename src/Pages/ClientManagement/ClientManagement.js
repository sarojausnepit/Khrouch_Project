import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  Image,
  Popconfirm,
  Segmented,
  Space,
  Table,
  Tag,
  Tooltip,
  Breadcrumb,
  Pagination,
} from "antd";
import { MdOutlineDisabledVisible } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import client from "./../../Assets/account.png";
import activeClient from "./../../Assets/add-contact.png";
import { AiOutlineEye, AiOutlinePoweroff } from "react-icons/ai";
import TableSkeleton from "../../Helpers/TableSkeleton/tableSkelaton";
import { BiBlock } from "react-icons/bi";
import SiderDemo from "../../components/Siderdemo";
import { formattedDate } from "../../Helpers/HelperFunction";
import { allActions } from "../../Redux/myActions";
import { BsBuilding } from "react-icons/bs";

import ConsultancyInstitute from "../ConsultancyManagement/ConsultancyInstitute/ConsultancyInstitute";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "Client ID",
    dataIndex: "id",
    align: "center",
  },
  {
    title: "Name",
    dataIndex: "name",
    align: "center",
  },
  {
    title: "Image",
    dataIndex: "image",
    align: "center",
  },
  //   {
  //     title: "Mobile No.",
  //     dataIndex: "mobile",
  //     align: "center",
  //   },
  {
    title: "Email",
    dataIndex: "email",
    align: "center",
  },

  {
    title: "Address",
    dataIndex: "address",
    align: "center",
  },

  {
    title: "Subscription Start/Expiry Date",
    dataIndex: "trailStartDate",
    align: "center",
  },
  {
    title: "Package Name",
    dataIndex: "packageName",
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "activeStatus",
    align: "center",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    align: "center",
  },
];

const ClientManagement = () => {
  const clientState = useSelector((state) => state.ClientReducer);
  const [isAddClientModalVisible, setIsAddClientModalVisible] = useState(false);
  const [isUpdateClientsModalVisible, setIsUpdateClientsModalVisible] =
    useState(false);
  const [isClientDetailsModelVisible, setIsClientDetailsModelVisible] =
    useState(false);
  const [
    isManageConsultancySettingsModalVisible,
    setIsManageConsultancySettingsModalVisible,
  ] = useState(false);
  const [record, setRecord] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [clientType, setClientsType] = useState("get-all-customer");

  const actions = useDispatch();
  const navigate = useNavigate();
  const payloadFunction = (response) => {};
  const fetchAllClients = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/client/get-all?page=${page}&pageSize=${pageSize}`,
          attempt: "FETCH_ALL_CLIENTS_REQUEST",
          success: "FETCH_ALL_CLIENTS_REQUEST_SUCCESS",
          failure: "FETCH_ALL_CLIENTS_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        }
      )
    );
  };
  useEffect(() => {
    fetchAllClients();
  }, [page, pageSize]);

  const data = clientState.clients?.data?.map((dataObj) => {
    console.log("expiry daate", formattedDate(dataObj?.trailExpiryDate));
    return {
      key: dataObj.id,
      id: dataObj.id,
      name: dataObj?.companyName ? dataObj?.companyName : "N/A",
      //   name:
      //     dataObj.firstName && dataObj.lastName
      //       ? dataObj.firstName + " " + dataObj.lastName
      //       : "N/A",
      image: dataObj.profileImage ? (
        <Image
          src={dataObj.profileImage}
          style={{ height: "50px", width: "50px", border: "1px solid #ccc" }}
        />
      ) : (
        "N/A"
      ),
      companyRegistration: dataObj.companyRegistrationNumber
        ? dataObj.companyRegistrationNumber
        : "N/A",
      mobile: dataObj.mobile ? dataObj.mobile : "N/A",
      email: dataObj.emailId ? dataObj.emailId : "N/A",
      trailStartDate:
        dataObj?.trailStartDate || dataObj?.trailExpiryDate
          ? `${formattedDate(dataObj?.trailStartDate)} / 
             ${formattedDate(dataObj?.trailExpiryDate)}`
          : "N/A",
      packageName: dataObj?.subscription?.packageName,
      address: dataObj.companyAddress ? dataObj.companyAddress : "N/A",
      country: dataObj.countryOfResidence ? dataObj.countryOfResidence : "N/A",
      phone: dataObj.phoneNumber ? dataObj.phoneNumber : "N/A",
      activeStatus: dataObj.active ? (
        <p className="greenTag">ACTIVE</p>
      ) : (
        <p className="redTag">INACTIVE</p>
      ),
      actions: (
        <Space size="middle">
          <Tooltip title="Manage Settings">
            <a>
              <div
                className="bordered"
                onClick={() => {
                  navigate(`/client-settings/${dataObj.id}`);
                }}
              >
                <FiSettings />
              </div>
            </a>
          </Tooltip>
        </Space>
      ),
    };
  });
  const onShowSizeChange = (current, pageSize) => {
    console.log("page changed", current, pageSize);
    window.scrollTo(0, 0);
    setPage(current);
    setPageSize(pageSize);
  };
  console.log("from client state", clientState);
  return (
    <SiderDemo>
      <div className="flexColumnwithoutStyle">
        <div className="flexRow">
          {/* <button
            className="button"
            onClick={() => {
              setIsAddClientModalVisible(true);
            }}
          >
            <span>Add Clients</span>
          </button> */}
          {/* <Segmented
            options={[
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <Avatar src={client} size={20} shape="square" />
                    <div>All Clients</div>
                  </div>
                ),
                value: "get-all-customer",
              },
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <Avatar src={activeClient} size={20} shape="square" />
                    <div>Active Clients</div>
                  </div>
                ),
                value: "active",
              },
            ]}
            onChange={(value) => {
              setClientsType(value);
              console.log(value);
            }}
          /> */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "2rem",
          }}
        >
          {clientState.isLoading ? (
            <TableSkeleton />
          ) : (
            <Table
              bordered
              columns={columns}
              dataSource={data}
              pagination={false}
            />
          )}

          {clientState.clients?.totalData && (
            <Pagination
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                alignSelf: "flex-end",
              }}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              defaultCurrent={1}
              current={page}
              defaultPageSize={pageSize}
              onChange={onShowSizeChange}
              total={clientState.clients?.totalPage * 10}
            />
          )}
        </div>
      </div>
      {/* <AddClient
        isAddClientModalVisible={isAddClientModalVisible}
        setIsAddClientModalVisible={setIsAddClientModalVisible}
      />
      <UpdateClients
        record={record}
        isUpdateClientsModalVisible={isUpdateClientsModalVisible}
        setIsUpdateClientsModalVisible={setIsUpdateClientsModalVisible}
      />
      <ClientDetails
        Record={record}
        isClientDetailsModelVisible={isClientDetailsModelVisible}
        setIsClientDetailsModelVisible={setIsClientDetailsModelVisible}
      /> */}

      {isManageConsultancySettingsModalVisible && (
        <ConsultancyInstitute
          record={record}
          isManageConsultancySettingsModalVisible={
            isManageConsultancySettingsModalVisible
          }
          setIsManageConsultancySettingsModalVisible={
            setIsManageConsultancySettingsModalVisible
          }
        />
      )}
    </SiderDemo>
  );
};

export default ClientManagement;
