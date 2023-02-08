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
import {
  formattedDate,
  formattedDateTime,
  twoTagResponses,
} from "../../../Helpers/HelperFunction";
import client from "../../../Assets/client.png";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FcDocument } from "react-icons/fc";
import { GoLocation } from "react-icons/go";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ImCheckboxChecked } from "react-icons/im";
const { Meta } = Card;

const CoursesDetail = ({
  record,
  isCourseDetailsModelVisible,
  setIsCourseDetailsModelVisible,
}) => {
  const visaState = useSelector((state) => state.VisasReducer);

  const dispatch = useDispatch();

  const [current, setCurrent] = useState("courseDetail");
  const clientDetailsTabList = [
    {
      key: "courseDetail",
      tab: "Course Detail",
    },
    {
      key: "document",
      tab: "Document",
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
  console.log("course details record", record);

  return (
    <Drawer
      title="Course Details"
      open={isCourseDetailsModelVisible}
      onClose={() => {
        console.log("click");
        setIsCourseDetailsModelVisible(false);
      }}
      footer={null}
      width={1163}
    >
      <Card style={{ borderRadius: "0.5rem" }} className="drawerStyle">
        <div className="flexRowWithoutStyle" style={{ gap: "1rem" }}>
          <div
            className="flexColumnWithoutStyle"
            style={{
              justifyContent: "flex-start",
              width: "100%",
              gap: "0.5rem",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              {record?.name}
            </div>
            <div
              className="flexRowWithoutStyle"
              style={{ gap: "0.4rem", color: "#aaa" }}
            >
              {record?.courseCode}
            </div>
            <div>{record?.degree?.name}</div>

            <div
              className="flexRowWithoutStyle"
              style={{ gap: "1rem", padding: "1rem" }}
            >
              <span>Time Period: </span>
              <span>
                {record?.courseDuration} {record?.courseAccordingTo}
              </span>
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
          {current === "courseDetail" && (
            <>
              {detailFun("Course", `${record?.name ? record?.name : "N/A"}`)}
              {detailFun(
                "Duration",
                `${
                  record?.courseDuration && record?.courseAccordingTo
                    ? record?.courseDuration + " " + record?.courseAccordingTo
                    : "N/A"
                }`
              )}
              {record?.onshore ? (
                <>
                  {detailFun("Offshore", `${record?.onshore ? "Yes" : "No"}`)}
                  {detailFun(
                    "Onshore Fee",
                    `${record?.onShoreFee ? record?.onShoreFee : "N/A"}`
                  )}
                  {detailFun(
                    "Is Onshore Discount?",

                    twoTagResponses(record?.onshoreIsDiscount, true, false)
                  )}
                  {detailFun(
                    "Onshore Discount",
                    `${
                      record?.onshoreDiscountAmount
                        ? record?.onshoreDiscountAmount
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Onshore Discount Type",
                    `${
                      record?.onshoreDiscountType
                        ? record?.onshoreDiscountType
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Is Onshore Scholarship?",

                    twoTagResponses(record?.onshoreIsScholarship, true, false)
                  )}
                  {detailFun(
                    "Onshore Scholarship",
                    `${
                      record?.onshoreScholarshipAmount
                        ? record?.onshoreScholarshipAmount
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Onshore Scholarship Type",
                    `${
                      record?.onshoreScholarshipType
                        ? record?.onshoreScholarshipType
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Onshore Material Fee",
                    `${
                      record?.onshoreMaterialFee
                        ? record?.onshoreMaterialFee
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Onshore Application Fee",
                    `${
                      record?.onshoreApplicationFee
                        ? record?.onshoreApplicationFee
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Onshore Additional Fee",
                    `${
                      record?.onshoreAdditionalFee
                        ? record?.onshoreAdditionalFee
                        : "N/A"
                    }`
                  )}
                </>
              ) : null}
              {record?.offshore ? (
                <>
                  {detailFun("Offshore", `${record?.offshore ? "Yes" : "No"}`)}
                  {detailFun(
                    "Offshore Fee",
                    `${record?.offShoreFee ? record?.offShoreFee : "N/A"}`
                  )}
                  {detailFun(
                    "Is Offshore Discount?",

                    twoTagResponses(record?.offshoreIsDiscount, true, false)
                  )}
                  {detailFun(
                    "Offshore Discount",
                    `${
                      record?.offshoreDiscountAmount
                        ? record?.offshoreDiscountAmount
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Offshore Discount Type",
                    `${
                      record?.offshoreDiscountType
                        ? record?.offshoreDiscountType
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Is Offshore Scholarship?",

                    twoTagResponses(record?.offshoreIsScholarship, true, false)
                  )}
                  {detailFun(
                    "Offshore Scholarship",
                    `${
                      record?.offshoreScholarshipAmount
                        ? record?.offshoreScholarshipAmount
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Offshore Scholarship Type",
                    `${
                      record?.offshoreScholarshipType
                        ? record?.offshoreScholarshipType
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Offshore Material Fee",
                    `${
                      record?.offshoreMaterialFee
                        ? record?.offshoreMaterialFee
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Offshore Application Fee",
                    `${
                      record?.offshoreApplicationFee
                        ? record?.offshoreApplicationFee
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Offshore Additional Fee",
                    `${
                      record?.offshoreAdditionalFee
                        ? record?.offshoreAdditionalFee
                        : "N/A"
                    }`
                  )}
                </>
              ) : null}
              {record?.both ? (
                <>
                  {detailFun(
                    "Both (Onshore/Offshore)",
                    `${record?.both ? "Yes" : "No"}`
                  )}
                  {detailFun(
                    "Onshore Fee",
                    `${record?.onShoreFee ? record?.onShoreFee : "N/A"}`
                  )}
                  {detailFun(
                    "Is Onshore Discount?",

                    twoTagResponses(record?.onshoreIsDiscount, true, false)
                  )}
                  {detailFun(
                    "Onshore Discount",
                    `${
                      record?.onshoreDiscountAmount
                        ? record?.onshoreDiscountAmount
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Onshore Discount Type",
                    `${
                      record?.onshoreDiscountType
                        ? record?.onshoreDiscountType
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Is Onshore Scholarship?",

                    twoTagResponses(record?.onshoreIsScholarship, true, false)
                  )}
                  {detailFun(
                    "Onshore Scholarship",
                    `${
                      record?.onshoreScholarshipAmount
                        ? record?.onshoreScholarshipAmount
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Onshore Scholarship Type",
                    `${
                      record?.onshoreScholarshipType
                        ? record?.onshoreScholarshipType
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Onshore Material Fee",
                    `${
                      record?.onshoreMaterialFee
                        ? record?.onshoreMaterialFee
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Onshore Application Fee",
                    `${
                      record?.onshoreApplicationFee
                        ? record?.onshoreApplicationFee
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Onshore Additional Fee",
                    `${
                      record?.onshoreAdditionalFee
                        ? record?.onshoreAdditionalFee
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Offshore Fee",
                    `${record?.offShoreFee ? record?.offShoreFee : "N/A"}`
                  )}
                  {detailFun(
                    "Is Offshore Discount?",

                    twoTagResponses(record?.offshoreIsDiscount, true, false)
                  )}
                  {detailFun(
                    "Offshore Discount",
                    `${
                      record?.offshoreDiscountAmount
                        ? record?.offshoreDiscountAmount
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Offshore Discount Type",
                    `${
                      record?.offshoreDiscountType
                        ? record?.offshoreDiscountType
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Is Offshore Scholarship?",

                    twoTagResponses(record?.offshoreIsScholarship, true, false)
                  )}
                  {detailFun(
                    "Offshore Scholarship",
                    `${
                      record?.offshoreScholarshipAmount
                        ? record?.offshoreScholarshipAmount
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Offshore Scholarship Type",
                    `${
                      record?.offshoreScholarshipType
                        ? record?.offshoreScholarshipType
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Offshore Material Fee",
                    `${
                      record?.offshoreMaterialFee
                        ? record?.offshoreMaterialFee
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Offshore Application Fee",
                    `${
                      record?.offshoreApplicationFee
                        ? record?.offshoreApplicationFee
                        : "N/A"
                    }`
                  )}
                  {detailFun(
                    "Offshore Additional Fee",
                    `${
                      record?.offshoreAdditionalFee
                        ? record?.offshoreAdditionalFee
                        : "N/A"
                    }`
                  )}
                </>
              ) : null}
            </>
          )}
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
              <div>
                <h3>Offshore Document Checklist</h3>
                {record?.offShoreCheckList?.map((dataObj) => {
                  return (
                    <div
                      key={dataObj.id}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <ImCheckboxChecked style={{ color: "blue" }} />
                      {dataObj?.item}
                    </div>
                  );
                })}
              </div>
              <Divider orientationMargin="0" style={{ margin: "0.5rem" }} />
              <div>
                <h3>Onshore Document Checklist</h3>
                {record?.onShoreCheckList?.map((dataObj) => {
                  return (
                    <div
                      key={dataObj.id}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <ImCheckboxChecked style={{ color: "blue" }} />
                      {dataObj?.item}
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {current === "description" && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1px",
                flexWrap: "wrap",
              }}
            >
              {record?.description}
            </div>
          )}
        </Card>
      </Card>
    </Drawer>
  );
};

export default CoursesDetail;
