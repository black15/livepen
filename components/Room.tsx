"use client";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import React from "react";

import Header from "@/components/Header";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import editico from "../public/assets/icons/edit.svg";
import shareico from "../public/assets/icons/share.svg";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Room = () => {
  return (
    <RoomProvider id="my-room">
      <ClientSideSuspense fallback={<div>Loading…</div>}>
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
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
