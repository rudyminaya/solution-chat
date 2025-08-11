import { ConversationType } from "@/src/types/chat";
import { formatTimeSince } from "@/src/utils/functions";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import "./styles.css";
import { useConversation } from "@/src/hooks/useConversation";
import { useShowSideBar } from "@/src/hooks/useShowSidebar";

const ItemList = ({ id, title, updatedAt }: ConversationType) => {
    const descriptionDate = formatTimeSince(updatedAt);
    const { removeConversation, setSelectedConversation } = useConversation();
    const {toggleSideBar} = useShowSideBar()
    const [removing, setRemoving] = useState(false);

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        setRemoving(true);
        setTimeout(() => {
            removeConversation(id);
        }, 400);
    };

    const handleClick = () => {
        setSelectedConversation(id);
        toggleSideBar();
    };

    return (
        <div
            className={`itemList bg-gray-100 p-4 rounded-lg ${removing ? "removing" : ""}`}
            onClick={handleClick}
        >
            <div className="itemList__header flex justify-between">
                <h4 className="itemList__header__title font-semibold ">{title}</h4>
                <Trash2
                    className="itemList__header__icon"
                    onClick={handleRemove}
                />
            </div>
            <p className="text-gray-400">{descriptionDate}</p>
        </div>
    );
};

export default ItemList;
