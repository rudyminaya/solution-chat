"use client";
import { ConversationType, MessageType } from "@/src/types/chat";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import { services } from "../utils/service";

type State = {
  conversations: ConversationType[];
  selectedConversation: ConversationType | null;
};
type Action =
  | {
      type: "SELECT_CONVERSATION";
      payload: ConversationType | null; // conversation ID or null to deselect
    }
  | {
      type: "FIND_CONVERSATIONS";
      payload: string; // search keyword
    }
  | {
      type: "SET_CONVERSATIONS";
      payload: ConversationType[];
    }
  | {
      type: "DELETE_CONVERSATION";
      payload: string;
    }
  | {
      type: "UPDATE_CONVERSATION";
      payload: ConversationType;
    }
  | {
      type: "ADD_CONVERSATION";
      payload: ConversationType;
    }
    | {
        type: "ADD_MESSAGE";
        payload: { conversationId: string; message: MessageType };
    }

const initialState: State = {
  conversations: [],
  selectedConversation: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SELECT_CONVERSATION": {
      if (
        state.selectedConversation &&
        action.payload &&
        state.selectedConversation.id === action.payload.id
      ) {
        return { ...state, selectedConversation: { ...action.payload } };
      }
      return { ...state, selectedConversation: action.payload };
    }
    case "FIND_CONVERSATIONS": {
      const keyword = action.payload.toLowerCase();
      const filteredConversations = state.conversations.filter((c) =>
        c.title.toLowerCase().includes(keyword)
      );
      return { ...state, conversations: filteredConversations };
    }
    case "ADD_CONVERSATION": {
      return {
        ...state,
        conversations: [...state.conversations, action.payload],
      };
    }
    case "DELETE_CONVERSATION": {
      services.deleteConversation(action.payload);
      const filteredConversations = state.conversations.filter(
        (c) => c.id !== action.payload
      );
      if (state.selectedConversation?.id === action.payload) {
        return {
          ...state,
          conversations: filteredConversations,
          selectedConversation: null,
        };
      }
      return { ...state, conversations: filteredConversations };
    }
    case "ADD_MESSAGE": {
        const { conversationId, message } = action.payload;
        const conversation = state.conversations.find((c) => c.id === conversationId);
        if (conversation) {
          return {
            ...state,
            conversations: state.conversations.map((c) =>
              c.id === conversationId
                ? {
                    ...c,
                    messages: [...c.messages, message],
                    title: message.sender === "user" ? message.content : c.title,
                  }
                : c
            ),
          };
        }
        return state;
    }
    case "UPDATE_CONVERSATION": {
      const conversationUpdated = state.conversations.find((c)=>c.id === action.payload.id);
      if(conversationUpdated) services.updateConversation(action.payload);
      return { ...state, conversations: state.conversations.map((c) => c.id === action.payload.id ? action.payload : c) };
    }
    case "SET_CONVERSATIONS": {
      return { ...state, conversations: action.payload };
    }
    default:
      return state;
  }
};

type ConversationContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const ConversationContext = createContext<
  ConversationContextType | undefined
>(undefined);

export const ConversationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getConversations = async () => {
    const conversationList = await services.getConversations();
    dispatch({
      type: "SET_CONVERSATIONS",
      payload: conversationList,
    });
  };
  useEffect(() => {
    getConversations();
  }, []);
  useEffect(()=>{
    if(state.selectedConversation && state.selectedConversation.id){
        const selected = state.conversations.find(c => c.id === state.selectedConversation!.id);
        if(selected) {
          dispatch({ type: "SELECT_CONVERSATION", payload: selected });
        }
    }
  },[state.conversations])

  return (
    <ConversationContext.Provider value={{ state, dispatch }}>
      {children}
    </ConversationContext.Provider>
  );
};
