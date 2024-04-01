import { useState, useEffect } from "react";
import { useAddNewMessageMutation } from "./messagesApiSlice";

const NewMessageForm = ({ username }) => {
  const [addNewMessage, { isLoading, isSuccess, isError, error }] =
    useAddNewMessageMutation();

  const [content, setContent] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setContent("");
    }
  }, [isSuccess]);

  const onContentChanged = (e) => setContent(e.target.value);

  const canSave = [content].every(Boolean) && !isLoading;

  const onSaveMessageClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewMessage({ content, username });
    }
  };

  return (
    <form onSubmit={onSaveMessageClicked}>
      {isError && <p className="errmsg">{error?.data?.message}</p>}
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
      <button className="button" disabled={!canSave}>
        {isLoading ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default NewMessageForm;
