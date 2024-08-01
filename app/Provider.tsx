"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loader from "@/components/Loader";

export function Provider({ children }: { children: ReactNode }) {
  return (
    // <LiveblocksProvider
    //   publicApiKey={
    //     "pk_dev_8wAuCE5bOfHVyq6hWXsjSsz3dgJ7mWHMBwS6cVDA5Vf2OSHnGszJ0FEDwOPkogNV"
    //   }
    // >
    <LiveblocksProvider authEndpoint={"/api/liveblocks-auth"}>
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
}
