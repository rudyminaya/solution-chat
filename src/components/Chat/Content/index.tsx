import { ConversationType } from "@/src/types/chat";
import React from "react";
import EmptyResult from "../../EmptyResult";
import { Bot, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConversation } from "@/src/hooks/useConversation";
import { formatTimeSince } from "@/src/utils/functions";

const Content = () => {
  const { initConversation, selectedConversation } = useConversation();
  console.log('selectedConversation : ', selectedConversation)
  if (selectedConversation) {
    return(
      <section className="content flex flex-col justify-between flex-[1]">
        <div className="content__header p-4 border-b border-gray-200 flex flex-col bg-white">
          <h3 className="font-semibold ">{selectedConversation.title}</h3>
          <p className="text-sm text-gray-500">{formatTimeSince(selectedConversation.updatedAt)}</p>
        </div>
        <div className="content__body p-4">

        </div>
        <form className="content__footer p-4 border-t border-gray-200 bg-white min-h-[120px] max-h-[150px] h-full">
          
        </form>
      </section>
    )
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
