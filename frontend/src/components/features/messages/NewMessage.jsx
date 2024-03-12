import useAuth from "../../../hooks/useAuth";
import NewMessageForm from "./NewMessageForm";

const NewMessage = () => {
  const { username } = useAuth();

  if (!username) return <p>You must be logged in</p>;

  const content = <NewMessageForm username={username} />;
  return content;
};

export default NewMessage;
