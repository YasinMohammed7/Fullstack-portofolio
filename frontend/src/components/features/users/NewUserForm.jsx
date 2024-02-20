import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewUserMutation } from "./usersApiSlice";
import { ROLES } from "../../config/roles";
import { FaSave } from "react-icons/fa";

const NewUserForm = () => {
  const USER_REGEX = /^[A-z]{3,20}$/;
  const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
  const navigate = useNavigate();

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  return <div>NewUserForm</div>;
};

export default NewUserForm;
