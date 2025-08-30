import { CommonReqList } from "../../types";

export interface Person {
  id: number;
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  role: string;
  status: string;
  moderation_status: string;
  is_subscribed: string;
  favorite_count: string;
  notification_count: string;
  all_notification_count: string;
  permissions: string;
}

type NotificationsStatus = "new";
export interface UserNotification {
  id: number;
  sender: string;
  subject: string;
  created_at: string;
  status: NotificationsStatus;
  body: string;
}
export interface UserNotificationList extends CommonReqList {
  results: UserNotification[];
}

export type UserRole = "business" | "individual";
export type UserStatus = "active";
export type UserModerationStatus = "approved";
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  moderation_status: UserModerationStatus;
  phone: string;
  role: UserRole;
  status: UserStatus;
}

export interface ContactingSupport {
  email: string;
  text: string;
}

export interface BusinessUser {}
