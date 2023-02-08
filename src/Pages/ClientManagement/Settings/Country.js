import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Popconfirm,
  Segmented,
  Skeleton,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { MdDeleteOutline, MdOutlineDisabledVisible } from "react-icons/md";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import ManageWorkflow from "./MangeWorkflow";
import ManageEducationWorkflow from "./ManageEducationWorkflow";
import { HiOutlineBookOpen, HiOutlinePaperAirplane } from "react-icons/hi";
import ManageMigrationWorkflow from "./MangeWorkflow";
import SiderDemo from "../../../components/Siderdemo";
import AddCountry from "../../../Master/Country/AddCountry";
import { useParams } from "react-router-dom";
import { allActions } from "../../../Redux/myActions";
import AddConsultancyCountry from "../ConsultancyCountry/AddConsultancyCountry";
const { Meta } = Card;

const Country = () => {
  const countryState = useSelector((state) => state.SettingsReducer);
  const [isAddCountryModalVisible, setIsAddCountryModalVisible] =
    useState(false);
  const [
    isAddEducationWorkflowModalVisible,
    setIsAddEducationWorkflowModalVisible,
  ] = useState(false);
  const [
    isAddMigrationWorkflowModalVisible,
    setIsAddMigrationWorkflowModalVisible,
  ] = useState(false);
  const params = useParams();
  const [isconfirmationModalVisible, setIsconfirmationModalVisible] =
    useState(false);
  const [countryRecord, setCountryRecord] = useState({});
  const [countryType, setCountryType] = useState("getAllCountry");

  const actions = useDispatch();
  console.log("params from country", params.id);
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

  useEffect(() => {
    fetchCountryFromConsultancy();
    // if (countryType === "active") {
    //   dispatch({ type: "FETCH_ACTIVE_COUNTRY_REQUEST" });
    // } else {
    //   dispatch({ type: "FETCH_COUNTRY_REQUEST" });
    // }
  }, [countryType]);
  // useEffect(() => {
  //   if (isAddCountryModalVisible === false) {
  //     dispatch({ type: "FETCH_COUNTRY_REQUEST" });
  //   }
  // }, [isAddCountryModalVisible]);

  console.log("from country state", countryState);
  return (
    <SiderDemo>
      <div className="flexColumnwithoutStyle">
        <div className="flexRow">
          <button
            className="button"
            onClick={() => {
              setIsAddCountryModalVisible(true);
            }}
          >
            <span>Add Country</span>
          </button>
          {/* <Segmented
            options={[
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <div>All Country</div>
                  </div>
                ),
                value: "getAllCountry",
              },
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <div>Active Country</div>
                  </div>
                ),
                value: "active",
              },
            ]}
            onChange={(value) => {
              setCountryType(value);
              console.log(value);
            }}
          /> */}
        </div>
        {countryType === "getAllCountry" && (
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {countryState.countries?.data.map((dataObj) => {
              return (
                <Card
                  key={dataObj.id}
                  style={{ width: 200, marginTop: 16, borderRadius: "10px" }}
                  actions={[
                    <Tooltip title={"Manage Education Workflow"}>
                      <HiOutlineBookOpen
                        key="education"
                        size={20}
                        onClick={() => {
                          setCountryRecord(dataObj);
                          setIsAddEducationWorkflowModalVisible(true);
                        }}
                      />
                    </Tooltip>,
                    <Tooltip title={"Manage Migration Workflow"}>
                      <HiOutlinePaperAirplane
                        key="migration"
                        size={20}
                        onClick={() => {
                          setCountryRecord(dataObj);
                          setIsAddMigrationWorkflowModalVisible(true);
                        }}
                      />
                    </Tooltip>,
                    <Tooltip title={"Change Country Status"}>
                      <MdOutlineDisabledVisible
                        key="migration"
                        size={20}
                        onClick={() => {
                          actions(
                            allActions(
                              {},
                              {
                                method: "patch",
                                endPoint: `/country/change-status/${dataObj.id}`,
                                attempt:
                                  "CHANGE_CONSULTANCY_COUNTRY_STATUS_REQUEST",
                                success:
                                  "CHANGE_CONSULTANCY_COUNTRY_STATUS_REQUEST_SUCCESS",
                                failure:
                                  "CHANGE_CONSULTANCY_COUNTRY_STATUS_REQUEST_FAILURE",
                                //   navigateTo: null,
                                successInternalState: (data) => {
                                  fetchCountryFromConsultancy();
                                },
                                saveBearerToken: true,
                              }
                            )
                          );
                          // setCountryRecord(dataObj);
                          // setIsconfirmationModalVisible(true);
                        }}
                      />
                    </Tooltip>,
                  ]}
                >
                  <Meta
                    style={{ height: 100 }}
                    avatar={
                      <Avatar
                        src={dataObj.countryImage}
                        style={{
                          backgroundColor: "blue",
                          verticalAlign: "middle",
                        }}
                        size="large"
                      >
                        {dataObj?.countryName.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    title={dataObj?.countryName}
                    description={
                      dataObj.status === "ACTIVE" ? (
                        <p className="greenTag">ACTIVE</p>
                      ) : (
                        <p className="redTag">INACTIVE</p>
                      )
                    }
                  />
                </Card>
              );
            })}
          </div>
        )}
        {countryType === "active" && (
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {countryState.activeCountries?.map((dataObj) => {
              return (
                <Card
                  key={dataObj.id}
                  style={{ width: 200, marginTop: 16, borderRadius: "10px" }}
                  actions={[
                    <Tooltip title={"Manage Education Workflow"}>
                      <HiOutlineBookOpen
                        key="education"
                        size={20}
                        onClick={() => {
                          setCountryRecord(dataObj);
                          setIsAddEducationWorkflowModalVisible(true);
                        }}
                      />
                    </Tooltip>,
                    <Tooltip title={"Manage Migration Workflow"}>
                      <HiOutlinePaperAirplane
                        key="migration"
                        size={20}
                        onClick={() => {
                          setCountryRecord(dataObj);
                          setIsAddMigrationWorkflowModalVisible(true);
                        }}
                      />
                    </Tooltip>,
                    <Tooltip title={"Change Country Status"}>
                      <MdOutlineDisabledVisible
                        key="migration"
                        size={20}
                        onClick={() => {
                          actions(
                            allActions(
                              {},
                              {
                                method: "patch",
                                endPoint: `/country/change-status/${dataObj.id}`,
                                attempt:
                                  "CHANGE_CONSULTANCY_COUNTRY_STATUS_REQUEST",
                                success:
                                  "CHANGE_CONSULTANCY_COUNTRY_STATUS_REQUEST_SUCCESS",
                                failure:
                                  "CHANGE_CONSULTANCY_COUNTRY_STATUS_REQUEST_FAILURE",
                                //   navigateTo: null,
                                //   successInternalState: (data) => {
                                //     navigation.navigate("LeadDetails", { item });
                                //   },
                                saveBearerToken: true,
                              }
                            )
                          );
                          // setCountryRecord(dataObj);
                          // setIsconfirmationModalVisible(true);
                        }}
                      />
                    </Tooltip>,
                  ]}
                >
                  <Meta
                    style={{ height: 100 }}
                    avatar={
                      <Avatar
                        src={dataObj.countryImage}
                        style={{
                          backgroundColor: "blue",
                          verticalAlign: "middle",
                        }}
                        size="large"
                      >
                        {dataObj?.countryName.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    title={dataObj?.countryName}
                    description={
                      dataObj.status === "ACTIVE" ? (
                        <p className="greenTag">ACTIVE</p>
                      ) : (
                        <p className="redTag">INACTIVE</p>
                      )
                    }
                  />
                </Card>
              );
            })}
          </div>
        )}
      </div>
      {isAddCountryModalVisible && (
        <AddConsultancyCountry
          params={params}
          isAddCountryModalVisible={isAddCountryModalVisible}
          setIsAddCountryModalVisible={setIsAddCountryModalVisible}
        />
      )}
      {isAddMigrationWorkflowModalVisible && (
        <ManageMigrationWorkflow
        params={params}
          countryRecord={countryRecord}
          isManageMigrationWorkflowModalVisible={
            isAddMigrationWorkflowModalVisible
          }
          setIsManageMigrationWorkflowModalVisible={
            setIsAddMigrationWorkflowModalVisible
          }
        />
      )}
      {isAddEducationWorkflowModalVisible && (
        <ManageEducationWorkflow
        params={params}
          countryRecord={countryRecord}
          isManageEducationWorkflowModalVisible={
            isAddEducationWorkflowModalVisible
          }
          setIsManageEducationWorkflowModalVisible={
            setIsAddEducationWorkflowModalVisible
          }
        />
      )}
      {/* <Confirmation
        onSubmit={(value) => {
          console.warn(value, "value from teh confirmation box");
          setIsconfirmationModalVisible(false);
          dispatch({
            type: "CHANGE_COUNTRY_STATUS_REQUEST",
            payload: {
              id: countryRecord.id,
              formData: { statusMessage: value.confirmationText },
            },
          });
        }}
        isconfirmationModalVisible={isconfirmationModalVisible}
        setIsconfirmationModalVisible={setIsconfirmationModalVisible}
      /> */}
    </SiderDemo>
  );
};

export default Country;
