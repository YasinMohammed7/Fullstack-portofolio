import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectMessageById, useGetMessagesQuery } from "./messagesApiSlice";
import EditMessageForm from "./EditMessageForm";

const EditMessage = () => {
  const { id } = useParams();

  const { message } = useGetMessagesQuery("messagesList", {
    selectFromResult: ({ data }) => ({
      message: data?.entities[id],
    }),
  });
  if (!message) return <p>Loading...</p>;

  const content = <EditMessageForm message={message} />;
  return content;
};

export default EditMessage;
