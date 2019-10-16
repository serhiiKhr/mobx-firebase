export interface IMessage {
  text: string;
  id: string;
  created: string;
  authorName: string;
  authorId: string;
}
export interface IMessageItem {
  message: IMessage;
  userId: string;
}
export interface IMessageArea {
  messages: Array<IMessage>;
  userId: string;
}
export interface IInputMessageArea {
  value: string;
  onChange(value: string): void;
  onSubmit(message: string): void;
}
