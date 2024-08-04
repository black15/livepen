"use server";

import { randomUUID } from "crypto";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

export const getDocument = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    // if (!hasAccess) {
    //   throw new Error("You do not have access to this document");
    // }

    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while getting a room: ${error}`);
  }
};

export const getDocuments = async (email: string | undefined) => {
  const { data: rooms } = await liveblocks.getRooms({ userId: email });
  try {
    return parseStringify(rooms);
  } catch (error) {
    console.log(error, "error getting rooms");
  }
};

export const createDocument = async ({ userId, email }: DocumentParams) => {
  const roomId = randomUUID();

  try {
    const metadata: RoomMetadata = {
      creatorId: userId,
      email,
      title: "Untitled",
    };

    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ["room:write"],
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.log("Error creating room ", error);
  }
};

export const updateDocument = async (roomId: string, newRoomName: string) => {
  try {
    const document = await liveblocks.updateRoom(roomId, {
      metadata: {
        ...(newRoomName && { title: newRoomName }),
      },
    });

    return parseStringify(document);
  } catch (error) {
    console.log(error);
    console.log("error changing room name");
  }
};
