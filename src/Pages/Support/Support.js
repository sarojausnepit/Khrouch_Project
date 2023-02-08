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
import {
  MdOutlineAssignmentTurnedIn,
  MdOutlineDisabledVisible,
  MdOutlinePending,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import AddSupport from "./AddSupport";
import UpdateSupport from "./UpdateSupport";
import { BsReply } from "react-icons/bs";
import { GrFormView, GrStatusPlaceholder, GrView } from "react-icons/gr";
import ViewSupportTicket from "./ViewSupportTicket";
import { formattedDateTime } from "../../Helpers/HelperFunction";
import { AiOutlineCloseCircle, AiOutlineEye } from "react-icons/ai";
import SiderDemo from "../../components/Siderdemo";
import { allActions } from "../../Redux/myActions";
import TableSkeleton from "../../Helpers/TableSkeleton/tableSkelaton";
import AssignSupportTicket from "./AssignSupportTicket";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
const columns = [
  {
    title: "Support Category",
    dataIndex: "supportCategory",
    align: "center",
  },
  {
    title: "Added Date/Time",
    dataIndex: "addedTime",
    align: "center",
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    align: "center",
  },
  {
    title: "Ticket Status",
    dataIndex: "status",
    align: "center",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    align: "center",
  },
];

const Support = () => {
  const supportState = useSelector((state) => state.SupportReducer);
  const [isAddSupportModalVisible, setIsAddSupportModalVisible] =
    useState(false);
  const [isUpdateSupportModalVisible, setIsUpdateSupportModalVisible] =
    useState(false);
  const [isViewSupportModalVisible, setIsViewSupportModalVisible] =
    useState(false);
  const [
    isAssignSupportTicketModalVisible,
    setIsAssignSupportTicketModalVisible,
  ] = useState(false);
  const [record, setRecord] = useState({});
  const [supportType, setSupportType] = useState("OPEN");
  const actions = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const onShowSizeChange = (current, pageSize) => {
    window.scrollTo(0, 0);
    setPage(current);
    setPageSize(pageSize);
  };

  const fetchAllSupportByType = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/support-get-all/${supportType}?page=${page}&pageSize=${pageSize}`,
          attempt: "FETCH_SUPPORT_REQUEST",
          success: "FETCH_SUPPORT_REQUEST_SUCCESS",
          failure: "FETCH_SUPPORT_REQUEST_FAILURE",
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
    fetchAllSupportByType();
    // dispatch({ type: "FETCH_SUPPORT_REQUEST" });
  }, [supportType, page, pageSize]);
  // useEffect(() => {
  //   if (
  //     isAddSupportModalVisible === false ||
  //     isUpdateSupportModalVisible === false
  //   ) {
  //     fetchAllSupportByType();
  //     // dispatch({ type: "FETCH_SUPPORT_REQUEST" });
  //   }
  // }, [isAddSupportModalVisible, isUpdateSupportModalVisible]);
  const data = supportState.supports?.data?.map((dataObj) => {
    let ticketStatus;
    if (dataObj.status === "OPEN") {
      ticketStatus = <p className="greenTag">OPEN</p>;
    } else if (dataObj.status === "PENDING") {
      ticketStatus = <p className="orangeTag">PENDING</p>;
    } else if (dataObj.status === "ASSIGNED") {
      ticketStatus = <p className="blueTag">ASSIGNED</p>;
    } else if (dataObj.status === "CLOSE") {
      ticketStatus = <p className="redTag">CLOSED</p>;
    }

    return {
      key: dataObj.id,
      supportCategory: dataObj?.supportCategory?.categoryName,
      addedTime: formattedDateTime(dataObj.addedTime),
      createdBy: dataObj.createdBy?.emailId,
      status: ticketStatus,

      actions: (
        <Space size="middle">
          <Tooltip title="Reply to Ticket">
            <a>
              <div
                className="bordered"
                onClick={() => {
                  setIsUpdateSupportModalVisible(true);
                  setRecord(dataObj);
                }}
              >
                <BsReply size={20} />
              </div>
            </a>
          </Tooltip>

          <Tooltip title="View Ticket">
            <a>
              <div
                className="bordered"
                onClick={() => {
                  setRecord(dataObj);
                  setIsViewSupportModalVisible(true);
                }}
              >
                <AiOutlineEye />
              </div>
            </a>
          </Tooltip>
          {dataObj.status !== "OPEN" && (
            <Tooltip title="Mark status as open">
              <a>
                <div
                  className="bordered"
                  onClick={() => {
                    actions(
                      allActions(
                        {},
                        {
                          method: "patch",
                          endPoint: `/change-ticket-status/open/${dataObj.id}`,
                          attempt: "CHANGE_SUPPORT_STATUS_REQUEST",
                          success: "CHANGE_SUPPORT_STATUS_REQUEST_SUCCESS",
                          failure: "CHANGE_SUPPORT_STATUS_REQUEST_FAILURE",
                          //   navigateTo: null,
                          successInternalState: (data) => {
                            fetchAllSupportByType();
                          },
                          saveBearerToken: true,
                        }
                      )
                    );
                    // setRecord(dataObj);
                    // setIsViewSupportModalVisible(true);
                  }}
                >
                  <RiCheckboxBlankCircleLine />
                </div>
              </a>
            </Tooltip>
          )}
          {dataObj.status !== "PENDING" && (
            <Tooltip title="Mark status as pending">
              <a>
                <div
                  className="bordered"
                  onClick={() => {
                    actions(
                      allActions(
                        {},
                        {
                          method: "patch",
                          endPoint: `/change-ticket-status/pending/${dataObj.id}`,
                          attempt: "CHANGE_SUPPORT_STATUS_REQUEST",
                          success: "CHANGE_SUPPORT_STATUS_REQUEST_SUCCESS",
                          failure: "CHANGE_SUPPORT_STATUS_REQUEST_FAILURE",
                          //   navigateTo: null,
                          successInternalState: (data) => {
                            fetchAllSupportByType();
                          },
                          saveBearerToken: true,
                        }
                      )
                    );
                    // setRecord(dataObj);
                    // setIsViewSupportModalVisible(true);
                  }}
                >
                  <MdOutlinePending />
                </div>
              </a>
            </Tooltip>
          )}
          {dataObj.status !== "CLOSE" && (
            <Tooltip title="Mark status as closed">
              <a>
                <div
                  className="bordered"
                  onClick={() => {
                    actions(
                      allActions(
                        {},
                        {
                          method: "patch",
                          endPoint: `/change-ticket-status/close/${dataObj.id}`,
                          attempt: "CHANGE_SUPPORT_STATUS_REQUEST",
                          success: "CHANGE_SUPPORT_STATUS_REQUEST_SUCCESS",
                          failure: "CHANGE_SUPPORT_STATUS_REQUEST_FAILURE",
                          //   navigateTo: null,
                          successInternalState: (data) => {
                            fetchAllSupportByType();
                          },
                          saveBearerToken: true,
                        }
                      )
                    );
                    // setRecord(dataObj);
                    // setIsViewSupportModalVisible(true);
                  }}
                >
                  <AiOutlineCloseCircle />
                </div>
              </a>
            </Tooltip>
          )}
          {dataObj.status !== "ASSIGNED" && (
            <Tooltip title="Assign support ticket">
              <a>
                <div
                  className="bordered"
                  onClick={() => {
                    setRecord(dataObj);
                    setIsAssignSupportTicketModalVisible(true);
                  }}
                >
                  <MdOutlineAssignmentTurnedIn />
                </div>
              </a>
            </Tooltip>
          )}

          {/* <Tooltip title="View Ticket">
            <a>
              <div
                className="bordered"
                onClick={() => {
                  setRecord(dataObj);
                  setIsViewSupportModalVisible(true);
                }}
              >
                <AiOutlineEye />
              </div>
            </a>
          </Tooltip> */}
        </Space>
      ),
    };
  });

  //  else {
  //     data = supportState.activeSupports?.data?.map((dataObj) => {
  //       return {
  //     key: dataObj.id,
  //     : dataObj.,
  //     : dataObj.,
  //     : dataObj.,
  //     : dataObj.,
  //     : dataObj.,
  //     : dataObj.,
  //     : dataObj.,
  //     : dataObj.,
  //         : dataObj.? (
  //           <Tag color="#00ff00aa">YES</Tag>
  //         ) : (
  //           <Tag color="#ff0000aa">NO</Tag>
  //         ),
  //         :
  //           dataObj.=== "ACTIVE" ? (
  //             <p className="greenTag">{dataObj.}</p>
  //           ) : (
  //             <p className="redTag">{dataObj.}</p>
  //           ),
  //         actions: (
  //           <Space size="middle">
  //             <Tooltip title="Update support">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     setIsUpdateSupportModalVisible(true);
  //                     setRecord(dataObj);
  //                   }}
  //                 >
  //                   <EditOutlined />
  //                 </div>
  //               </a>
  //             </Tooltip>
  //             <Tooltip title="Delete support">
  //               <Popconfirm
  //                 title="Are you sure to delete this support?"
  //                 onConfirm={() => {
  //                   dispatch({
  //                     type: "DELETE_SUPPORT_REQUEST",
  //                     payload: { id: dataObj.id },
  //                   });
  //                 }}
  //                 onCancel={() => {}}
  //                 okText="Yes"
  //                 cancelText="No"
  //               >
  //                 <a>
  //                   <div className="bordered">
  //                     <DeleteOutlined />
  //                   </div>
  //                 </a>{" "}
  //               </Popconfirm>
  //             </Tooltip>
  //             <Tooltip title="Toggle support status">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     const actionStatus =
  //                       dataObj.=== "INACTIVE" ? "active" : "inactive";
  //                     dispatch({
  //                       type: "TOGGLE_SUPPORT_STATUS_REQUEST",
  //                       payload: { id: dataObj.id, actionStatus },
  //                     });
  //                   }}
  //                 >
  //                   <MdOutlineDisabledVisible />
  //                 </div>
  //               </a>
  //             </Tooltip>
  //           </Space>
  //         ),
  //       };
  //     });
  //   }
  // console.log("from support state", supportState);
  return (
    <SiderDemo>
      <div className="flexColumnwithoutStyle">
        <div className="flexRow" style={{ justifyContent: "center" }}>
          {/* <button
            className="button"
            onClick={() => {
              setIsAddSupportModalVisible(true);
            }}
          >
            <span>Add Support</span>
          </button> */}
          <Segmented
            options={[
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <div>OPEN </div>
                  </div>
                ),
                value: "OPEN",
              },
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <div>PENDING </div>
                  </div>
                ),
                value: "PENDING",
              },
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <div>ASSIGNED </div>
                  </div>
                ),
                value: "ASSIGNED",
              },
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <div>CLOSED </div>
                  </div>
                ),
                value: "CLOSE",
              },
            ]}
            onChange={(value) => {
              setPage(1);
              setPageSize(10);
              setSupportType(value);
              console.log(value);
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "4rem",
          }}
        >
          {supportState.isLoading ? (
            <TableSkeleton />
          ) : (
            <Table
              bordered
              columns={columns}
              dataSource={data}
              pagination={false}
            />
          )}

          {supportState.supports?.totalData && (
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
              total={supportState.supports?.totalPage * 10}
            />
          )}
        </div>
      </div>
      {/* {isAddSupportModalVisible && (
        <AddSupport
          isaddSupportModalVisible={isAddSupportModalVisible}
          setIsaddSupportModalVisible={setIsAddSupportModalVisible}
        />
      )} */}
      {isUpdateSupportModalVisible && (
        <UpdateSupport
          record={record}
          isUpdateSupportModalVisible={isUpdateSupportModalVisible}
          setIsUpdateSupportModalVisible={setIsUpdateSupportModalVisible}
        />
      )}
      {isViewSupportModalVisible && (
        <ViewSupportTicket
          supportType={supportType}
          page={page}
          pageSize={pageSize}
          record={record}
          isViewSupportTicketModalVisible={isViewSupportModalVisible}
          setIsViewSupportTicketModalVisible={setIsViewSupportModalVisible}
        />
      )}
      {isAssignSupportTicketModalVisible && (
        <AssignSupportTicket
          record={record}
          isAssignSupportTicketModalVisible={isAssignSupportTicketModalVisible}
          setIsAssignSupportTicketModalVisible={
            setIsAssignSupportTicketModalVisible
          }
        />
      )}
    </SiderDemo>
  );
};

export default Support;
