import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectMessageById } from "./messagesApiSlice";
import EditMessageForm from "./EditMessageForm";

const EditMessage = () => {
  const { id } = useParams();
  const message = useSelector((state) => selectMessageById(state, id));

  const content = message ? (
    <EditMessageForm message={message} />
  ) : (
    <p>Loading...</p>
  );
  return content;
};

export default EditMessage;
