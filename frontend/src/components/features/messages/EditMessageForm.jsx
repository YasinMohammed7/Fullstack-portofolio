import { useNavigate } from "react-router-dom";
import {
  useDeleteMessageMutation,
  useUpdateMessageMutation,
} from "./messagesApiSlice";
import { useEffect, useState } from "react";

const EditMessageForm = ({ message }) => {
  const [updateMessage, { isLoading, isSuccess, isError, error }] =
    useUpdateMessageMutation();

  const [
    deleteMessage,
    { isSuccess: isDelsuccess, isError: isDelError, error: delerror },
  ] = useDeleteMessageMutation();

  const [content, setContent] = useState(message.content);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess || isDelsuccess) {
      setContent("");
      navigate("/messages");
    }
  }, [isSuccess, isDelsuccess, navigate]);

  const onContentChanged = (e) => setContent(e.target.value);

  const onSaveMessageClicked = async () => {
    await updateMessage({ id: message.id, content });
  };

  const onDeleteMessageClicked = async () => {
    await deleteMessage({ id: message.id });
  };

  let canSave = [content].every(Boolean) && !isLoading;

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {(isError || isDelError) && <p className="errorMsg">{errContent}</p>}
      <label htmlFor="content">Send a message: </label>
      <textarea
        value={content}
        onChange={onContentChanged}
        placeholder="Enter your message..."
        name="content"
        id="content"
        cols="10"
        rows="10"
      ></textarea>
      <button
        className="button"
        onClick={onSaveMessageClicked}
        title="Save"
        disabled={!canSave}
      >
        Save changes
      </button>
      <button
        className="button"
        onClick={onDeleteMessageClicked}
        title="Delete"
      >
        Delete message
      </button>
    </form>
  );
};

export default EditMessageForm;
