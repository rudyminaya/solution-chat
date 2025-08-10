"use client";
import { ConversationType } from "@/src/types/chat";
import React, { useState, useEffect } from "react";
import ItemList from "../ItemList";
import { useShowSideBar } from "@/src/hooks/useShowSidebar";

const List = ({ conversations }: { conversations: ConversationType[] }) => {
  const { isSideBarOpen } = useShowSideBar();
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    if (isSideBarOpen) {
      const timer = setTimeout(() => {
        setShowFooter(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setShowFooter(false);
    }
  }, [isSideBarOpen]);

  return (
    <div className="flex flex-col gap-4 relative pb-10">
      {conversations.map((conversation, index) => (
        <ItemList
          key={`conversation-${index}-${conversation.id}`}
          {...conversation}
        />
      ))}
      {showFooter && (
        <div className="lg:hidden transition-all delay-400 fixed bg-gradient-to-t from-white to-transparent pointer-events-none max-h-15 h-15 w-full bottom-0 left-0"></div>
      )}
    </div>
  );
};

export default List;
