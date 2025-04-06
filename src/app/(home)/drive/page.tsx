import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { QUERIES, MUTATIONS } from "@/server/db/queries";
import { Button } from "~/components/ui/button";


export default async function DrivePage() {

    const session = await auth();

    if (!session.userId) {
        redirect("/sign-in");
    }

    const rootFolder = await QUERIES.getUserRootFolder(session.userId);

    if (!rootFolder) {
        return (
            <form action={async () => {
                "use server";
                const session = await auth();

                if (!session.userId) {
                    redirect("/sign-in");
                }

                const rootFolderId = await MUTATIONS.onboardUser(session.userId);

                return redirect(`/f/${rootFolderId}`);
            }}>
                <Button type="submit">Create new drive</Button>
            </form>
        )
    }

    return redirect(`/f/${rootFolder.id}`);
}