import { db } from "../../server";
import { mockFolders, mockFiles } from "../../lib/mock-data";
import { folder_table, file_table } from "../../server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function SandboxPage() {
    const user = await auth();
    if (!user?.userId) {
        throw new Error("User not found")
    }
    const folders = await db.select().from(folder_table).where(eq(folder_table.ownerId, user.userId));
    console.log(folders);

    return (
        <div className="flex flex-col gap-4">
            <form action={async () => {
                "use server"
                console.log("Seeding...")

                const user = await auth()
                if (!user?.userId) {
                    throw new Error("User not found")
                }
                console.log("=== Database Seeding Logs ===");
                console.log("1. User ID:", user.userId);
                
                const rootFolder = await db
                .insert(folder_table)
                .values({
                  name: "root",
                  ownerId: user.userId,
                  parent: null,
                })
                .$returningId();
                console.log("2. Root folder created with ID:", rootFolder[0]?.id);
    
                const insertableFolders = mockFolders.map((folder) => ({
                    name: folder.name,
                    ownerId: user.userId,
                    parent: rootFolder[0]!.id,
                }));
                console.log("3. Folders to insert:", insertableFolders);
                
                const insertedFolders = await db.insert(folder_table).values(insertableFolders);
                console.log("4. Folders inserted successfully:", insertedFolders);
                
                console.log("=== Seeding Complete ===");
            }}>
                <button type="submit">Seed</button>
            </form>
        </div>
    )
}