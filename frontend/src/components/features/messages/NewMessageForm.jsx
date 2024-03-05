import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewMessageMutation } from "./messagesApiSlice";
import useAuth from "../../../hooks/useAuth";

const NewMessageForm = ({ users }) => {
  const { username } = useAuth();
  const [addNewMessage, { isLoading, isSuccess, isError, error }] =
    useAddNewMessageMutation();

  const navigate = useNavigate();

  const [content, setContent] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setContent("");
      navigate("/messages");
    }
  }, [isSuccess, navigate]);

  const onContentChanged = (e) => setContent(e.target.value);

  const canSave = [content].every(Boolean) && !isLoading;

  const onSaveMessageClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewMessage({ content, username });
    }
  };

  return (
    <>
      {isError && <p className="errmsg">{error?.data?.message}</p>}
      <form onSubmit={onSaveMessageClicked}>
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
          {isLoading ? "Saving" : "Save"}
        </button>
      </form>
    </>
  );
};

export default NewMessageForm;
