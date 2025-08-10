import { MessagesSquare } from "lucide-react";
import React from "react";

type Props = {
  icon: React.ReactNode;
  title?: string;
  text: string;
  smallText?: string;
  button?: React.ReactNode;
};

const EmptyResult = ({ icon, title, text, smallText, button }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center text-gray-500 p-4 gap-2 text-center">
      {icon}
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      <p>{text}</p>
      {smallText && <p className="text-sm font-light">{smallText}</p>}
      {button ?? <></>}
    </div>
  );
};

export default EmptyResult;
