import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  logoutUser,
  fetchCurrentUser,
} from "../redux/thunks/authThunks";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  return {
    user,
    role: user?.role || null,
    isLoading,
    error,
    isAuthenticated: !!user,
    login: (code, password, rememberMe) =>
      dispatch(loginUser(code, password, rememberMe)),
    logout: () => dispatch(logoutUser()),
    getCurrentUser: () => dispatch(fetchCurrentUser()),
  };
};
