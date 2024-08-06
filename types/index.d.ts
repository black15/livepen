declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type AccessType = ["room:write"] | ["room:read", "room:presence:write"];

declare type RoomAccesses = Record<string, AccessType>;

declare type RoomMetaTypes = {
  creatorId: string;
  email: string;
  title: string;
};

interface UpdateRoomParams {
  roomId: string;
  newRoomName?: string;
}

declare type UserType = "creator" | "editor" | "viewer";

declare type DocumentParams = {
  userId: string;
  email: string;
};

declare type AddDocumentProps = {
  userId: string;
  email: string;
};

declare type DocumentMetaData = {
  createdAt: string;
  id: string;
  metadata: {
    email: string;
    title: string;
  };
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
  color?: string;
  userType?: UserType;
};

declare type HeaderProps = {
  children: React.ReactNode;
  classname?: string;
};
