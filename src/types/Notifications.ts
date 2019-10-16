export type NotificationType = 'message' | 'auth' | 'profile';
export interface INotification {
  text: string;
  created: string;
  label: string;
  id: string;
  type: NotificationType;
}
export interface INotificationItem {
  notification: INotification;
  onClick(notification: INotification): void;
}

