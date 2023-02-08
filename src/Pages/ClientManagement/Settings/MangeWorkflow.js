import React, { useState } from "react";
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
import AddMigrationWorkflow from "./AddMigrattionWorkFlow";
import { useEffect } from "react";
import UpdateMigrationWorkflow from "./UpdateMigrationWorkflow";
import AddMigrationDocumentList from "./AddMigrationDocumentList";
import ManageEducationWorkflowStaus from "./ManageEducationWorkflowStatus";
import { AiOutlinePlus } from "react-icons/ai";
import { allActions } from "../../../Redux/myActions";
const { Option } = Select;

const ManageMigrationWorkflow = ({
  params,
  countryRecord,
  isManageMigrationWorkflowModalVisible,
  setIsManageMigrationWorkflowModalVisible,
}) => {
  const manageMigrationWorkflowState = useSelector(
    (state) => state.SettingsReducer
  );
  const [
    isAddMigrationWorkflModalVisible,
    setIsAddMigrationWorkflModalVisible,
  ] = useState(false);
  const [
    isAddMigrationDocumentListModalVisible,
    setIsAddMigrationDocumentListModalVisible,
  ] = useState(false);
  const [
    isUpdateMigrationWorflowModalVisible,
    setIsUpdateMigrationWorflowModalVisible,
  ] = useState(false);
  const [
    isManageMigrationWorkflowStatusModalVisible,
    setIsManageMigrationWorkflowStatusModalVisible,
  ] = useState(false);
  const [workflowRecord, setWorkflowRecord] = useState({});
  const actions = useDispatch();
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
  useEffect(() => {
    if (
      isManageMigrationWorkflowModalVisible === true ||
      isUpdateMigrationWorflowModalVisible === false
    ) {
      fetchMigrationWorkflow();
    }
  }, [
    isManageMigrationWorkflowModalVisible,
    isUpdateMigrationWorflowModalVisible,
  ]);

  const [form] = Form.useForm();

  console.log("from manage migration state", manageMigrationWorkflowState);
  return (
    <Drawer
      title="Manage Migration Workflow"
      open={isManageMigrationWorkflowModalVisible}
      onClose={(e) => {
        console.log("hello");
        setIsManageMigrationWorkflowModalVisible(false);
      }}
      footer={null}
      width={1163}
    >
      <div className="flexColumnwithoutStyle">
        <div className="flexRow">
          <button
            className="button"
            onClick={() => {
              setIsAddMigrationWorkflModalVisible(true);
            }}
          >
            <span>Add Workflow</span>
          </button>
        </div>
        <div style={{ marginTop: "2rem" }}>
          {manageMigrationWorkflowState.migrationWorkflow?.data?.map(
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

                      setIsManageMigrationWorkflowStatusModalVisible(true);
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

                            setIsManageMigrationWorkflowStatusModalVisible(
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
                            setIsUpdateMigrationWorflowModalVisible(true);
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
                                  fetchMigrationWorkflow();
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
                                  endPoint: `/client/workflow/change-work-flow-into-default/${countryRecord.id}/migration/${dataObj.id}/${params.id}`,
                                  attempt: "SET_WORKFLOW_AS_DEFAULT_REQUEST",
                                  success:
                                    "SET_WORKFLOW_AS_DEFAULT_REQUEST_SUCCESS",
                                  failure:
                                    "SET_WORKFLOW_AS_DEFAULT_REQUEST_FAILURE",
                                  //   navigateTo: null,
                                  successInternalState: (data) => {
                                    fetchMigrationWorkflow();
                                  },
                                  saveBearerToken: true,
                                }
                              )
                            );
                            // dispatch({
                            //   type: "SET_WORKFLOW_AS_DEFAULT_REQUEST",
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
                            setIsAddMigrationDocumentListModalVisible(true);
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
      {isAddMigrationWorkflModalVisible && (
        <AddMigrationWorkflow
          params={params}
          countryRecord={countryRecord}
          isAddMigrationWorkFlowModalVisible={isAddMigrationWorkflModalVisible}
          setIsAddMigrationWorkFlowModalVisible={
            setIsAddMigrationWorkflModalVisible
          }
        />
      )}
      {isUpdateMigrationWorflowModalVisible && (
        <UpdateMigrationWorkflow
          type="migration"
          params={params}
          workflowRecord={workflowRecord}
          countryRecord={countryRecord}
          isUpdateMigrationWorkflowModalVisible={
            isUpdateMigrationWorflowModalVisible
          }
          setIsUpdateMigrationWorkflowModalVisible={
            setIsUpdateMigrationWorflowModalVisible
          }
        />
      )}
      {isAddMigrationDocumentListModalVisible && (
        <AddMigrationDocumentList
          workflowRecord={workflowRecord}
          isAddMigrationDocumentListModalVisible={
            isAddMigrationDocumentListModalVisible
          }
          setIsAddMigrationDocumentListModalVisible={
            setIsAddMigrationDocumentListModalVisible
          }
        />
      )}
      {isManageMigrationWorkflowStatusModalVisible && (
        <ManageEducationWorkflowStaus
          workflowRecord={workflowRecord}
          isManageEducationWorkflowStatusModalVisible={
            isManageMigrationWorkflowStatusModalVisible
          }
          setIsManageEducationWorkflowStatusModalVisible={
            setIsManageMigrationWorkflowStatusModalVisible
          }
        />
      )}
    </Drawer>
  );
};

export default ManageMigrationWorkflow;
