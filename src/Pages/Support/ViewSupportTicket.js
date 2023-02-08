import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  Comment,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  List,
  Modal,
  Select,
  Tooltip,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { formattedDateTime } from "../../Helpers/HelperFunction";
import { allActions } from "../../Redux/myActions";
const { Option } = Select;
const { TextArea } = Input;

const ViewSupportTicket = ({
  pageSize,
  page,
  supportType,
  record,
  isViewSupportTicketModalVisible,
  setIsViewSupportTicketModalVisible,
}) => {
  const store = useSelector((state) => {
    return {
      viewTicketState: state.SupportReducer,
    };
  });
  console.log(store, "store from the support");
  const actions = useDispatch();

  const [form] = Form.useForm();
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

  const fetchTicketById = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/get-ticket-with-replies/${record.id}`,
          attempt: "FETCH_TICKET_BY_ID_REQUEST",
          success: "FETCH_TICKET_BY_ID_REQUEST_SUCCESS",
          failure: "FETCH_TICKET_BY_ID_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({
    //   type: "FETCH_TICKET_BY_ID_REQUEST",
    //   payload: { id: record.id },
    // });
  };
  useEffect(() => {
    if (isViewSupportTicketModalVisible === true) {
      fetchTicketById();
    }
  }, [isViewSupportTicketModalVisible]);

  let ticketStatus;
  if (store.viewTicketState?.individualTicket?.status === "OPEN") {
    ticketStatus = <p className="greenTag">OPEN</p>;
  } else if (store.viewTicketState?.individualTicket?.status === "PENDING") {
    ticketStatus = <p className="orangeTag">OPEN</p>;
  } else if (store.viewTicketState?.individualTicket?.status === "ASSIGNED") {
    ticketStatus = <p className="blueTag">ASSIGNED</p>;
  } else if (store.viewTicketState?.individualTicket?.status === "CLOSE") {
    ticketStatus = <p className="redTag">CLOSED</p>;
  }

  const updateSupportSubmitHandler = (value) => {
    console.log("from ", value);
    const formData = {
      ...value,
    };
    actions(
      allActions(
        { ...value },
        {
          method: "put",
          endPoint: `/add-support-reply/${record.id}`,
          attempt: "REPLY_TO_TICKET_REQUEST",
          success: "REPLY_TO_TICKET_REQUEST_SUCCESS",
          failure: "REPLY_TO_TICKET_REQUEST_FAILURE",
          //   navigateTo: null,
          successInternalState: (data) => {
            fetchTicketById();
          },
          saveBearerToken: true,
        }
      )
    );
    // dispatch({
    //   type: "REPLY_TO_TICKET_REQUEST",
    //   payload: { id: record.id, values: value },
    // });
    form.resetFields();
  };
  const detailFun = (title, value) => {
    return (
      <div style={{ width: "100%" }}>
        <div className="flexRowSpaceBetween">
          {title}:<span>{value}</span>
        </div>
        <Divider orientationMargin="0" style={{ margin: "0.5rem" }} />
      </div>
    );
  };

  console.log("From view support ticket", store.viewTicketState);
  return (
    <Drawer
      title="Support Ticket Description"
      open={isViewSupportTicketModalVisible}
      onClose={() => {
        setIsViewSupportTicketModalVisible(false);
      }}
      width={1163}
      footer={null}
    >
      {/* style={{
          border: "2px solid #ccc",
          borderRadius: "15px",
          width: "90%",
          margin: "0 auto",
          padding: "2rem",
        }} */}
      <div
        style={{
          borderRadius: "15px",
          width: "90%",
          margin: "0 auto",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            borderRadius: "1.5rem",
            padding: "0.8rem",
            display: "flex",
            gap: "0.5rem",
            flexDirection: "column",
          }}
        >
          {detailFun(
            "Created by",
            `${
              store.viewTicketState?.individualTicket?.createdBy?.emailId ??
              "N/A"
            }`
          )}
          {detailFun(
            "Problem Category",
            `${
              store.viewTicketState?.individualTicket?.ticketTitle
                ?.categoryName ?? "N/A"
            }`
          )}
          {detailFun(
            "Submitted",
            `${
              store.viewTicketState?.individualTicket?.addedTime
                ? formattedDateTime(
                    store.viewTicketState?.individualTicket?.addedTime
                  )
                : "N/A"
            }`
          )}
          {detailFun(
            "Ticket Status",

            ticketStatus
          )}
          {detailFun(
            "Ticket Description",
            `${
              store.viewTicketState.individualTicket?.ticketDescription ?? "N/A"
            }`
          )}
        </div>
        <div
          style={{
            borderRadius: "1.5rem",
            padding: "0.8rem",
            display: "flex",
            gap: "0.5rem",
            flexDirection: "column",
            border: "1px solid #ddd",
          }}
        >
          <List
            className="comment-list"
            header={`${store.viewTicketState.individualTicket?.replies?.length} replies`}
            itemLayout="horizontal"
            dataSource={store.viewTicketState.individualTicket?.replies}
            renderItem={(dataObj) => (
              <li key={dataObj.id}>
                {console.log("from list render", dataObj)}
                <Comment
                  key={dataObj.id}
                  actions={() => {}}
                  author={<a>{dataObj.replyAddedBy}</a>}
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: "green",
                        verticalAlign: "middle",
                      }}
                      size="large"
                    >
                      A
                    </Avatar>
                  }
                  content={
                    <div>
                      <p>{dataObj.replyDescription}</p>
                    </div>
                  }
                  datetime={
                    <Tooltip>
                      <span>{formattedDateTime(dataObj.replyAddedTime)}</span>
                    </Tooltip>
                  }
                />
              </li>
            )}
          />

          <Comment
            avatar={
              <Avatar
                style={{
                  backgroundColor: "green",
                  verticalAlign: "middle",
                }}
                size="large"
              >
                A
              </Avatar>
            }
            content={
              <>
                <Form
                  layout="vertical"
                  onFinish={updateSupportSubmitHandler}
                  colon={true}
                  form={form}
                >
                  <Form.Item name={"supportReply"}>
                    <TextArea rows={4} />
                  </Form.Item>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        onClick={() => {}}
                        type="primary"
                      >
                        Reply
                      </Button>
                    </Form.Item>
                    {store.viewTicketState?.individualTicket?.status !==
                      "CLOSE" && (
                      <Form.Item>
                        <Button
                          onClick={() => {
                            actions(
                              allActions(
                                {},
                                {
                                  method: "patch",
                                  endPoint: `/change-ticket-status/close/${record.id}`,
                                  attempt: "CHANGE_SUPPORT_STATUS_REQUEST",
                                  success:
                                    "CHANGE_SUPPORT_STATUS_REQUEST_SUCCESS",
                                  failure:
                                    "CHANGE_SUPPORT_STATUS_REQUEST_FAILURE",
                                  //   navigateTo: null,
                                  successInternalState: (data) => {
                                    fetchTicketById();
                                    fetchAllSupportByType();
                                  },
                                  saveBearerToken: true,
                                }
                              )
                            );
                            // setRecord(dataObj);
                            // setIsViewSupportModalVisible(true);
                          }}
                          type="primary"
                        >
                          Close Ticket
                        </Button>
                      </Form.Item>
                    )}
                  </div>
                </Form>
              </>
            }
          />
        </div>
      </div>
    </Drawer>
  );
};

export default ViewSupportTicket;
