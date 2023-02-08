import { message } from "antd";

const INIT_STATE = {
  isLoading: false,
};

const AnnouncementReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_ANNOUNCEMENT_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_ANNOUNCEMENT_REQUEST_SUCCESS": {
      console.log("from reducer", action.payload);
      return {
        ...state,
        institutes: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_ANNOUNCEMENT_REQUEST_FAILURE": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "FETCH_ACTIVE_ANNOUNCEMENT_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_ACTIVE_ANNOUNCEMENT_REQUEST_SUCCESS": {
      console.log("from reducer", action.payload);
      return {
        ...state,
        institutes: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_ACTIVE_ANNOUNCEMENT_REQUEST_FAILURE": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_ANNOUNCEMENT_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "ADD_ANNOUNCEMENT_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Announcement added.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_ANNOUNCEMENT_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to add Announcement.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_ANNOUNCEMENT_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "UPDATE_ANNOUNCEMENT_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Announcement updated.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_ANNOUNCEMENT_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to update Announcement.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_ANNOUNCEMENT_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "DELETE_ANNOUNCEMENT_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Announcement deleted.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_ANNOUNCEMENT_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to delete Announcement.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "TOGGLE_ANNOUNCEMENT_STATUS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "TOGGLE_ANNOUNCEMENT_STATUS_REQUEST_SUCCESS": {
      action.payload.message
        ? message.success(action.payload.message)
        : message.success("Success! Announcement status changed.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "TOGGLE_ANNOUNCEMENT_STATUS_REQUEST_FAILURE": {
      action.payload.message
        ? message.error(action.payload.message)
        : message.error("Error! Unable to change Announcement status.");

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

export default AnnouncementReducer;
