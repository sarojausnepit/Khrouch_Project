import { ofType } from "redux-observable";
import { catchError, switchMap, mergeMap, delay } from "rxjs/operators";
import { from, of } from "rxjs";
import { Api } from "../Helpers/BaseUrlProvider";
// import { AllApi, findAsyncToken, ImageApi } from "./AllApi";

// import { navigate } from "../constants/RootNavigation";
// import { errorConsole } from "../functions/HelperFuntion";
// import { CustomAlert } from "../functions/HelperFunction";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export const AllEpic = (action$) =>
  action$.pipe(
    ofType(
      "ADMIN_AUTHENTICATION_REQUEST",
      "FETCH_ACTIVE_INSTITUTES_REQUEST",
      "FETCH_INSTITUTES_REQUEST",
      "TOGGLE_INSTITUTE_STATUS_REQUEST",
      "DELETE_INSTITUTE_REQUEST",
      "FETCH_ALL_CLIENTS_REQUEST",
      "FETCH_INSTITUTE_BY_CLIENT_ID_REQUEST",
      "FETCH_ADMIN_DROPDOWN",
      "UPLOAD_INSTITUTE_DOCUMENT_REQUEST",
      "UPLOAD_INSTITUTE_IMAGE_REQUEST",
      "ADD_INSTITUTE_REQUEST",
      "ADD_LEVEL_OF_COLLEGE_REQUEST",
      "ADD_COUNTRY_REQUEST",
      "UPLOAD_COUNTRY_IMAGE_REQUEST",
      "UPDATE_INSTITUTE_REQUEST",
      "FETCH_COURSES_REQUEST",
      "FETCH_ACTIVE_COURSES_REQUEST",
      "FETCH_SUPPORT_REQUEST",
      "ADD_SUPPORT_CATEGORY_REQUEST",
      "FETCH_ACTIVE_SUPPORT_CATEGORY_REQUEST",
      "UPLOAD_INSTITUTE_DOCUMENT_REQUEST",
      "DELETE_INSTITUTE_DOCUMENT_REQUEST",
      "ADD_COURSE_REQUEST",
      "UPLOAD_COURSE_DOCUMENT_REQUEST",
      "ADD_DEGREE_REQUEST",
      "UPDATE_COURSE_REQUEST",
      "ADD_COURSES_DOCUMENT_CHECKLIST_REQUEST",
      "FETCH_COURSES_DOCUMENTS_REQUEST",
      "UPDATE_COURSES_DOCUMENT_CHECKLIST_REQUEST",
      "TOGGLE_COURSE_STATUS_REQUEST",
      "REPLY_TO_TICKET_REQUEST",
      "CHANGE_SUPPORT_STATUS_REQUEST",
      "FETCH_TICKET_BY_ID_REQUEST",
      "ASSIGN_SUPPORT_TICKET_REQUEST",
      "FETCH_CONSULTANCY_COUNTRY_REQUEST",
      "ADD_CONSULTANCY_COUNTRY_REQUEST",
      "UPLOAD_CONSULTANCY_COUNTRY_IMAGE_REQUEST",
      "CHANGE_CONSULTANCY_COUNTRY_STATUS_REQUEST",
      "FETCH_EDUCATION_WORKFLOW_REQUEST",
      "SET_EDUCATION_WORKFLOW_AS_DEFAULT_REQUEST",
      "DELETE_MIGRATION_WORKFLOW_REQUEST",
      "ADD_EDUCATION_WORKFLOW_REQUEST",
      "UPDATE_MIGRATION_WORKFLOW_REQUEST",
      "FETCH_WORKFLOW_BY_ID_REQUEST",
      "UPDATE_WORKFLOW_STATUS_PRIORITY_REQUEST",
      "DELETE_WORKFLOW_STATUS_REQUEST",
      "CHANGE_STATUS_AS_FIRST_REQUEST",
      "CHANGE_STATUS_AS_FINAL_REQUEST",
      "CHANGE_STATUS_AS_CANCELLED_REQUEST",
      "ADD_WORKFLOW_STATUS_REQUEST",
      "UPDATE_WORKFLOW_STATUS_REQUEST",
      "FETCH_DOCUMENTS_REQUEST",
      "DELETE_DOCUMENT_REQUEST",
      "ADD_DOCUMENTS_REQUEST",
      "UPDATE_DOCUMENT_REQUEST",
      "FETCH_MIGRATION_WORKFLOW_REQUEST",
      "SET_WORKFLOW_AS_DEFAULT_REQUEST",
      "ADD_MIGRATION_WORKFLOW_REQUEST",
      "FETCH_ONSHORE_DOCUMENTS_REQUEST",
      "FETCH_OFFSHORE_DOCUMENTS_REQUEST",
      "FETCH_ACTIVE_ANNOUNCEMENT_REQUEST",
      "FETCH_ANNOUNCEMENT_REQUEST"
    ),
    mergeMap((action) =>
      from(Api(action)).pipe(
        mergeMap((response) => {
          console.log(response, "allepicsss");
          //   if (action.type_data.navigateTo != null) {
          //     navigate(action.type_data.navigateTo, action.type_data.params);
          //   }
          if (action.type_data.successInternalState) {
            action.type_data.successInternalState(response.data);
          }
          return of({
            type: action.type_data.success,
            payload: response.data,
          });
        }),
        catchError((err) => {
          console.warn(err);
          if (action.type_data.failureInternalState) {
            action.type_data.failureInternalState(err?.response?.data);
          }
          return of({ type: action.type_data.failure, payload: err.response });
        })
      )
    )
  );

export const historyEpic = (action$) =>
  action$.pipe(
    ofType("HISTORY_FETCHING_DATA_ATTEMPT"),

    switchMap((action) =>
      from(Api(action)).pipe(
        mergeMap((response) => {
          console.log(response, "allepicsss");
          //   if (action.type_data.navigateTo != null) {
          //     navigate(action.type_data.navigateTo, action.type_data.params);
          //   }
          if (action.type_data.successInternalState) {
            action.type_data.successInternalState(response.data);
          }
          return of({
            type: action.type_data.success,
            payload: response.data,
          });
        }),
        catchError((err) => {
          console.warn(err);
          if (action.type_data.failureInternalState) {
            action.type_data.failureInternalState(err?.response?.data);
          }
          return of({ type: action.type_data.failure, payload: err.response });
        })
      )
    )
  );
