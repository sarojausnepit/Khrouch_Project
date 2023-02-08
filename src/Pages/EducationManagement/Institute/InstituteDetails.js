import {
  Card,
  Divider,
  Drawer,
  Image,
  Modal,
  Input,
  Tooltip,
  Checkbox,
  Button,
} from "antd";
import React, { useEffect } from "react";
import client from "../../../Assets/client.png";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FcDocument } from "react-icons/fc";
import { GoLocation } from "react-icons/go";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const { Meta } = Card;

const InstituteDetais = ({
  record,
  isInstituteDetailsModelVisible,
  setIsInstituteDetailsModelVisible,
}) => {
  const visaState = useSelector((state) => state.VisasReducer);

  const dispatch = useDispatch();

  const [current, setCurrent] = useState("document");
  const clientDetailsTabList = [
    {
      key: "document",
      tab: "Document",
    },
    {
      key: "bonuses",
      tab: "Bonuses",
    },
    {
      key: "description",
      tab: "Description",
    },
  ];
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
  console.log("Institute details record", record);

  return (
    <Drawer
      title="Institute Details"
      open={isInstituteDetailsModelVisible}
      onClose={() => {
        console.log("click");
        setIsInstituteDetailsModelVisible(false);
      }}
      footer={null}
      width={1163}
    >
      <Card style={{ borderRadius: "0.5rem" }} className="drawerStyle">
        <div className="flexRowWithoutStyle" style={{ gap: "1rem" }}>
          {record?.image ? (
            <Image src={record?.image} className={"clientImage"} />
          ) : (
            <Image src={client} className={"clientImage"} />
          )}
          <div
            className="flexColumnWithoutStyle"
            style={{
              justifyContent: "flex-start",
              width: "100%",
              gap: "0.5rem",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              {record?.instituteName ? record?.instituteName : "N/A"}
            </div>
            <div
              className="flexRowWithoutStyle"
              style={{ gap: "0.4rem", color: "#aaa" }}
            >
              <span className="flexRowWithGap">
                <AiOutlinePhone
                  style={{
                    fontSize: "20",
                  }}
                />{" "}
                {record?.contact ? record?.contact : "N/A"}
              </span>
              <span className="flexRowWithGap">
                <GoLocation
                  style={{
                    fontSize: "16",
                  }}
                />{" "}
                {record?.location ? record?.location : "N/A"}
              </span>
              <span className="flexRowWithGap">
                <AiOutlineMail
                  style={{
                    fontSize: "16",
                  }}
                />{" "}
                {record?.email ? record?.email : "N/A"}
              </span>
            </div>

            <div className="flexColumnWithoutStyle">
              <h4>{record?.country?.name}</h4>
              <div>{record?.levelOfCollege?.name}</div>
              <div>CRICOS: {record?.crisco}</div>
              <div>RTO: {record?.rtoNumber}</div>
            </div>
          </div>
        </div>
        <Card
          bordered={false}
          tabList={clientDetailsTabList}
          activeTabKey={current}
          onTabChange={(key) => {
            setCurrent(key);
          }}
        >
          {current === "document" && (
            <>
              {record?.documents?.map((dataObj) => {
                return (
                  <div key={dataObj.id}>
                    <a
                      href={dataObj?.documentUrl}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "1px",
                        flexWrap: "wrap",
                      }}
                    >
                      <FcDocument style={{ fontSize: "30px" }} />
                      <span>{dataObj?.documentName}</span>
                    </a>
                    <Divider
                      orientationMargin="0"
                      style={{ margin: "0.5rem" }}
                    />
                  </div>
                );
              })}
            </>
          )}
          {current === "description" && <div>{record?.description}</div>}
          {current === "formToDownload" && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1px",
                flexWrap: "wrap",
              }}
            >
              {record?.customer?.experiences?.map((qualification) => {
                return (
                  <>
                    <Card
                      title={qualification?.experience}
                      key={qualification.id}
                      style={{ width: 300 }}
                    ></Card>
                  </>
                );
              })}
            </div>
          )}
          {current === "bonuses" && (
            <>
              {record?.bonus?.map((dataObj) => {
                return (
                  <div
                    key={dataObj.id}
                    style={{
                      backgroundColor: "#eeeeee55",
                      borderRadius: "0.5rem",
                      padding: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div>
                      {detailFun(
                        "Onshore From",
                        `${
                          dataObj?.onshoreFromWhen
                            ? dataObj?.onshoreFromWhen
                            : "N/A"
                        }`
                      )}
                      {detailFun(
                        "Onshore To",
                        `${
                          dataObj?.onshoreToWhen
                            ? dataObj?.onshoreToWhen
                            : "N/A"
                        }`
                      )}
                      {detailFun(
                        "Onshore Price",
                        `${dataObj?.isOnshoreFlat ? "FLAT" : ""} ${
                          dataObj?.onshorePrice ? dataObj?.onshorePrice : "N/A"
                        } ${dataObj?.isOnshorePercentage ? "%" : ""}`
                      )}
                      {detailFun(
                        "Offshore From",
                        `${
                          dataObj?.offshoreFromWhen
                            ? dataObj?.offshoreFromWhen
                            : "N/A"
                        }`
                      )}
                      {detailFun(
                        "Offshore To",
                        `${
                          dataObj?.offshoreToWhen
                            ? dataObj?.offshoreToWhen
                            : "N/A"
                        }`
                      )}
                      {detailFun(
                        "Offshore Price",
                        `${dataObj?.isOffshoreFlat ? "FLAT" : ""} ${
                          dataObj?.offshorePrice
                            ? dataObj?.offshorePrice
                            : "N/A"
                        } ${dataObj?.isOffshorePercentage ? "%" : ""}`
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </Card>
      </Card>
    </Drawer>
  );
};

export default InstituteDetais;
