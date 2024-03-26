import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import useAuth from "../../../hooks/useAuth";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgchange: true,
  });

  const { isAdmin, username } = useAuth();

  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (isError) content = <p className="errMsg">{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids, entities } = users;

    let filteredIds;
    if (isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (userId) => entities[userId].username === username
      );
    }

    const tableContent =
      ids?.length &&
      filteredIds.map((userId) => <User key={userId} userId={userId} />);

    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Username
            </th>
            <th scope="col" className="table__th user__roles">
              Roles
            </th>
            <th scope="col" className="table__th user__edit">
              Edit user
            </th>
            <th scope="col" className="table__th message">
              Message
            </th>
            <th scope="col" className="table__th message__edit">
              Edit message
            </th>
            <th scope="col" className="table__th message__created">
              Message created
            </th>
            <th scope="col" className="table__th message__updated">
              Message updated
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default UsersList;
