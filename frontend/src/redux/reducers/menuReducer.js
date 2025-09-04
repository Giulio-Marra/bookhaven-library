import { SET_MENU } from "../actions/menuActions";

const initialState = {
  menu: "Libri",
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MENU:
      return {
        ...state,
        menu: action.payload,
      };
    default:
      return state;
  }
};

export default menuReducer;
