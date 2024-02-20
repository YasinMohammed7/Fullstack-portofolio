import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { selectMessageById } from "./messagesApiSlice";

const Message = ({ messageId }) => {
  const message = useSelector((state) => selectMessageById(state, messageId));

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

    const handleEdit = () => navigate(`messages/${messageId}`);

    return (
      <tr className="table__row">
        <td className="table__cell message__username">
          {message.user.username}
        </td>
        <td className="table__cell message__created">{created}</td>
        <td className="table__cell message__updated">{updated}</td>
        <td className="table__cell message__title">{message.content}</td>
        <td className="table__cell">
          <button className="button" onClick={handleEdit}>
            <MdEdit />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

export default Message;
