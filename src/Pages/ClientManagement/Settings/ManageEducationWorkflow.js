import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Tooltip,
} from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { FiSettings } from "react-icons/fi";
import { IoMdCheckboxOutline } from "react-icons/io";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import AddEducationWorkflow from "./AddEducationWorkflow";
import UpdateMigrationWorkflow from "./UpdateMigrationWorkflow";
import AddMigrationDocumentList from "./AddMigrationDocumentList";
import ManageEducationWorkflowStaus from "./ManageEducationWorkflowStatus";
import { AiOutlinePlus } from "react-icons/ai";
import { allActions } from "../../../Redux/myActions";
const { Option } = Select;

const ManageEducationWorkflow = ({
  params,
  countryRecord,
  isManageEducationWorkflowModalVisible,
  setIsManageEducationWorkflowModalVisible,
}) => {
  const manageEducationflowState = useSelector(
    (state) => state.SettingsReducer
  );
  const actions = useDispatch();

  const [
    isAddEducationWorkflModalVisible,
    setIsAddEducationWorkflModalVisible,
  ] = useState(false);
  const [
    isAddEducationDocumentListModalVisible,
    setIsAddEducationDocumentListModalVisible,
  ] = useState(false);
  const [
    isUpdateEducationWorflowModalVisible,
    setIsUpdateEducationWorflowModalVisible,
  ] = useState(false);
  const [
    isManageEducationWorkflowStatusModalVisible,
    setIsManageEducationWorkflowStatusModalVisible,
  ] = useState(false);
  const [workflowRecord, setWorkflowRecord] = useState({});
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
  useEffect(() => {
    if (
      isManageEducationWorkflowModalVisible === true ||
      isAddEducationWorkflModalVisible === false
    ) {
      fetchEducationWorkflow();
      // dispatch({
      //   type: "FETCH_EDUCATION_WORKFLOW_REQUEST",
      //   payload: { id: countryRecord.id },
      // });
    }
  }, [isManageEducationWorkflowModalVisible, isAddEducationWorkflModalVisible]);

  return (
    <Drawer
      title="Education Workflow"
      open={isManageEducationWorkflowModalVisible}
      onClose={() => {
        setIsManageEducationWorkflowModalVisible(false);
      }}
      footer={null}
      width={1163}
    >
      <div className="flexColumnwithoutStyle">
        <div className="flexRow">
          <button
            className="button"
            onClick={() => {
              setIsAddEducationWorkflModalVisible(true);
            }}
          >
            <span>Add Workflow</span>
          </button>
        </div>
        <div style={{ marginTop: "4rem" }}>
          {manageEducationflowState.educationWorkflow?.data?.map(
            (dataObj, index) => {
              return (
                <div
                  key={dataObj.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "20rem",
                    padding: "2px 4px",
                    margin: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "1rem",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setWorkflowRecord(dataObj);

                      setIsManageEducationWorkflowStatusModalVisible(true);
                    }}
                  >
                    <Avatar
                      style={{
                        backgroundColor: "blue",
                        verticalAlign: "middle",
                      }}
                      size="large"
                    >
                      {index + 1}
                    </Avatar>
                    <h3>
                      <Tooltip title="Click to add workflow status">
                        {dataObj.statusName}{" "}
                        {dataObj.isDefault ? (
                          <p
                            className="greenTag"
                            style={{
                              borderRadius: "20px",
                              fontSize: "12px",
                              paddingTop: "1px",
                              marginLeft: "1rem",
                            }}
                          >
                            Default
                          </p>
                        ) : (
                          ""
                        )}
                      </Tooltip>
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginRight: "1.5rem",
                    }}
                  >
                    <Tooltip title="Add workflow status">
                      <a>
                        <div
                          className="bordered"
                          onClick={() => {
                            setWorkflowRecord(dataObj);

                            setIsManageEducationWorkflowStatusModalVisible(
                              true
                            );
                          }}
                        >
                          <AiOutlinePlus />
                        </div>
                      </a>
                    </Tooltip>
                    <Tooltip title="Update">
                      <a>
                        <div
                          className="bordered"
                          onClick={() => {
                            setWorkflowRecord(dataObj);
                            setIsUpdateEducationWorflowModalVisible(true);
                          }}
                        >
                          <EditOutlined style={{ fontSize: "18px" }} />
                        </div>
                      </a>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <Popconfirm
                        title="Are you sure to delete this workflow?"
                        onConfirm={() => {
                          actions(
                            allActions(
                              {},
                              {
                                method: "delete",
                                endPoint: `/client/workflow/delete-work-flow/${dataObj.id}`,
                                attempt: "DELETE_MIGRATION_WORKFLOW_REQUEST",
                                success:
                                  "DELETE_MIGRATION_WORKFLOW_REQUEST_SUCCESS",
                                failure:
                                  "DELETE_MIGRATION_WORKFLOW_REQUEST_FAILURE",
                                //   navigateTo: null,
                                successInternalState: (data) => {
                                  fetchEducationWorkflow();
                                },
                                saveBearerToken: true,
                              }
                            )
                          );
                          // dispatch({
                          //   type: "DELETE_MIGRATION_WORKFLOW_REQUEST",
                          //   payload: {
                          //     id: dataObj.id,
                          //     countryId: countryRecord.id,
                          //   },
                          // });
                        }}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                      >
                        <a>
                          <div className="bordered">
                            <DeleteOutlined style={{ fontSize: "18px" }} />
                          </div>
                        </a>{" "}
                      </Popconfirm>
                    </Tooltip>
                    <Tooltip title="Set as Default">
                      <a>
                        <div
                          className="bordered"
                          onClick={() => {
                            actions(
                              allActions(
                                {},
                                {
                                  method: "patch",
                                  endPoint: `/client/workflow/change-work-flow-into-default/${countryRecord.id}/education/${dataObj.id}/${params.id}`,
                                  attempt:
                                    "SET_EDUCATION_WORKFLOW_AS_DEFAULT_REQUEST",
                                  success:
                                    "SET_EDUCATION_WORKFLOW_AS_DEFAULT_REQUEST_SUCCESS",
                                  failure:
                                    "SET_EDUCATION_WORKFLOW_AS_DEFAULT_REQUEST_FAILURE",
                                  //   navigateTo: null,
                                  successInternalState: (data) => {
                                    fetchEducationWorkflow();
                                  },
                                  saveBearerToken: true,
                                }
                              )
                            );
                            // dispatch({
                            //   type: "SET_EDUCATION_WORKFLOW_AS_DEFAULT_REQUEST",
                            //   payload: {
                            //     countryId: countryRecord.id,
                            //     workflowId: dataObj.id,
                            //   },
                            // });
                          }}
                        >
                          <FiSettings style={{ fontSize: "18px" }} />
                        </div>
                      </a>
                    </Tooltip>
                    <Tooltip title="Manage Document Checklist">
                      <a>
                        <div
                          className="bordered"
                          onClick={() => {
                            setWorkflowRecord(dataObj);
                            setIsAddEducationDocumentListModalVisible(true);
                          }}
                        >
                          <IoMdCheckboxOutline style={{ fontSize: "18px" }} />
                        </div>
                      </a>
                    </Tooltip>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
      {isAddEducationWorkflModalVisible && (
        <AddEducationWorkflow
          params={params}
          countryRecord={countryRecord}
          isAddEducationWorkflowModalVisible={isAddEducationWorkflModalVisible}
          setIsAddEducationWorkflowModalVisible={
            setIsAddEducationWorkflModalVisible
          }
        />
      )}
      {isManageEducationWorkflowStatusModalVisible && (
        <ManageEducationWorkflowStaus
          workflowRecord={workflowRecord}
          isManageEducationWorkflowStatusModalVisible={
            isManageEducationWorkflowStatusModalVisible
          }
          setIsManageEducationWorkflowStatusModalVisible={
            setIsManageEducationWorkflowStatusModalVisible
          }
        />
      )}
      {isUpdateEducationWorflowModalVisible && (
        <UpdateMigrationWorkflow
          type="education"
          params={params}
          workflowRecord={workflowRecord}
          countryRecord={countryRecord}
          isUpdateMigrationWorkflowModalVisible={
            isUpdateEducationWorflowModalVisible
          }
          setIsUpdateMigrationWorkflowModalVisible={
            setIsUpdateEducationWorflowModalVisible
          }
        />
      )}
      {isAddEducationDocumentListModalVisible && (
        <AddMigrationDocumentList
          workflowRecord={workflowRecord}
          isAddMigrationDocumentListModalVisible={
            isAddEducationDocumentListModalVisible
          }
          setIsAddMigrationDocumentListModalVisible={
            setIsAddEducationDocumentListModalVisible
          }
        />
      )}
    </Drawer>
  );
};

export default ManageEducationWorkflow;
