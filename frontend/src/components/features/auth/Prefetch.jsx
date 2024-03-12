import { store } from "../../../app/store";
import { usersApiSlice } from "../users/usersApiSlice";
import { messagesApiSlice } from "../messages/messagesApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
    store.dispatch(
      messagesApiSlice.util.prefetch("getMessages", "messagesList", {
        force: true,
      })
    );
  }, []);

  return <Outlet />;
};

export default Prefetch;
