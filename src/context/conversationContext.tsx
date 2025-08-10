"use client";
import { ConversationType } from "@/src/types/chat";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { dataConversations } from "../data/data";

type State = {
  conversations: ConversationType[];
  selectedConversation: ConversationType | null;
};
type Action =
  | {
      type: "INIT_CONVERSATION";
      payload: ConversationType;
    }
  | {
      type: "REMOVE_CONVERSATION";
      payload: string; // conversation ID
    }
  | {
      type: "UPDATE_CONVERSATION";
      payload: ConversationType;
    }
  | {
      type: "SELECT_CONVERSATION";
      payload: string; // conversation ID
    };

const initialState: State = {
  conversations: dataConversations,
  selectedConversation: null,
};

const reducer = (state: State, action: Action): State => {
  let newState: State;
  switch (action.type) {
    case "INIT_CONVERSATION":
      newState = {
        ...state,
        conversations: [...state.conversations, action.payload],
      };
      break;
    case "REMOVE_CONVERSATION":
      newState = {
        ...state,
        conversations: state.conversations.filter(
          (c) => c.id !== action.payload
        ),
      };
      break;
    case "UPDATE_CONVERSATION":
      const updated = { ...action.payload };
      const lastMsg = updated.messages[updated.messages.length - 1];
      if (lastMsg && lastMsg.content && lastMsg.content.length > 0) {
        updated.title = lastMsg.content;
      }
      newState = {
        ...state,
        conversations: state.conversations.map((c) =>
          c.id === updated.id ? updated : c
        ),
      };
      break;
    case "SELECT_CONVERSATION":
      newState = {
        ...state,
        selectedConversation: state.conversations.find(
          (c) => c.id === action.payload
        ) || null,
      };
      break;
    default:
      newState = state;
      break;
  }
  typeof window !== "undefined" &&
    localStorage.setItem(
      "conversations",
      JSON.stringify(newState.conversations)
    );
  return newState;
};

type ConversationContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const ConversationContext = createContext<ConversationContextType | undefined>(
  undefined
);

export const ConversationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("conversations");
      if (stored) {
        try {
          const conversations = JSON.parse(stored);
          conversations.forEach((conv: ConversationType) => {
            dispatch({ type: "INIT_CONVERSATION", payload: conv });
          });
        } catch (e) {
          console.error("Failed to parse conversations from localStorage", e);
        }
      }
    }
  }, []);

  return (
    <ConversationContext.Provider value={{ state, dispatch }}>
      {children}
    </ConversationContext.Provider>
  );
};