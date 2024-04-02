import { useGetUsersQuery } from "./usersApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";

const User = ({ userId }) => {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });
  const navigate = useNavigate();

  if (user) {
    const created = new Date(user.message?.createdAt).toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const updated = new Date(user.message?.updatedAt).toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const handleUserEdit = () => navigate(`${userId}`);
    const userRolesString = user.roles.toString().replaceAll(",", ", ");

    const content = (
      <tr className="table__row user">
        <td className={`table__cell`}>{user.username}</td>
        <td className={`table__cell`}>{userRolesString}</td>
        <td className={`table__cell`}>
          <button className="button" onClick={handleUserEdit}>
            <MdEdit />
          </button>
        </td>
        <td className={`table__cell`}>{user.message?.content}</td>
        <td className={`table__cell`}>
          <Link to={`/messages/${user.message?.id}`} className="button">
            <MdEdit />
          </Link>
        </td>
        <td className={`table__cell`}>{created}</td>
        <td className={`table__cell`}>{updated}</td>
      </tr>
    );

    return content;
  } else return null;
};

export default User;
