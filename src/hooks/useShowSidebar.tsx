import { useContext } from "react";
import { SideBarContext } from "../context/sideBarContext";

export const useShowSideBar = () => {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useShowSideBar must be used within a SideBarProvider");
  }
  return {
    isSideBarOpen: context.state.isOpen,
    toggleSideBar: () => context.dispatch({ type: "TOGGLE_SIDEBAR" }),
  };
};
