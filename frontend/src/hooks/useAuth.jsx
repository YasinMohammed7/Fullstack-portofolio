import { useSelector } from "react-redux";
import { selectCurrentToken } from "../components/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let isUser = false;
  let status = "";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;

    isAdmin = roles.includes("Admin");
    if (isAdmin) status = "Admin";
    isUser = roles.includes("User");
    if (isUser) status = "User";

    return { username, roles, status, isAdmin };
  }

  return { username: "", roles: [], isAdmin, status };
};

export default useAuth;
