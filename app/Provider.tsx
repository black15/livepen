"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loader from "@/components/Loader";
import { clerkClient } from "@clerk/nextjs/server";
import { getClerkUsers, getDocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";

export function Provider({ children }: { children: ReactNode }) {
  const clerkUser = useUser();
  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });

        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser: clerkUser.user?.emailAddresses[0].emailAddress,
          text,
        });
        return roomUsers;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
}
