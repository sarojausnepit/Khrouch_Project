import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  Pagination,
  Popconfirm,
  Segmented,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { MdOutlineDisabledVisible } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { allActions } from "../../../Redux/myActions";
import SiderDemo from "../../../components/Siderdemo";
import UpdateDocumentCheckList from "../../EducationManagement/Courses/UpdateDocumentCheckList";
import AddDocumentChecklist from "../../EducationManagement/Courses/AddDocumentCheckList";
import TableSkeleton from "../../../Helpers/TableSkeleton/tableSkelaton";
const columns = [
  {
    title: "Document ID",
    dataIndex: "id",
    align: "center",
  },

  {
    title: "Document Name",
    dataIndex: "documentType",
    align: "center",
  },
  {
    title: "Document Size",
    dataIndex: "documentSize",
    align: "center",
  },

  {
    title: "Actions",
    dataIndex: "actions",
    align: "center",
  },
];

const OnshoreDocumentManagement = () => {
  const onshoreDocumentState = useSelector(
    (state) => state.DocumentManagementReducer
  );
  const [isAddDocumentVisible, setIsAddDocumentVisible] = useState(false);

  const [isUpdateDocumentModalVisible, setIsUpdateDocumentModalVisible] =
    useState(false);
  const [record, setRecord] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const onShowSizeChange = (current, pageSize) => {
    window.scrollTo(0, 0);
    setPage(current);
    setPageSize(pageSize);
  };
  const actions = useDispatch();
  const fetchOnshoreDocuments = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/course/checkList/get-all/onshore?page=${page}&pageSize=${pageSize}`,
          attempt: "FETCH_ONSHORE_DOCUMENTS_REQUEST",
          success: "FETCH_ONSHORE_DOCUMENTS_REQUEST_SUCCESS",
          failure: "FETCH_ONSHORE_DOCUMENTS_REQUEST_FAILURE",
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
      isAddDocumentVisible === false ||
      isUpdateDocumentModalVisible === false
    ) {
      fetchOnshoreDocuments();
    }
  }, [isAddDocumentVisible, isUpdateDocumentModalVisible]);

  const data = onshoreDocumentState.onshoreDocuments?.data?.map((dataObj) => {
    return {
      key: dataObj.id,
      id: dataObj.id,
      documentType: dataObj.documentType,
      documentSize: dataObj.documentSize,

      actions: (
        <Space size="middle">
          <Tooltip title="Update">
            <a>
              <div
                className="bordered"
                onClick={() => {
                  setRecord(dataObj);
                  setIsUpdateDocumentModalVisible(true);
                }}
              >
                <EditOutlined style={{ fontSize: "18px" }} />
              </div>
            </a>
          </Tooltip>
          {/* <Tooltip title="Delete onshoreDocument">
            <Popconfirm
              title="Are you sure to delete this onshoreDocument?"
              onConfirm={() => {
                dispatch({
                  type: "DELETE_ONSHORE_DOCUMENTS_REQUEST",
                  payload: { id: dataObj.id },
                });
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <a>
                <div className="bordered">
                  <DeleteOutlined />
                </div>
              </a>{" "}
            </Popconfirm>
          </Tooltip>
          <Tooltip title="Toggle onshoreDocument status">
            <a>
              <div
                className="bordered"
                onClick={() => {
                  const actionStatus =
                    dataObj.status === "INACTIVE" ? "active" : "inactive";
                  dispatch({
                    type: "TOGGLE_ONSHORE_DOCUMENTS_STATUS_REQUEST",
                    payload: { id: dataObj.id, actionStatus },
                  });
                }}
              >
                <MdOutlineDisabledVisible />
              </div>
            </a>
          </Tooltip> */}
        </Space>
      ),
    };
  });
  console.log("from onshoreDocument state", onshoreDocumentState);
  return (
    <SiderDemo>
      <div className="flexColumnwithoutStyle">
        <div className="flexRow">
          <button
            className="button"
            onClick={() => {
              setIsAddDocumentVisible(true);
            }}
          >
            <span>Add Onshore Document</span>
          </button>
        </div>
        <div
          style={{
            marginTop: "4rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {onshoreDocumentState.isLoading ? (
            <TableSkeleton />
          ) : (
            <Table
              bordered
              columns={columns}
              dataSource={data}
              pagination={false}
            />
          )}

          {onshoreDocumentState.onshoreDocuments?.totalData && (
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
              total={onshoreDocumentState.onshoreDocuments?.totalPage * 10}
            />
          )}
        </div>
      </div>
      {isAddDocumentVisible && (
        <AddDocumentChecklist
          isOnshore={true}
          isAddDocumentChecklistModalVisible={isAddDocumentVisible}
          setIsAddDocumentChecklistModalVisible={setIsAddDocumentVisible}
          fetchOnshoreDocuments={fetchOnshoreDocuments}
        />
      )}
      {isUpdateDocumentModalVisible && (
        <UpdateDocumentCheckList
          isOnshore={true}
          record={record}
          isUpdateDocumentChecklistModalVisible={isUpdateDocumentModalVisible}
          setIsUpdateDocumentChecklistModalVisible={
            setIsUpdateDocumentModalVisible
          }
          fetchOnshoreDocuments={fetchOnshoreDocuments}
        />
      )}
    </SiderDemo>
  );
};

export default OnshoreDocumentManagement;
