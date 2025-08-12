export enum Sender {
  User = "user",
  System = "system",
}

export type OptionsMessageType = {
  id: string;
  label: string;  
};

export type MessageType = {
  attachments: string[];
  content: string;
  options?: OptionsMessageType[];
  id: string;
  sender: Sender;
  timestamp: number;
};

export type ConversationType = {
  createdAt: Date;
  id: string;
  messages: MessageType[];
  title: string;
  updatedAt: Date;
};
