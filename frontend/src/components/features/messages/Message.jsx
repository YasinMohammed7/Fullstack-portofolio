import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { useGetMessagesQuery } from "./messagesApiSlice";
import useAuth from "../../../hooks/useAuth";

const Message = ({ messageId }) => {
  const { message } = useGetMessagesQuery("messagesList", {
    selectFromResult: ({ data }) => ({
      message: data?.entities[messageId],
    }),
  });

  const { username } = useAuth();

  const navigate = useNavigate();

  if (message) {
    const created = new Date(message.createdAt).toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const updated = new Date(message.updatedAt).toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const isOwner = username === message.user.username;

    const handleMessageEdit = () => navigate(`${messageId}`);

    return (
      <tr className="table__row">
        <td className="table__cell message__username">
          {message.user.username}
        </td>
        <td className="table__cell message__created">{created}</td>
        <td className="table__cell message__updated">{updated}</td>
        <td className="table__cell message__title">{message.content}</td>
        <td className="table__cell">
          {isOwner && (
            <button className="button" onClick={handleMessageEdit}>
              <MdEdit />
            </button>
          )}
        </td>
      </tr>
    );
  } else return null;
};

export default Message;
