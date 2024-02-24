import { store } from "../../../app/store";
import { usersApiSlice } from "../users/usersApiSlice";
import { messagesApiSlice } from "../messages/messagesApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const messages = store.dispatch(
      messagesApiSlice.endpoints.getMessages.initiate()
    );
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log("unsubscribing");
      messages.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;
