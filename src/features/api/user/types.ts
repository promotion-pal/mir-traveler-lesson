export type RoleType =
  | "admin"
  | "owner"
  | "guest"
  | "business"
  | "moderator"
  | "individual"
  | "deputy_owner";
export type StatusUserType =
  | "active"
  | "blocked"
  | "waiting_mail_conformation"
  | "waiting_register_conformation";
export type StatusModerationUserType =
  | "reject"
  | "waiting"
  | "approved"
  | "preparation";
export type AdminPermissionsType =
  | "admin_ads"
  | "admin_news"
  | "admin_emails"
  | "admin_support"
  | "admin_tariffs"
  | "admin_banners"
  | "admin_articles"
  | "admin_flatpages"
  | "admin_employees"
  | "admin_statistics"
  | "admin_moderation"
  | "admin_dictionaries"
  | "user_configurations"
  | "admin_business_users"
  | "admin_employees_edit"
  | "admin_moderation_edit"
  | "admin_role_permissions"
  | "admin_individual_users"
  | "admin_business_users_edit"
  | "admin_individual_users_edit"
  | "admin_moderation_change_employee";

export interface Me {
  id: number;
  email: string;
  role: RoleType;
  last_name: string;
  first_name: string;
  middle_name: string;
  is_subscribed: string;
  favorite_count: string;
  status: StatusUserType;
  notification_count: string;
  all_notification_count: string;
  permissions: AdminPermissionsType;
  moderation_status: StatusModerationUserType;
}
