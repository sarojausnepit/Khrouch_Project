import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  Popconfirm,
  Segmented,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { MdOutlineDisabledVisible } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import AddAnnouncement from "./AddAnnouncement";
import UpdateAnnouncement from "./UpdateAnnouncement";
import SiderDemo from "../../components/Siderdemo";
import { allActions } from "../../Redux/myActions";
const columns = [
  {
    title: "",
    dataIndex: "",
    align: "center",
  },
  {
    title: "",
    dataIndex: "",
    align: "center",
  },
  {
    title: "",
    dataIndex: "",
    align: "center",
  },
  {
    title: "",
    dataIndex: "",
    align: "center",
  },
  {
    title: "",
    dataIndex: "",
    align: "center",
  },
  {
    title: "",
    dataIndex: "",
    align: "center",
  },
  {
    title: "",
    dataIndex: "",
    align: "center",
  },
  {
    title: "",
    dataIndex: "",
    align: "center",
  },
  {
    title: "",
    dataIndex: "",
    align: "center",
  },
  {
    title: "",
    dataIndex: "",
    align: "center",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    align: "center",
  },
];

const Announcement = () => {
  const announcementState = useSelector((state) => state.AnnouncementReducer);
  const [isAddAnnouncementModalVisible, setIsAddAnnouncementModalVisible] =
    useState(false);
  const [
    isUpdateAnnouncementModalVisible,
    setIsUpdateAnnouncementModalVisible,
  ] = useState(false);
  const [record, setRecord] = useState({});
  const [announcementType, setAnnouncementType] = useState("announcements");

  const actions = useDispatch();
  const fetchAllAnnouncements = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/announcement/get-all`,
          attempt: "FETCH_ANNOUNCEMENT_REQUEST",
          success: "FETCH_ANNOUNCEMENT_REQUEST_SUCCESS",
          failure: "FETCH_ANNOUNCEMENT_REQUEST_FAILURE",
          //   navigateTo: null,
          //   successInternalState: (data) => {
          //     navigation.navigate("LeadDetails", { item });
          //   },
          saveBearerToken: true,
        }
      )
    );
  };
  const fetchActiveAnnouncements = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/announcement/get-all-active`,
          attempt: "FETCH_ACTIVE_ANNOUNCEMENT_REQUEST",
          success: "FETCH_ACTIVE_ANNOUNCEMENT_REQUEST_SUCCESS",
          failure: "FETCH_ACTIVE_ANNOUNCEMENT_REQUEST_FAILURE",
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
    if (announcementType === "activeAnnouncements") {
      fetchActiveAnnouncements();
    } else {
      fetchAllAnnouncements();
    }
  }, [announcementType]);

  //if (announcementType === "announcements") {
  //     data = announcementState.announcements?.data?.map((dataObj) => {
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
  //             <Tooltip title="Update announcement">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     setIsUpdateAnnouncementModalVisible(true);
  //                     setRecord(dataObj);
  //                   }}
  //                 >
  //                   <EditOutlined />
  //                 </div>
  //               </a>
  //             </Tooltip>
  //             <Tooltip title="Delete announcement">
  //               <Popconfirm
  //                 title="Are you sure to delete this announcement?"
  //                 onConfirm={() => {
  //                   dispatch({
  //                     type: "DELETE_ANNOUNCEMENT_REQUEST",
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
  //             <Tooltip title="Toggle announcement status">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     const actionStatus =
  //                       dataObj.status=== "INACTIVE" ? "active" : "inactive";
  //                     dispatch({
  //                       type: "TOGGLE_ANNOUNCEMENT_STATUS_REQUEST",
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
  //   } else {
  //     data = announcementState.activeAnnouncements?.data?.map((dataObj) => {
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
  //             <Tooltip title="Update announcement">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     setIsUpdateAnnouncementModalVisible(true);
  //                     setRecord(dataObj);
  //                   }}
  //                 >
  //                   <EditOutlined />
  //                 </div>
  //               </a>
  //             </Tooltip>
  //             <Tooltip title="Delete announcement">
  //               <Popconfirm
  //                 title="Are you sure to delete this announcement?"
  //                 onConfirm={() => {
  //                   dispatch({
  //                     type: "DELETE_ANNOUNCEMENT_REQUEST",
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
  //             <Tooltip title="Toggle announcement status">
  //               <a>
  //                 <div
  //                   className="bordered"
  //                   onClick={() => {
  //                     const actionStatus =
  //                       dataObj.=== "INACTIVE" ? "active" : "inactive";
  //                     dispatch({
  //                       type: "TOGGLE_ANNOUNCEMENT_STATUS_REQUEST",
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
  // console.log("from announcement state", announcementState);
  return (
    <SiderDemo>
      <div className="flexColumnwithoutStyle">
        <div className="flexRow">
          <button
            className="button"
            onClick={() => {
              setIsAddAnnouncementModalVisible(true);
            }}
          >
            <span>Add Announcement</span>
          </button>
          <Segmented
            options={[
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <div>All Announcement</div>
                  </div>
                ),
                value: "announcements",
              },
              {
                label: (
                  <div style={{ padding: 4 }}>
                    <div>Active Announcement</div>
                  </div>
                ),
                value: "activeAnnouncements",
              },
            ]}
            onChange={(value) => {
              setAnnouncementType(value);
              console.log(value);
            }}
          />
        </div>
        <div style={{ marginTop: "4rem" }}>
          <Table bordered columns={columns} />
        </div>
      </div>
      {isAddAnnouncementModalVisible && (
        <AddAnnouncement
          isAddAnnouncementModalVisible={isAddAnnouncementModalVisible}
          setIsAddAnnouncementModalVisible={setIsAddAnnouncementModalVisible}
        />
      )}
      {isUpdateAnnouncementModalVisible && (
        <UpdateAnnouncement
          record={record}
          isUpdateAnnouncementModalVisible={isUpdateAnnouncementModalVisible}
          setIsUpdateAnnouncementModalVisible={
            setIsUpdateAnnouncementModalVisible
          }
        />
      )}
    </SiderDemo>
  );
};

export default Announcement;
