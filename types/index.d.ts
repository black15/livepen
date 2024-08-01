declare type AccessType = ["room:write"] | ["room:read", "room:presence:write"];

declare type RoomAccesses = Record<string, AccessType>;

declare type UserType = "creator" | "editor" | "viewer";

declare type DocumentParams = {
  userId: string;
  email: string;
};

declare type AddDocumentProps = {
  userId: string;
  email: string;
};

declare type RoomMetadata = {
  creatorId: string;
  email: string;
  title: string;
};

declare type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
  userType?: UserType;
};

declare type HeaderProps = {
  children: React.ReactNode;
  classname?: string;
};
