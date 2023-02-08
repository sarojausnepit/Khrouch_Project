import React, { useState } from "react";
import {
  Button,
  Card,
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

import moment from "moment/moment";
import { FcDocument } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import AddDocumentChecklist from "./AddDocumentCheckList";
import UpdateDocumentCheckList from "./UpdateDocumentCheckList";
import { allActions } from "../../../Redux/myActions";
import AddDocumentChecklistForCourse from "./AddDocumentChecklistForCourse";
const { Option } = Select;

const AddOffshoreDocumentChecklist = ({
  workflowRecord,
  isOnshore,
  isAddOffshoreDocumentListModalVisible,
  setIsAddOffshoreDocumentListModalVisible,
}) => {
  const addDocumentChecklistState = useSelector(
    (state) => state.CoursesReducer
  );
  const [isAddDocumentVisible, setIsAddDocumentVisible] = useState(false);
  const [isUpdateDocumentModalVisible, setIsUpdateDocumentModalVisible] =
    useState(false);
  const actions = useDispatch();
  const [documentRecord, setDocumentRecord] = useState({});
  const fetchCourseDocumentChecklist = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/course/checkList/get-all-by-course-id/${workflowRecord.id}`,
          attempt: "FETCH_COURSES_DOCUMENTS_REQUEST",
          success: "FETCH_COURSES_DOCUMENTS_REQUEST_SUCCESS",
          failure: "FETCH_COURSES_DOCUMENTS_REQUEST_FAILURE",
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
    if (isAddOffshoreDocumentListModalVisible === true) {
      fetchCourseDocumentChecklist();
      // dispatch({
      //   type: "FETCH_COURSES_DOCUMENTS_REQUEST",
      //   payload: { id: workflowRecord.id, type: "offshore" },
      // });
    }
  }, [isAddOffshoreDocumentListModalVisible]);
  console.log("document checklist", addDocumentChecklistState);
  return (
    <Drawer
      title={
        isOnshore ? "Onshore Document Checklist" : "Offshore Document Checklist"
      }
      open={isAddOffshoreDocumentListModalVisible}
      onClose={() => {
        setIsAddOffshoreDocumentListModalVisible(false);
      }}
      footer={null}
      width={1163}
    >
      <Card loading={addDocumentChecklistState.isLoading}>
        <div className="flexColumnwithoutStyle">
          <div className="flexRow">
            <button
              className="button"
              onClick={() => {
                setIsAddDocumentVisible(true);
              }}
            >
              <span>Add Document</span>
            </button>
          </div>
          <div style={{ marginTop: "1rem" }}>
            {isOnshore
              ? addDocumentChecklistState.documents.onShoreCheckList?.map(
                  (dataObj) => {
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
                            padding: "0.5rem",
                          }}
                        >
                          <FcDocument style={{ fontSize: "20px" }} />
                          {dataObj.item}
                          <div>{dataObj.documentSize}</div>
                          {/* <div>{dataObj.documentType}</div> */}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            marginRight: "1.5rem",
                          }}
                        >
                          {/* <Tooltip title="Update">
                        <a>
                          <div
                            className="bordered"
                            onClick={() => {
                              setDocumentRecord(dataObj);
                              setIsUpdateDocumentModalVisible(true);
                            }}
                          >
                            <EditOutlined style={{ fontSize: "18px" }} />
                          </div>
                        </a>
                      </Tooltip> */}

                          {/* <Tooltip title="Delete">
                    <Popconfirm
                      title="Are you sure to delete this document?"
                      onConfirm={() => {
                        dispatch({
                          type: "DELETE_DOCUMENT_REQUEST",
                          payload: {
                            id: dataObj.id,
                            workflowId: workflowRecord.id,
                          },
                        });
                      }}
                      // countryId: countryRecord.id,

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
                  </Tooltip> */}
                        </div>
                      </div>
                    );
                  }
                )
              : addDocumentChecklistState.documents.offShoreCheckList?.map(
                  (dataObj) => {
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
                            padding: "0.5rem",
                          }}
                        >
                          <FcDocument style={{ fontSize: "20px" }} />
                          {dataObj.item}
                          <div>{dataObj.documentSize}</div>
                          {/* <div>{dataObj.documentType}</div> */}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            marginRight: "1.5rem",
                          }}
                        >
                          {/* <Tooltip title="Update">
                        <a>
                          <div
                            className="bordered"
                            onClick={() => {
                              setDocumentRecord(dataObj);
                              setIsUpdateDocumentModalVisible(true);
                            }}
                          >
                            <EditOutlined style={{ fontSize: "18px" }} />
                          </div>
                        </a>
                      </Tooltip> */}

                          {/* <Tooltip title="Delete">
                    <Popconfirm
                      title="Are you sure to delete this document?"
                      onConfirm={() => {
                        dispatch({
                          type: "DELETE_DOCUMENT_REQUEST",
                          payload: {
                            id: dataObj.id,
                            workflowId: workflowRecord.id,
                          },
                        });
                      }}
                      // countryId: countryRecord.id,

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
                  </Tooltip> */}
                        </div>
                      </div>
                    );
                  }
                )}
          </div>
        </div>
      </Card>
      {isAddDocumentVisible && (
        <AddDocumentChecklistForCourse
          isOnshore={isOnshore}
          record={workflowRecord}
          isAddDocumentChecklistModalVisible={isAddDocumentVisible}
          setIsAddDocumentChecklistModalVisible={setIsAddDocumentVisible}
          fetchCourseDocumentChecklist={fetchCourseDocumentChecklist}
        />
      )}
      {/* {isUpdateDocumentModalVisible && (
        <UpdateDocumentCheckList
          isOnshore={false}
          record={workflowRecord}
          documentRecord={documentRecord}
          isUpdateDocumentChecklistModalVisible={isUpdateDocumentModalVisible}
          setIsUpdateDocumentChecklistModalVisible={
            setIsUpdateDocumentModalVisible
          }
        />
      )} */}
    </Drawer>
  );
};

export default AddOffshoreDocumentChecklist;
