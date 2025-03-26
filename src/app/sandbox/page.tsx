import { db } from "../../server";
import { mockFolders, mockFiles } from "../../lib/mock-data";
import { folder_table, file_table } from "../../server/db/schema";

export default function SandboxPage() {
    return (
        <div className="flex flex-col gap-4">
            <form action={async () => {
                "use server"
                console.log("Seeding...")
                /*
                    const folderInsert = await db.insert(folders).values(
                        mockFolders.map((folder, index) => ({
                            id: index + 1,
                            name: folder.name,
                            parent: index !== 0 ? index : null,
                        })
                    ))

                    const fileInsert = await db.insert(files).values(
                        mockFiles.map((file, index) => ({
                            id: index + 1,
                            name: file.name,
                            size: parseInt(file.size),
                            url: file.url,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            parent: (index% 3) + 1, // random parent
                        }))
                    )
                    console.log("Seeded", folderInsert.length, "folders and", fileInsert.length, "files: ", folderInsert, fileInsert)
                    */
                // Clear existing data first
                // await db.delete(files)
                // await db.delete(folders)
                
                await db.insert(folder_table).values(mockFolders.map((folder, index) => ({
                    id: index + 1,
                    name: folder.name,
                    parent: index !== 0 ? index : null,
                })))
                await db.insert(file_table).values(mockFiles.map((file, index) => ({
                    id: index + 1,
                    name: file.name,
                    size: parseInt(file.size),
                    url: file.url,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    parent: (index% 3) + 1, // random parent
                })))
            }}>
                <button type="submit">Seed</button>
            </form>
        </div>
    )
}