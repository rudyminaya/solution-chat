import React from "react";
import { Button } from "@/components/ui/button";
import { MessagesSquare, SquarePen } from "lucide-react";
import SearchInput from "@/src/components/SearchInput";
import { ConversationType } from "@/src/types/chat";
import EmptyResult from "@/src/components/EmptyResult";
import List from "../../List";
import { useShowSideBar } from "@/src/hooks/useShowSidebar";
import { useConversation } from "@/src/hooks/useConversation";

type Props = {
  conversations: ConversationType[];
};

type OptionsProps = {
  onSearch: (query: string) => void;
  handleNewChat: () => void;
};

type OverlayProps = {
  isOpen: boolean;
  onClick: () => void;
};

const Options = ({ onSearch, handleNewChat }: OptionsProps) => {
  return (
    <div className="options flex flex-col gap-4 px-4 pb-8 mb-5 border-b border-gray-200">
      <Button variant={"default"} onClick={handleNewChat}>
        <SquarePen />
        Nuevo Chat
      </Button>
      <SearchInput onSearch={onSearch} />
    </div>
  );
};

const Overlay = ({ isOpen, onClick }: OverlayProps) => {
  return (
    <div
      className={`fixed inset-0 bg-black/80 z-[1] overflow-hidden animate-slide-up ease-in-out duration-400 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClick}
    ></div>
  );
};

const Sidebar = () => {
  const { isSideBarOpen, toggleSideBar } = useShowSideBar();
  const { initConversation, conversations, findConversation } = useConversation();
  const handleSearch = (query: string) => {
    findConversation(query);
  };

  const handleNewChat = () => {
    initConversation();
    toggleSideBar();
  };

  return (
    <section
      className={`absolute top-0 h-full w-full overflow-hidden ${
        isSideBarOpen ? "" : "pointer-events-none"
      }`}
    >
      <Overlay isOpen={isSideBarOpen} onClick={toggleSideBar} />
      <aside
        className={`sidebar max-h-[500px] absolute z-2 w-full rounded-tl-3xl rounded-tr-3xl bg-white flex flex-col gap-4 pt-8 animate-slide-up ease-in-out duration-400 ${
          isSideBarOpen ? "bottom-0" : "bottom-[-100%]"
        }`}
      >
        <Options onSearch={handleSearch} handleNewChat={handleNewChat} />
        <div className="conversations px-4 overflow-y-auto">
          {!!conversations.length ? (
            <List conversations={conversations} />
          ) : (
            <EmptyResult
              icon={<MessagesSquare size={50} className="mb-4" />}
              title="No hay conversaciones"
              text="Inicia un nuevo chat"
            />
          )}
        </div>
      </aside>
    </section>
  );
};

export default Sidebar;
