import { StatusModerationUserType } from "../api/user";

const extractModerationUserType = () => {
  interface ModerationUserItem {
    text: string;
    style: string;
  }

  const moderationUserMap: Record<
    StatusModerationUserType,
    ModerationUserItem
  > = {
    reject: {
      text: "Не прошел модерацию",
      style: "",
    },
    waiting: {
      text: "Ожидание модерации",
      style: "",
    },
    approved: {
      text: "Модерация пройдена",
      style: "",
    },
    preparation: {
      text: "Подготовка модерации",
      style: "",
    },
  };

  return moderationUserMap.approved;
};

export { extractModerationUserType };
