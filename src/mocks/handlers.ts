import { chatMockData } from "@/src/data/chatResponses";
import { http, HttpResponse } from "msw";
import { ConversationType, Sender } from "../types/chat";

export const handlers = [
  http.get("/api/chat", async () => {
    const conversations = JSON.parse(
      localStorage.getItem("conversations") || "[]"
    ) as ConversationType[];
    const sortedConversations = conversations.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    return HttpResponse.json(sortedConversations);
  }),
  http.post("/api/chat", async ({ request }) => {
    const { action, payload } = (await request.json()) as {
      action: string;
      payload: any;
    };

    let conversations: ConversationType[] = [];
    switch (action) {
      case "create_conversation": {
        const newConversation: ConversationType = {
          id: crypto.randomUUID(),
          title: payload?.title || "Nueva conversación",
          messages: [
            {
              ...chatMockData.initialOptions,
              id: crypto.randomUUID(),
            },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const storedConversations = JSON.parse(
          localStorage.getItem("conversations") || "[]"
        ) as ConversationType[];
        conversations = [...storedConversations, newConversation];
        localStorage.setItem("conversations", JSON.stringify(conversations));
        return HttpResponse.json(newConversation, { status: 201 });
      }

      case "update_conversation": {
        const data: ConversationType = payload;
        const storedConversations = JSON.parse(
          localStorage.getItem("conversations") || "[]"
        ) as ConversationType[];
        const idx = storedConversations.findIndex((c) => c.id === data.id);
        if (idx !== -1) {
          const updatedMessages =
            data.messages ?? storedConversations[idx].messages;
          const updatedConversation: ConversationType = {
            ...storedConversations[idx],
            ...data,
            messages: updatedMessages,
            updatedAt: new Date(),
          };
          const lastMsg = updatedMessages.at(-1);
          if (
            lastMsg &&
            lastMsg.sender === Sender.User &&
            lastMsg.content &&
            lastMsg.content.length > 0
          ) {
            updatedConversation.title = lastMsg.content;
          }
          storedConversations[idx] = updatedConversation;
          localStorage.setItem(
            "conversations",
            JSON.stringify(storedConversations)
          );
          return HttpResponse.json(updatedConversation, { status: 200 });
        }
        return HttpResponse.json(
          { message: "Conversación no encontrada" },
          { status: 404 }
        );
      }

      case "delete_conversation": {
        const storedConversations = JSON.parse(
          localStorage.getItem("conversations") || "[]"
        ) as ConversationType[];
        conversations = storedConversations.filter((c) => c.id !== payload.id);
        localStorage.setItem("conversations", JSON.stringify(conversations));
        return HttpResponse.json({ success: true }, { status: 200 });
      }
      case "about_company": {
        const storedConversations = JSON.parse(
          localStorage.getItem("conversations") || "[]"
        ) as ConversationType[];
        conversations = storedConversations;
        const aboutCompanyMessage = {
          ...chatMockData.aboutCompany,
          id: crypto.randomUUID(),
        };

        const currentConversation = conversations.find(
          (c) => c.id === payload.id
        );

        if (currentConversation) {
          const aboutCompanyLabel =
            chatMockData?.initialOptions?.options?.find(
              (opt: { id: string }) => opt.id === "about_company"
            )?.label || "Conocer la empresa";
          currentConversation.title = aboutCompanyLabel;
          const userMessage = {
            id: crypto.randomUUID(),
            content: aboutCompanyLabel,
            attachments: [],
            sender: Sender.User,
            timestamp: Date.now(),
          };
          currentConversation.messages.push(userMessage);
          currentConversation.messages.push(aboutCompanyMessage);

          localStorage.setItem("conversations", JSON.stringify(conversations));
          return HttpResponse.json(aboutCompanyMessage, { status: 200 });
        }
        return HttpResponse.json(
          { message: "Conversación no encontrada" },
          { status: 404 }
        );
      }
      case "free_query": {
        const storedConversations = JSON.parse(
          localStorage.getItem("conversations") || "[]"
        ) as ConversationType[];
        conversations = storedConversations;
        const freeQueryLabel =
          chatMockData?.initialOptions?.options?.find(
            (opt: { id: string }) => opt.id === "free_query"
          )?.label || "Hacer otra consulta";
        const currentConversation = conversations.find(
          (c) => c.id === payload.id
        );
        if (currentConversation) {
          currentConversation.title = freeQueryLabel;
          const userMessage = {
            id: crypto.randomUUID(),
            content: freeQueryLabel,
            attachments: [],
            sender: Sender.User,
            timestamp: Date.now(),
          };
          currentConversation.messages.push(userMessage);
          const freeQueryMessage = {
            ...chatMockData.freeQueryExample,
            id: crypto.randomUUID(),
          };
          currentConversation.messages.push(freeQueryMessage);
          localStorage.setItem("conversations", JSON.stringify(conversations));
          return HttpResponse.json(freeQueryMessage, { status: 200 });
        }
        return HttpResponse.json(
          { message: "Conversación no encontrada" },
          { status: 404 }
        );
      }
      case "history":
      case "services":
      case "team":
      case "contact": {
        const storedConversations = JSON.parse(
          localStorage.getItem("conversations") || "[]"
        ) as ConversationType[];
        conversations = storedConversations;
        const contactLabel =
          chatMockData?.aboutCompany?.options?.find(
            (opt: { id: string }) => opt.id === "contact"
          )?.label || "Contacto";
        const currentConversation = conversations.find(
          (c) => c.id === payload.id
        );
        if (currentConversation) {
          currentConversation.title = contactLabel;
          const userMessage = {
            id: crypto.randomUUID(),
            content: contactLabel,
            attachments: [],
            sender: Sender.User,
            timestamp: Date.now(),
          };
          currentConversation.messages.push(userMessage);
          const contactMessage = {
            ...chatMockData.aboutCompanyAnswers[
              action as keyof typeof chatMockData.aboutCompanyAnswers
            ],
            id: crypto.randomUUID(),
          };
          currentConversation.messages.push(contactMessage);
          localStorage.setItem("conversations", JSON.stringify(conversations));
          return HttpResponse.json(contactMessage, { status: 200 });
        }
        return HttpResponse.json(
          { message: "Conversación no encontrada" },
          { status: 404 }
        );
      }
      case "get_conversation": {
        const currentConversation = conversations.find(
          (c) => c.id === payload.id
        );
        if (currentConversation) {
          return HttpResponse.json(currentConversation, { status: 200 });
        }
      }
    }
  }),
];
