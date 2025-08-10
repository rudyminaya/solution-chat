import React from "react";

type Props = {
  title: string;
};

const Menu = (props: Props) => {
  return (
    <nav className="bg-gradient-to-r from-blue-950 to-pink-800 p-6 text-xl uppercase font-bold">
      <h1 className="text-white">{props.title}</h1>
    </nav>
  );
};

export default Menu;
