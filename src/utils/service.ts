import { ConversationType } from "../types/chat";

const url = "/api/chat";

export const services = {
  createConversation: () => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "create_conversation",
      }),
    }).then((res) => res.json());
  },
  updateConversation: (payload: ConversationType) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "update_conversation",
        payload,
      }),
    }).then((res) => res.json());
  },
  deleteConversation: (id: string) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "delete_conversation",
        payload: { id },
      }),
    }).then((res) => res.json());
  },
  getConversations: () => {
    return fetch(url).then((res) => res.json());
  },
  getFirstAnswer: (option: string, conversation: ConversationType) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: option,
        payload: conversation,
      }),
    }).then((res) => res.json());
  },
  getAboutCompanyAnswer: (categoryId: string) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "about_company_answer",
        payload: categoryId,
      }),
    });
  },
  getConversation: (id: string) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "get_conversation",
        payload: { id },
      }),
    });
  },
};
