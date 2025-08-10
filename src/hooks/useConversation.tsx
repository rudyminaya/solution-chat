import { useContext } from "react";
import { ConversationContext } from "../context/conversationContext";
import { ConversationType } from "../types/chat";

export const useConversation = () => {
    const context = useContext(ConversationContext);
    if (!context) {
        throw new Error(
            "useConversation must be used within a ConversationProvider"
        );
    }
    const firstConversation: ConversationType = {
        id: crypto.randomUUID(),
        title: "Nueva conversación",
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const sortedConversations = [...context.state.conversations].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    return {
        conversations: sortedConversations,
        selectedConversation: context.state.selectedConversation,
        initConversation: () => {
            context.dispatch({
                type: "INIT_CONVERSATION",
                payload: firstConversation,
            });
            context.dispatch({
                type: "SELECT_CONVERSATION",
                payload: firstConversation.id,
            });
        },
        selectConversation: (id: string) =>
            context.dispatch({ type: "SELECT_CONVERSATION", payload: id }),
        removeConversation: (id: string) =>
            context.dispatch({ type: "REMOVE_CONVERSATION", payload: id }),
        updateConversation: (conversation: ConversationType) =>
            context.dispatch({ type: "UPDATE_CONVERSATION", payload: conversation }),
    };
};
