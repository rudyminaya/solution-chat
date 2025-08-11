import { ConversationType, Sender } from "@/src/types/chat";
import React, { Fragment, useContext } from "react";
import EmptyResult from "../../EmptyResult";
import { Bot, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConversation } from "@/src/hooks/useConversation";
import { formatTimeSince } from "@/src/utils/functions";
import { services } from "@/src/utils/service";

const Content = () => {
  const {
    initConversation,
    selectedConversation,
    setSelectedConversation,
    addMessage,
  } = useConversation();
  const selectFirstOption = async (option: string, label: string) => {
    if (selectedConversation) {
      const newMessage = await services.getFirstAnswer(
        option,
        selectedConversation
      );
      if (newMessage) {
        try {
          const updatedConversation = {
            ...selectedConversation,
            messages: [...selectedConversation.messages, newMessage],
          };
          setSelectedConversation(updatedConversation.id);
          addMessage(updatedConversation.id, {
            attachments: [],
            content: label,
            id: crypto.randomUUID(),
            sender: Sender.User,
            timestamp: Date.now(),
          });
          addMessage(updatedConversation.id, newMessage);
        } catch (error) {
          console.error("Error adding message:", error);
        }
      }
    }
  };

  if (selectedConversation) {
    return (
      <section className="content flex flex-col justify-between flex-[1] overflow-y-auto">
        <div className="content__header p-4 border-b border-gray-200 flex flex-col bg-white">
          <h3 className="font-semibold ">{selectedConversation.title}</h3>
          <p className="text-sm text-gray-500">
            {formatTimeSince(selectedConversation.updatedAt)}
          </p>
        </div>
        <div className="content__body p-4 flex flex-col gap-4 overflow-y-auto">
          {selectedConversation.messages.map((message, index) => {
            return (
              <Fragment key={`chat-${message.id}-${index}`}>
                <div
                  className={`message text-white p-3 rounded-lg w-fit ${
                    message.sender === Sender.System
                      ? "place-self-start bg-[#5204da]"
                      : "place-self-end bg-gray-800"
                  } max-w-2/3`}
                >
                  {message.content}
                </div>
                {Array.isArray(message.options) &&
                  message.options.length > 0 && (
                    <div className="flex gap-2">
                      {message.options.map((option, index) => {
                        return (
                          <Button
                            key={`chat-${message.id}-option-${index}`}
                            onClick={() =>
                              selectFirstOption(option.id, option.label)
                            }
                            className="cursor-pointer bg-[#3a009e] text-white"
                          >
                            {`>`} {option.label}
                          </Button>
                        );
                      })}
                    </div>
                  )}
              </Fragment>
            );
          })}
        </div>
        <form className="content__footer p-4 border-t border-gray-200 bg-white min-h-[120px] max-h-[150px] h-full"></form>
      </section>
    );
  } else {
    return (
      <div className="min-h-3/5 flex items-center justify-center">
        <EmptyResult
          icon={<Bot size={70} />}
          title="Bienvenido"
          text="Inicia una nueva conversación para conocer más sobre nuestra empresa"
          smallText="puedes preguntar sobre nuestra organización, misión, visión, proyectos, servicios u otras consultas."
          button={
            <Button className="mt-2" onClick={initConversation}>
              <SquarePen />
              <span>Nuevo Chat</span>
            </Button>
          }
        />
      </div>
    );
  }
};

export default Content;
