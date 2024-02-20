import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`users/${userId}`);
    const userRolesString = user.roles.toString().replaceAll(",", ", ");
    const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <tr className="table__row user">
        <td className={`table__cell ${cellStatus}`}>{user.username}</td>
        <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button className="button" onClick={handleEdit}>
            <MdEdit />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

export default User;
