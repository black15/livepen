"use client";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import React from "react";

import Header from "@/components/Header";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import editico from "../public/assets/icons/edit.svg";
import shareico from "../public/assets/icons/share.svg";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Editor } from "./editor/Editor";
import ActiveUsers from "./ActiveUsers";
import Loader from "./Loader";

const Room = ({ roomId, roomMeta }: { roomId: string; roomMeta: string }) => {
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div className="flex w-fit items-center justify-between gap-2">
              <div className="flex gap-2">
                <span>Untitled</span>
                <Image width={20} src={editico} alt="Edit" />
              </div>
              <div className="flex items-center justify-center gap-2">
                <Button className="flex gap-2 bg-blue-600 hover:bg-blue-700">
                  <Image src={shareico} alt="Share" width={15} />
                  <span>Share</span>
                </Button>

                <ActiveUsers />
                <Avatar>
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </Avatar>
              </div>
            </div>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
