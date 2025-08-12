"use client";
import { useContext } from "react";
import { ConversationType, MessageType } from "../types/chat";
import { services } from "../utils/service";
import { ConversationContext } from "../context/conversationContext";

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversation must be used within a ConversationProvider"
    );
  }
  const { state, dispatch } = context;

  console.log('STATE : ', state)

  const initConversation = async () => {
    const firstConversation = await services.createConversation();
    dispatch({
      type: "SELECT_CONVERSATION",
      payload: firstConversation,
    });
    dispatch({
      type: "ADD_CONVERSATION",
      payload: firstConversation,
    });
  };
  const addMessage = (conversationId: string, message: MessageType) => {
    dispatch({ type: "ADD_MESSAGE", payload: { conversationId, message } });
  };
  const removeConversation = (id: string) => {
    dispatch({
      type: "DELETE_CONVERSATION",
      payload: id,
    });
  };

  const updateConversation = (conversation: ConversationType) => {
    dispatch({
      type: "UPDATE_CONVERSATION",
      payload: conversation,
    });
  };

  const selectConversation = (id: string) => {
    const selectedConversation =
      state.conversations.find((c) => c.id === id) || null;
    dispatch({
      type: "SELECT_CONVERSATION",
      payload: selectedConversation,
    });
  };
  const findConversation = async (keyword: string) => {
    if (keyword.length >= 3) {
      dispatch({
        type: "FIND_CONVERSATIONS",
        payload: keyword,
      });
    }
    if (keyword.length === 0) {
      const initialData = await services.getConversations();
      dispatch({
        type: "SET_CONVERSATIONS",
        payload: initialData,
      });
    }
  };
  return {
    conversations: state.conversations,
    selectedConversation: state.selectedConversation,
    initConversation,
    addMessage,
    findConversation: (keyword: string) => findConversation(keyword),
    setSelectedConversation: (id: string) => selectConversation(id),
    removeConversation: (id: string) => removeConversation(id),
    updateConversation: (conversation: ConversationType) =>
      updateConversation(conversation),
  };
};
