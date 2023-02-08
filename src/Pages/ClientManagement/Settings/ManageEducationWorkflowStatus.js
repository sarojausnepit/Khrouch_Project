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
import { CgRowLast, CgRowFirst } from "react-icons/cg";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { DraggableList } from "react-draggable-list";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddWorkFlowStatus from "./AddWorkflowStatus";
import UpdateWorkflowStatus from "./UpdateWorkflowStatus";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { allActions } from "../../../Redux/myActions";

const { Option } = Select;

const ManageEducationWorkflowStaus = ({
  workflowRecord,

  isManageEducationWorkflowStatusModalVisible,
  setIsManageEducationWorkflowStatusModalVisible,
}) => {
  const manageMigrationWorkflowStatusState = useSelector(
    (state) => state.SettingsReducer
  );
  const actions = useDispatch();
  const [form] = Form.useForm();
  const [
    isAddEducationWorkflowStatusModalVisible,
    setIsAddEducationWorkflowStatusModalVisible,
  ] = useState(false);
  const [workflowStatusRecord, setWorkflowStatusRecord] = useState();
  const [
    isUpdateEducationWorflowStatusModalVisible,
    setIsUpdateEducationWorflowStatusModalVisible,
  ] = useState(false);
  const [statusList, setStatusList] = useState();
  const successFn = (response) => {
    console.log("data from fetch workflow by id response", response);
    setStatusList(response?.data);
  };
  const fetchWorkflowStatusById = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/client/workflow/get-all-work-flow-status/${workflowRecord.id}`,
          attempt: "FETCH_WORKFLOW_BY_ID_REQUEST",
          success: "FETCH_WORKFLOW_BY_ID_REQUEST_SUCCESS",
          failure: "FETCH_WORKFLOW_BY_ID_REQUEST_FAILURE",
          navigateTo: null,
          successInternalState: (data) => {
            console.log("data frm manage education workflow status", data);
            successFn(data);
          },
          saveBearerToken: true,
        }
      )
    );
  };
  useEffect(() => {
    if (isManageEducationWorkflowStatusModalVisible === true) {
      fetchWorkflowStatusById();
      // dispatch({
      //   type: "FETCH_WORKFLOW_BY_ID_REQUEST",
      //   payload: { id: workflowRecord.id },
      //   payload2: successFn,
      // });
    }
  }, [isManageEducationWorkflowStatusModalVisible]);

  const onDragEnd = (result) => {
    // rearrange the items array based on the result of the drag and drop operation
  };
  const list = [
    { name: "Mercury" },
    { name: "Venus" },
    { name: "Earth", subtitle: true },
    { name: "Mars" },
    { name: "Jupiter" },
    { name: "Saturn", subtitle: true },
    { name: "Uranus", subtitle: true },
    { name: "Neptune" },
  ];
  console.log("workflow record", workflowRecord);
  console.log("statuslist", statusList);
  const handleArrangement = () => {
    let arrangementDefault = [];
    arrangementDefault = statusList.map((item, index) => {
      return {
        id: item.id,
        priority: index,
      };
    });
    if (arrangementDefault.length > 0) {
      actions(
        allActions(
          { priorityList: [...arrangementDefault] },
          {
            method: "post",
            endPoint: `/client/workflow/update-work-flow-status-priority`,
            attempt: "UPDATE_WORKFLOW_STATUS_PRIORITY_REQUEST",
            success: "UPDATE_WORKFLOW_STATUS_PRIORITY_REQUEST_SUCCESS",
            failure: "UPDATE_WORKFLOW_STATUS_PRIORITY_REQUEST_FAILURE",
            //   navigateTo: null,
            //   successInternalState: (data) => {
            //     navigation.navigate("LeadDetails", { item });
            //   },
            saveBearerToken: true,
          }
        )
      );
      // dispatch({
      //   type: "UPDATE_WORKFLOW_STATUS_PRIORITY_REQUEST",
      //   payload: { priorityList: [...arrangementDefault] },
      // });
    }
  };
  return (
    <Drawer
      title="Work Flow Status"
      open={isManageEducationWorkflowStatusModalVisible}
      onClose={() => {
        setIsManageEducationWorkflowStatusModalVisible(false);
      }}
      footer={null}
      width={1163}
    >
      <div className="flexColumnwithoutStyle">
        <div className="flexRow">
          <button
            className="button"
            onClick={() => {
              setIsAddEducationWorkflowStatusModalVisible(true);
            }}
          >
            <span>Add Workflow Status</span>
          </button>
        </div>
        <div style={{ marginTop: "4rem" }}>
          <DragDropContext
            onDragEnd={(param) => {
              const srcI = param.source.index;
              const destI = param.destination.index;
              statusList.splice(destI, 0, statusList.splice(srcI, 1)[0]);
              setStatusList(statusList);
              console.log("drag drop context...", param);
              console.log("from dragdrp context", statusList);
            }}
          >
            <Droppable droppableId="droppable-1">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {statusList?.map((dataObj, index) => {
                    return (
                      <Draggable
                        key={dataObj.id}
                        draggableId={"draggable-" + dataObj.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <div
                              {...provided.dragHandleProps}
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
                                  {dataObj.statusName}{" "}
                                  {dataObj.isFirstState ? (
                                    <p
                                      className="greenTag"
                                      style={{
                                        borderRadius: "20px",
                                        fontSize: "12px",
                                        paddingTop: "1px",
                                        marginLeft: "1rem",
                                      }}
                                    >
                                      First
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                  {dataObj.isLastState ? (
                                    <p
                                      className="greenTag"
                                      style={{
                                        borderRadius: "20px",
                                        fontSize: "12px",
                                        paddingTop: "1px",
                                        marginLeft: "1rem",
                                      }}
                                    >
                                      Final
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                  {dataObj.isCancelled ? (
                                    <p
                                      className="redTag"
                                      style={{
                                        borderRadius: "20px",
                                        fontSize: "12px",
                                        paddingTop: "1px",
                                        marginLeft: "1rem",
                                      }}
                                    >
                                      Cancelled
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </h3>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "0.5rem",
                                  marginRight: "1.5rem",
                                }}
                              >
                                <Tooltip title="Update Status">
                                  <a>
                                    <div
                                      className="bordered"
                                      onClick={() => {
                                        setWorkflowStatusRecord(dataObj);
                                        setIsUpdateEducationWorflowStatusModalVisible(
                                          true
                                        );
                                      }}
                                    >
                                      <EditOutlined
                                        style={{ fontSize: "18px" }}
                                      />
                                    </div>
                                  </a>
                                </Tooltip>
                                {/* new admin api not implemented in consultancy
                                crm bujhyou?? :) */}
                                <Tooltip title="Delete Status">
                                  <Popconfirm
                                    title="Are you sure to delete this workflow status?"
                                    onConfirm={() => {
                                      actions(
                                        allActions(
                                          {},
                                          {
                                            method: "delete",
                                            endPoint: `/client/workflow/delete-work-flow-status/${dataObj.id}`,
                                            attempt:
                                              "DELETE_WORKFLOW_STATUS_REQUEST",
                                            success:
                                              "DELETE_WORKFLOW_STATUS_REQUEST_SUCCESS",
                                            failure:
                                              "DELETE_WORKFLOW_STATUS_REQUEST_FAILURE",
                                            //   navigateTo: null,
                                            successInternalState: (data) => {
                                              fetchWorkflowStatusById();
                                            },
                                            saveBearerToken: true,
                                          }
                                        )
                                      );
                                    }}
                                    onCancel={() => {}}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    <a>
                                      <div className="bordered">
                                        <DeleteOutlined
                                          style={{ fontSize: "18px" }}
                                        />
                                      </div>
                                    </a>
                                  </Popconfirm>
                                </Tooltip>
                                <Tooltip title="Start node">
                                  <a>
                                    <div
                                      className="bordered"
                                      onClick={() => {
                                        actions(
                                          allActions(
                                            {},
                                            {
                                              method: "put",
                                              endPoint: `/client/workflow/assign-workflow-status-as-first/${dataObj.id}`,
                                              attempt:
                                                "CHANGE_STATUS_AS_FIRST_REQUEST",
                                              success:
                                                "CHANGE_STATUS_AS_FIRST_REQUEST_SUCCESS",
                                              failure:
                                                "CHANGE_STATUS_AS_FIRST_REQUEST_FAILURE",
                                              //   navigateTo: null,
                                              successInternalState: (data) => {
                                                fetchWorkflowStatusById();
                                              },
                                              saveBearerToken: true,
                                            }
                                          )
                                        );
                                        // dispatch({
                                        //   type: "CHANGE_STATUS_AS_FIRST_REQUEST",
                                        //   payload: {
                                        //     id: dataObj.id,
                                        //     workflowId: workflowRecord.id,
                                        //   },
                                        //   payload2: successFn,
                                        // });
                                      }}
                                    >
                                      <CgRowFirst
                                        style={{ fontSize: "18px" }}
                                      />
                                    </div>
                                  </a>
                                </Tooltip>
                                <Tooltip title="Final node">
                                  <a>
                                    <div
                                      className="bordered"
                                      onClick={() => {
                                        actions(
                                          allActions(
                                            {},
                                            {
                                              method: "put",
                                              endPoint: `/client/workflow/assign-workflow-status-as-final/${dataObj.id}`,
                                              attempt:
                                                "CHANGE_STATUS_AS_FINAL_REQUEST",
                                              success:
                                                "CHANGE_STATUS_AS_FINAL_REQUEST_SUCCESS",
                                              failure:
                                                "CHANGE_STATUS_AS_FINAL_REQUEST_FAILURE",
                                              //   navigateTo: null,
                                              successInternalState: (data) => {
                                                fetchWorkflowStatusById();
                                              },
                                              saveBearerToken: true,
                                            }
                                          )
                                        );
                                        // dispatch({
                                        //   type: "CHANGE_STATUS_AS_FINAL_REQUEST",
                                        //   payload: {
                                        //     id: dataObj.id,
                                        //     workflowId: workflowRecord.id,
                                        //   },
                                        //   payload2: successFn,
                                        // });
                                      }}
                                    >
                                      <CgRowLast style={{ fontSize: "18px" }} />
                                    </div>
                                  </a>
                                </Tooltip>
                                <Tooltip title="Cancel node">
                                  <a>
                                    <div
                                      className="bordered"
                                      onClick={() => {
                                        actions(
                                          allActions(
                                            {},
                                            {
                                              method: "put",
                                              endPoint: `/client/workflow/assign-workflow-status-as-cancelled/${dataObj.id}`,
                                              attempt:
                                                "CHANGE_STATUS_AS_CANCELLED_REQUEST",
                                              success:
                                                "CHANGE_STATUS_AS_CANCELLED_REQUEST_SUCCESS",
                                              failure:
                                                "CHANGE_STATUS_AS_CANCELLED_REQUEST_FAILURE",
                                              //   navigateTo: null,
                                              successInternalState: (data) => {
                                                fetchWorkflowStatusById();
                                              },
                                              saveBearerToken: true,
                                            }
                                          )
                                        );
                                        // dispatch({
                                        //   type: "CHANGE_STATUS_AS_CANCELLED_REQUEST",
                                        //   payload: {
                                        //     id: dataObj.id,
                                        //     workflowId: workflowRecord.id,
                                        //   },
                                        //   payload2: successFn,
                                        // });
                                      }}
                                    >
                                      <MdOutlineCancelPresentation
                                        style={{ fontSize: "18px" }}
                                      />
                                    </div>
                                  </a>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            handleArrangement();
          }}
        >
          Make this arrangement as default
        </Button>
      </div>
      {isAddEducationWorkflowStatusModalVisible && (
        <AddWorkFlowStatus
          statusList={statusList}
          setStatusList={setStatusList}
          workflowRecord={workflowRecord}
          isAddWorkFlowStatusModalVisible={
            isAddEducationWorkflowStatusModalVisible
          }
          setIsAddWorkFlowStatusModalVisible={
            setIsAddEducationWorkflowStatusModalVisible
          }
        />
      )}

      {isUpdateEducationWorflowStatusModalVisible && (
        <UpdateWorkflowStatus
          statusList={statusList}
          setStatusList={setStatusList}
          workflowRecord={workflowRecord}
          workflowStatusRecord={workflowStatusRecord}
          isUpdateWorkflowStatusModalVisible={
            isUpdateEducationWorflowStatusModalVisible
          }
          setIsUpdateWorkflowStatusModalVisible={
            setIsUpdateEducationWorflowStatusModalVisible
          }
        />
      )}
    </Drawer>
  );
};

export default ManageEducationWorkflowStaus;
