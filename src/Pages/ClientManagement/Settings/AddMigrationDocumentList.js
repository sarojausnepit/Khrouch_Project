import React, { useState } from "react";
import {
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

import moment from "moment/moment";
import { FcDocument } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import AddDocuments from "./AddDocuments";
import { useEffect } from "react";
import UpdateDocument from "./UpdateDocument";
import { act } from "react-dom/test-utils";
import { allActions } from "../../../Redux/myActions";
const { Option } = Select;

const AddMigrationDocumentList = ({
  workflowRecord,
  isAddMigrationDocumentListModalVisible,
  setIsAddMigrationDocumentListModalVisible,
}) => {
  const addDocumentChecklistState = useSelector(
    (state) => state.SettingsReducer
  );
  const [isAddDocumentVisible, setIsAddDocumentVisible] = useState(false);
  const [isUpdateDocumentModalVisible, setIsUpdateDocumentModalVisible] =
    useState(false);
  const actions = useDispatch();

  const [documentRecord, setDocumentRecord] = useState({});
  const fetchWorkflowDocumentChecklist = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/client/workflow/get-all-document-check-list/${workflowRecord.id}`,
          attempt: "FETCH_DOCUMENTS_REQUEST",
          success: "FETCH_DOCUMENTS_REQUEST_SUCCESS",
          failure: "FETCH_DOCUMENTS_REQUEST_FAILURE",
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
      isAddMigrationDocumentListModalVisible === true ||
      isAddDocumentVisible === false ||
      isUpdateDocumentModalVisible === false
    ) {
      fetchWorkflowDocumentChecklist();

      // dispatch({
      //   type: "FETCH_DOCUMENTS_REQUEST",
      //   payload: { id: workflowRecord.id },
      // });
    }
  }, [
    isAddMigrationDocumentListModalVisible,
    isAddDocumentVisible,
    isUpdateDocumentModalVisible,
  ]);
  console.log("document checklist", addDocumentChecklistState);
  return (
    <Drawer
      title="Document Checklist"
      open={isAddMigrationDocumentListModalVisible}
      onClose={() => {
        setIsAddMigrationDocumentListModalVisible(false);
      }}
      footer={null}
      width={1163}
    >
      <div className="flexColumnwithoutStyle">
        <div className="flexRow">
          <button
            className="button"
            onClick={() => {
              setIsAddDocumentVisible(true);
            }}
          >
            <span>Add Document Checklist</span>
          </button>
        </div>
        <div style={{ marginTop: "1rem" }}>
          {addDocumentChecklistState.documents.data.map((dataObj) => {
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
                  <div>{dataObj.documentSize} </div>
                  {/* <div>{dataObj.documentType}</div> */}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginRight: "1.5rem",
                  }}
                >
                  <Tooltip title="Update">
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
                  </Tooltip>

                  <Tooltip title="Delete">
                    <Popconfirm
                      title="Are you sure to delete this document?"
                      onConfirm={() => {
                        actions(
                          allActions(
                            {},
                            {
                              method: "delete",
                              endPoint: `/client/workflow/delete-document-check-list/${dataObj.id}`,
                              attempt: "DELETE_DOCUMENT_REQUEST",
                              success: "DELETE_DOCUMENT_REQUEST_SUCCESS",
                              failure: "DELETE_DOCUMENT_REQUEST_FAILURE",
                              //   navigateTo: null,
                              successInternalState: (data) => {
                                fetchWorkflowDocumentChecklist();
                              },
                              saveBearerToken: true,
                            }
                          )
                        );
                        // dispatch({
                        //   type: "DELETE_DOCUMENT_REQUEST",
                        //   payload: {
                        //     id: dataObj.id,
                        //     workflowId: workflowRecord.id,
                        //   },
                        // });
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
                      </a>
                    </Popconfirm>
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isAddDocumentVisible && (
        <AddDocuments
          workflowRecord={workflowRecord}
          isAddDocumentsModalVisible={isAddDocumentVisible}
          setIsAddDocumentsModalVisible={setIsAddDocumentVisible}
        />
      )}
      {isUpdateDocumentModalVisible && (
        <UpdateDocument
          documentRecord={documentRecord}
          workflowRecord={workflowRecord}
          isUpdateDocumentModalVisible={isUpdateDocumentModalVisible}
          setIsUpdateDocumentModalVisible={setIsUpdateDocumentModalVisible}
        />
      )}
    </Drawer>
  );
};

export default AddMigrationDocumentList;
