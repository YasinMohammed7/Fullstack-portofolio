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
      keepUnusedDataFor: 60,
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
  }),
});

export const { useGetMessagesQuery } = messagesApiSlice;

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
