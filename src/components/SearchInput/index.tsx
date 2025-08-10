import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
    onSearch: (query: string) => void;
};

const SearchInput = ({onSearch}: Props) => {
  return <Input placeholder="🔍︎ Buscar conversaciones..." onChange={(e) => onSearch(e.target.value)} />;
};

export default SearchInput;
