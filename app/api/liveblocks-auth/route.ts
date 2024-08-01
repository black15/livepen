import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  // Get the current user from your database
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/login");

  const user = {
    id: clerkUser?.id,
    info: {
      id: clerkUser?.id,
      name: `${clerkUser?.firstName} ${clerkUser?.lastName}`,
      avatar: clerkUser?.imageUrl,
      colors: getUserColor(clerkUser.id),
      email: clerkUser?.emailAddresses[0].emailAddress,
    },
  };

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds: [], // Optional
    },

    { userInfo: user.info }
  );

  return new Response(body, { status });
}
