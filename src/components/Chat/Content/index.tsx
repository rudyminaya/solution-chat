import { ConversationType, Sender } from "@/src/types/chat";
import React, { Fragment, useEffect, useState } from "react";
import EmptyResult from "../../EmptyResult";
import { Bot, Paperclip, Send, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConversation } from "@/src/hooks/useConversation";
import { formatTimeSince } from "@/src/utils/functions";
import { services } from "@/src/utils/service";
import { Textarea } from "@/components/ui/textarea";

const Content = () => {
  const {
    initConversation,
    selectedConversation,
    setSelectedConversation,
    addMessage,
    updateConversation,
  } = useConversation();
  const [files, setFiles] = useState<File[]>([]);
  

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
        <div className="content__body p-4 flex flex-col gap-4 overflow-y-auto overflow-x-hidden">
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
                  {message.attachments ? (
                    <div className="flex flex-col">
                      {message.attachments.map((file) => {
                        const hasPreview =
                          file.type.startsWith("image/") ||
                          file.type.startsWith("video/");
                        return (
                          <div key={file.name} className="file">
                            {hasPreview ? (
                              <div className="file-preview">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                />
                              </div>
                            ) : (
                              <div>{file.name}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div>{message.content}</div>
                  )}
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
        <form className="content__footer p-4 border-t border-gray-200 bg-white min-h-[120px] max-h-[130px] h-full flex flex-col gap-2">
          <div>
            {selectedConversation.messages.map((c) => {
              const allFiles = c.sender === Sender.User ? c.attachments : [];
              return allFiles.map((file, index) => (
                <div key={`file-${file.name}-${index}`} className="file">
                  {file.name}
                </div>
              ));
            })}
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <Textarea
              placeholder="Realiza tu consulta..."
              className="resize-none"
            />
            <div className="flex flex-col items-center gap-4">
              <input
                type="file"
                id="file-upload"
                onChange={(e) => {
                  if (e.target.files) {
                    setFiles(Array.from(e.target.files));
                  }
                }}
                accept=".png, .jpg, .jpeg, .pdf, .mp4"
                className="invisible absolute pointer-none"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Button
                  disabled
                  className="!bg-white text-gray-900 opacity-100 border !border-gray-400"
                >
                  <Paperclip />
                </Button>
              </label>
              <Button type="submit" className="cursor-pointer">
                <Send />
              </Button>
            </div>
          </div>
        </form>
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
