import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewMessageMutation } from "./messagesApiSlice";
import { selectAllUsers } from "../users/usersApiSlice";

const NewMessageForm = () => {
  const users = useSelector(selectAllUsers);

  const [addNewMessage, { isLoading, isSuccess, isError, error }] =
    useAddNewMessageMutation();

  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(users[0].id);

  useEffect(() => {
    if (isSuccess) {
      setContent("");
      setUserId("");
      navigate("/messages");
    }
  }, [isSuccess, navigate]);

  const onContentChanged = (e) => setContent(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [content, userId].every(Boolean) && !isLoading;
  const onSaveMessageClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewMessage({ content, userId });
    }
  };

  return <div>NewMessageForm</div>;
};

export default NewMessageForm;
