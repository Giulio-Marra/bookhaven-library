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
    if (!token) throw new Error("Login fallito: nessun token ricevuto");

    const user = await getCurrentUser(token);
    dispatch(setUser(user));

    return true;
  } catch (err) {
    dispatch(setError(err.message));
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchCurrentUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    const user = await getCurrentUser(token);
    if (user) dispatch(setUser(user));
  } catch (err) {
    dispatch(setError(err.message));
    dispatch(removeUser());
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => (dispatch) => {
  logoutService();
  dispatch(removeUser());
};
