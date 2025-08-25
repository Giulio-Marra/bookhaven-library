import {
  SET_USER,
  REMOVE_USER,
  SET_ERROR,
  SET_LOADING,
} from "../actions/authActions";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        error: null,
        isLoading: false,
      };

    case REMOVE_USER:
      return {
        ...state,
        user: null,
        error: null,
        isLoading: false,
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
