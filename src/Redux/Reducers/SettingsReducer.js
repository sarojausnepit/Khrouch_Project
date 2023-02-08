import { message } from "antd";

const INIT_STATE = {
  isLoading: false,
  countries: {
    data: [],
    pageNumber: "",
    totalData: "",
    totalPage: "",
  },
  migrationWorkflow: {
    data: [],
    pageNumber: "",
    totalData: "",
    totalPage: "",
  },
  documents: {
    data: [],
    pageNumber: "",
    totalData: "",
    totalPage: "",
  },
  educationWorkflow: {
    data: [],
    pageNumber: "",
    totalData: "",
    totalPage: "",
  },
  workflowById: {},
  activeCountries: [],
};

const SettingsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_CONSULTANCY_COUNTRY_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_CONSULTANCY_COUNTRY_REQUEST_SUCCESS": {
      console.log("from reducer", action.payload);
      return {
        ...state,
        countries: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_CONSULTANCY_COUNTRY_REQUEST_FAILURE": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "FETCH_ACTIVE_COUNTRY_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_ACTIVE_COUNTRY_REQUEST_SUCCESS": {
      console.log("from reducer", action.payload);
      return {
        ...state,
        activeCountries: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_ACTIVE_COUNTRY_REQUEST_FAILURE": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "FETCH_MIGRATION_WORKFLOW_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_MIGRATION_WORKFLOW_REQUEST_SUCCESS": {
      console.log("from reducer", action.payload);
      return {
        ...state,
        migrationWorkflow: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_MIGRATION_WORKFLOW_REQUEST_FAILURE": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "FETCH_EDUCATION_WORKFLOW_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_EDUCATION_WORKFLOW_REQUEST_SUCCESS": {
      console.log("from reducer", action.payload);
      return {
        ...state,
        educationWorkflow: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_EDUCATION_WORKFLOW_REQUEST_FAILURE": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_COUNTRY_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "ADD_COUNTRY_REQUEST_SUCCESS": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_COUNTRY_REQUEST_FAILURE": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_MIGRATION_WORKFLOW_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "ADD_MIGRATION_WORKFLOW_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Workflow added.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_MIGRATION_WORKFLOW_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to add workflow.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_WORKFLOW_STATUS_PRIORITY_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "UPDATE_WORKFLOW_STATUS_PRIORITY_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Workflow status priority updated.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_WORKFLOW_STATUS_PRIORITY_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to update workflow status priority.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_MIGRATION_WORKFLOW_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "DELETE_MIGRATION_WORKFLOW_REQUEST_SUCCESS": {
      action.payload2.message
        ? message.success(action.payload2.message)
        : message.success("Success! Workflow deleted.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_MIGRATION_WORKFLOW_REQUEST_FAILURE": {
      action.payload2.message
        ? message.error(action.payload2.message)
        : message.error("Error! Unable to delete workflow.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "SET_WORKFLOW_AS_DEFAULT_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "SET_WORKFLOW_AS_DEFAULT_REQUEST_SUCCESS": {
      action.payload2.message
        ? message.success(action.payload2.message)
        : message.success("Success!  Set as default.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "SET_WORKFLOW_AS_DEFAULT_REQUEST_FAILURE": {
      action.payload2.message
        ? message.error(action.payload2.message)
        : message.error("Error! Unable to set as default");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "SET_EDUCATION_WORKFLOW_AS_DEFAULT_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "SET_EDUCATION_WORKFLOW_AS_DEFAULT_REQUEST_SUCCESS": {
      action.payload2.message
        ? message.success(action.payload2.message)
        : message.success("Success!  Set as default.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "SET_EDUCATION_WORKFLOW_AS_DEFAULT_REQUEST_FAILURE": {
      action.payload2.message
        ? message.error(action.payload2.message)
        : message.error("Error! Unable to set as default");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_CLIENT_PHOTO_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "ADD_CLIENT_PHOTO_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Photo uploaded.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_CLIENT_PHOTO_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to upload photo.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "FETCH_DOCUMENTS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "FETCH_DOCUMENTS_REQUEST_SUCCESS": {
      return {
        ...state,
        documents: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_DOCUMENTS_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to load documents.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "FETCH_WORKFLOW_BY_ID_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "FETCH_WORKFLOW_BY_ID_REQUEST_SUCCESS": {
      return {
        ...state,
        workflowById: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_WORKFLOW_BY_ID_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to load workflow statuses.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_WORKFLOW_STATUS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "ADD_WORKFLOW_STATUS_REQUEST_SUCCESS": {
      action.payload?.message
        ? message.success(action.payload?.message)
        : message.success("Success! Workflow status added.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_WORKFLOW_STATUS_REQUEST_FAILURE": {
      action.payload?.message
        ? message.error(action.payload?.message)
        : message.error("Error! Unable to add workflow status.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_WORKFLOW_STATUS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "UPDATE_WORKFLOW_STATUS_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Workflow status updated.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_WORKFLOW_STATUS_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to update workflow status.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_COUNTRY_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "UPDATE_COUNTRY_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Settings updated.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_COUNTRY_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to update Settings.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_WORKFLOW_STATUS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "DELETE_WORKFLOW_STATUS_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Status deleted.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_WORKFLOW_STATUS_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to delete status.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "CHANGE_STATUS_AS_FIRST_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "CHANGE_STATUS_AS_FIRST_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Sted.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "CHANGE_STATUS_AS_FIRST_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to set state as first.");

      return {
        ...state,
        isLoading: false,
      };
    }

    case "CHANGE_STATUS_AS_FINAL_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "CHANGE_STATUS_AS_FINAL_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Status updated.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "CHANGE_STATUS_AS_FINAL_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to set state as final.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "CHANGE_STATUS_AS_CANCELLED_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "CHANGE_STATUS_AS_CANCELLED_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Status updated.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "CHANGE_STATUS_AS_CANCELLED_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to set state as cancelled.");

      return {
        ...state,
        isLoading: false,
      };
    }

    case "DELETE_COUNTRY_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "DELETE_COUNTRY_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Settings deleted.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_COUNTRY_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to delete Settings.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_DOCUMENTS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "ADD_DOCUMENTS_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Document added.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_DOCUMENTS_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to add document.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_DOCUMENT_REQUEST_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "UPDATE_DOCUMENT_REQUEST_REQUEST_SUCCESS": {
      action.payload2.message
        ? message.success(action.payload2.message)
        : message.success("Success! Document updated.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_DOCUMENT_REQUEST_REQUEST_FAILURE": {
      action.payload2.message
        ? message.error(action.payload2.message)
        : message.error("Error! Unable to update document.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_DOCUMENT_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "DELETE_DOCUMENT_REQUEST_SUCCESS": {
      action.payload2.message
        ? message.success(action.payload2.message)
        : message.success("Success! Document deleted.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_DOCUMENT_REQUEST_FAILURE": {
      action.payload2.message
        ? message.error(action.payload2.message)
        : message.error("Error! Unable to delete document.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "CHANGE_CONSULTANCY_COUNTRY_STATUS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "CHANGE_CONSULTANCY_COUNTRY_STATUS_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Country status changed.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "CHANGE_CONSULTANCY_COUNTRY_STATUS_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to change country status.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_MIGRATION_WORKFLOW_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "UPDATE_MIGRATION_WORKFLOW_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Wokflow updated.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_MIGRATION_WORKFLOW_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to update workflow.");

      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default SettingsReducer;
