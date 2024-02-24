import { apiSlice } from "../../../app/api/apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const messagesAdapter = createEntityAdapter({});

const initialState = messagesAdapter.getInitialState();

export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => "/messages",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedMessages = responseData.map((message) => {
          message.id = message.id;
          return message;
        });
        return messagesAdapter.setAll(initialState, loadedMessages);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Message", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Message", id })),
          ];
        } else return [{ type: "Message", id: "LIST" }];
      },
    }),
    addNewMessage: builder.mutation({
      query: (initialMessageData) => ({
        url: "/messages",
        method: "POST",
        body: {
          ...initialMessageData,
        },
      }),
      invalidatesTags: [{ type: "Message", id: "LIST" }],
    }),
    updateMessage: builder.mutation({
      query: (initialMessageData) => ({
        url: "/messages",
        method: "PATCH",
        body: {
          ...initialMessageData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Message", id: arg.id },
      ],
    }),
    deleteMessage: builder.mutation({
      query: ({ id }) => ({
        url: "/messages",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Message", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddNewMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messagesApiSlice;

export const selectMessagesResult =
  messagesApiSlice.endpoints.getMessages.select();

const selectMessagesData = createSelector(
  selectMessagesResult,
  (messagesResult) => messagesResult.data
);

export const {
  selectAll: selectAllMessages,
  selectById: selectMessageById,
  selectIds: selectMessageIds,
  // Pass in a selector that returns the messages slice of state
} = messagesAdapter.getSelectors(
  (state) => selectMessagesData(state) ?? initialState
);
