"use client";
import React from "react";
import styles from "./styles.module.css";
import Sidebar from "./SideBar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Content from "./Content";
import { useShowSideBar } from "@/src/hooks/useShowSidebar";

const Chat = () => {

  const { toggleSideBar } = useShowSideBar();
  return (
    <div className={styles.chatContainer}>
      <Button
        variant={"ghost"}
        onClick={toggleSideBar}
        className="border-b border-gray-200 w-full p-4 h-auto text-base md:hidden"
      >
        <Menu />
        <span>Historial de Conversaciones</span>
      </Button>
      <Content />
      <Sidebar />
    </div>
  );
};

export default Chat;
