import { selectAllUsers } from "../users/usersApiSlice";
import { useSelector } from "react-redux";
import NewMessageForm from "./NewMessageForm";

const NewMessage = () => {
  const users = useSelector(selectAllUsers);

  if (!users?.length) return <p>Not currently available</p>;

  const content = <NewMessageForm users={users} />;
  return content;
};

export default NewMessage;
