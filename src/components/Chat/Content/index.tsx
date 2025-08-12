import { Sender } from "@/src/types/chat";
import React, { Fragment, useEffect, useState } from "react";
import EmptyResult from "../../EmptyResult";
import { Bot, Paperclip, Send, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConversation } from "@/src/hooks/useConversation";
import { fileToBase64, formatTimeSince } from "@/src/utils/functions";
import { services } from "@/src/utils/service";
import { Textarea } from "@/components/ui/textarea";

const Content = () => {

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedConversation) return;
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length === 0) return;
    const base64Files = await Promise.all(files.map((fileToBase64)));
    const newMessage = {
      id: crypto.randomUUID(),
      content: "Archivo enviado",
      attachments: base64Files,
      sender: Sender.User,
      timestamp: Date.now(),
    };
    addMessage(selectedConversation.id, newMessage);
    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
    };
    updateConversation(updatedConversation);
    setSelectedConversation(updatedConversation.id);
    setFiles([]);
  };
  const {
    initConversation,
    selectedConversation,
    addMessage,
    updateConversation,
    setSelectedConversation,
  } = useConversation();
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (selectedConversation) {
      const userFiles: string[] = [];
      selectedConversation.messages.forEach((msg) => {
        if (msg.sender === Sender.User && Array.isArray(msg.attachments)) {
          msg.attachments.forEach((att) => {
            if (typeof att === "string") userFiles.push(att);
          });
        }
      });
    }
  }, [selectedConversation]);

  const handleSubmit = () => {
    if (!selectedConversation) return;
    const inputElement = document.querySelector('.content__footer textarea') as HTMLTextAreaElement;
    const content = inputElement?.value?.trim();
    if (!content && files.length === 0) return;
    Promise.all(files.map(fileToBase64)).then((base64Files) => {
      const newMessage = {
        id: crypto.randomUUID(),
        content,
        attachments: base64Files,
        sender: Sender.User,
        timestamp: Date.now(),
      };
      addMessage(selectedConversation.id, newMessage);
      const updatedConversation = {
        ...selectedConversation,
        messages: [...selectedConversation.messages, newMessage],
      };
      updateConversation(updatedConversation);
      setSelectedConversation(updatedConversation.id);
      inputElement.value = "";
      setFiles([]);
    });
  }


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
      <section className="content flex flex-col justify-between flex-[1] overflow-y-auto border border-r border-gray-200">
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
                  className={`message text-white p-3 rounded-lg w-fit ${message.sender === Sender.System
                    ? "place-self-start bg-[#5204da]"
                    : "place-self-end bg-gray-800"
                    } max-w-2/3`}
                >
                  {message.attachments?.length > 0 ? (
                    <div className="flex flex-col">
                      {message.attachments.map((file, idx) => {
                        if (typeof file === "string") {
                          const isImage = file?.startsWith("data:image/");
                          const isVideo = file?.startsWith("data:video/");
                          let fileName = message.content && message.content !== "Archivo enviado" ? message.content : `Archivo ${idx + 1}`;
                          return (
                            <div key={idx} className="file">
                              {isImage ? (
                                <img src={file} alt={fileName} className="max-w-96" />
                              ) : isVideo ? (
                                <video src={file} controls />
                              ) : (
                                <a href={file} download>{fileName}</a>
                              )}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  ) : (
                    <div>{message.content}</div>
                  )}
                </div>
                {Array.isArray(message.options) &&
                  message.options.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
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
        <div className="content__footer p-4 border-t border-gray-200 bg-white min-h-[120px] max-h-[130px] h-full flex flex-col gap-2">
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <Textarea
              placeholder="Realiza tu consulta..."
              className="resize-none"
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <div className="flex flex-col items-center gap-4">
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileUpload}
                accept=".png, .jpg, .jpeg, .pdf, .mp4"
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer border-gray-300 border p-1.5 rounded-md w-[40px] h-[36px] flex items-center justify-center">
                <Paperclip width={16} />
              </label>
              <Button variant="default" className="cursor-pointer" onClick={handleSubmit}>
                <Send />
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <div className="min-h-3/5 flex items-center justify-center md:w-full">
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
