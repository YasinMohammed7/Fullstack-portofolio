import { useGetMessagesQuery } from "./messagesApiSlice";
import Message from "./Message";

const MessagesList = () => {
  const {
    data: messages,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMessagesQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;
  if (isError) content = <p className="errorMsg">{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids } = messages;

    const tableContent = ids?.length
      ? ids.map((messageId) => (
          <Message key={messageId} messageId={messageId} />
        ))
      : null;

    content = (
      <table className="table table--messages">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th message__username">
              Owner
            </th>
            <th scope="col" className="table__th message__created">
              Created
            </th>
            <th scope="col" className="table__th message__updated">
              Updated
            </th>
            <th scope="col" className="table__th message">
              Message
            </th>
            <th scope="col" className="table__th message__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default MessagesList;
