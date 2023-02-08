import { message } from "antd";

const INIT_STATE = {
  isLoading: false,
  onshoreDocuments: {
    data: [],
    pageNumber: 0,
    totalData: 0,
    totalPage: 0,
  },
  offshoreDocuments: {
    data: [],
    pageNumber: 0,
    totalData: 0,
    totalPage: 0,
  },
};

const DocumentManagementReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_ONSHORE_DOCUMENTS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_ONSHORE_DOCUMENTS_REQUEST_SUCCESS": {
      console.log("from reducer", action.payload);
      return {
        ...state,
        onshoreDocuments: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_ONSHORE_DOCUMENTS_REQUEST_FAILURE": {
      action.payload?.response?.data?.message
        ? message.error(action.payload?.response?.data?.message)
        : message.error("Error! Unable to load onshore documents.");
      return {
        ...state,
        isLoading: false,
      };
    }

    case "FETCH_OFFSHORE_DOCUMENTS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_OFFSHORE_DOCUMENTS_REQUEST_SUCCESS": {
      console.log("from reducer", action.payload);
      return {
        ...state,
        offshoreDocuments: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_OFFSHORE_DOCUMENTS_REQUEST_FAILURE": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_ONSHORE_DOCUMENTS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "ADD_ONSHORE_DOCUMENTS_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! DocumentManagement added.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_ONSHORE_DOCUMENTS_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to add DocumentManagement.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_ONSHORE_DOCUMENTS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "UPDATE_ONSHORE_DOCUMENTS_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! DocumentManagement updated.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_ONSHORE_DOCUMENTS_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to update DocumentManagement.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_ONSHORE_DOCUMENTS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "DELETE_ONSHORE_DOCUMENTS_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! DocumentManagement deleted.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_ONSHORE_DOCUMENTS_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to delete DocumentManagement.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "TOGGLE_ONSHORE_DOCUMENTS_STATUS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "TOGGLE_ONSHORE_DOCUMENTS_STATUS_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! DocumentManagement status changed.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "TOGGLE_ONSHORE_DOCUMENTS_STATUS_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to change DocumentManagement status.");

      message.error("error");
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default DocumentManagementReducer;
