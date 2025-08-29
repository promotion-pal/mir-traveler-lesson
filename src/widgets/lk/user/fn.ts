import { useState } from "react";

const useUserLkFn = () => {
  const [edit, setEdit] = useState<boolean>(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  return { edit, toggleEdit };
};

export { useUserLkFn };
