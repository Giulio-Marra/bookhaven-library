// src/redux/thunks/authThunks.js
import {
  login,
  getCurrentUser,
  logout as logoutService,
} from "../../services/authService";
import {
  setUser,
  removeUser,
  setLoading,
  setError,
} from "../actions/authActions";

export const loginUser = (code, password, rememberMe) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const token = await login(code, password, rememberMe);
    const user = await getCurrentUser();

    dispatch(setUser(user));
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchCurrentUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const user = await getCurrentUser();
    if (user) dispatch(setUser(user));
  } catch (err) {
    dispatch(removeUser());
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => (dispatch) => {
  logoutService();
  dispatch(removeUser());
};
