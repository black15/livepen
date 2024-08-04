import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import doc from "../../public/assets/icons/documentrepo.svg";
import AddDocumentBtn from "@/components/AddDocumentBtn";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDocuments } from "@/lib/actions/room.actions";
import DocIco from "../../public/assets/icons/document-repo.svg";
import { dateConverter } from "@/lib/utils";
import Link from "next/link";

const Home = async () => {
  const clerkUser = await currentUser();
  const documents = await getDocuments(
    clerkUser?.emailAddresses[0].emailAddress
  );
  // const documents = ["test", "test", "test"];
  const documentNames: DocumentMetaData[] = [];

  documents.map((document: DocumentMetaData) => {
    documentNames.push({
      id: document.id,
      createdAt: document.createdAt,
      metadata: {
        title: document.metadata.title,
        email: document.metadata.email,
      },
    });
  });

  if (!clerkUser) redirect("/login");

  return (
    <main className="home-container">
      <Header classname="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4 text-gray-100">
          Notifaction
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {documents.length > 0 ? (
        <div className="w-full flex flex-col gap-6">
          <div className="w-full max-w-[750px] mx-auto flex items-center justify-between">
            <span className="text-2xl text-gray-800 font-semibold">
              All Documents {documentNames.length}
            </span>
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <div className="flex flex-col gap-4">
            {documentNames.map((document) => (
              <Link
                href={`documents/${document.id}`}
                key={document.id}
                className="w-full max-w-[750px] mx-auto bg-gray-50 flex flex-col gap-4 items-center justify-center rounded-md py-8 px-6 transition-all duration-300 ease-in-out hover:scale-105"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 0px 2px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                }}
              >
                <div className="w-full flex items-center gap-6">
                  <div
                    className="bg-gray-50 p-3"
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.1) 0px 0px 2px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                    }}
                  >
                    <Image src={DocIco} alt="Document" width={40} height={40} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="text-lg text-gray-800">
                      {document.metadata.title}
                    </span>
                    <span className="text-sm text-gray-700">
                      Created about {dateConverter(document.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="w-full max-w-[750px] bg-gray-50 flex flex-col gap-4 items-center justify-center rounded-md py-8"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          <Image
            src={doc}
            alt="Document"
            width={50}
            height={50}
            className="mx-auto"
          />
          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
