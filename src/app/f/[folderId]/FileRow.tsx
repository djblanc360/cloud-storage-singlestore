import { Folder as FolderIcon, FileIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import type { file_table, folder_table } from "../../../server/db/schema";
import { deleteFile } from "~/server/actions";
import { Button } from "~/components/ui/button";

export function FileRow(props: {file: typeof file_table.$inferSelect}) {
    const { file } = props;
    
    return (
        <li key={file.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750">
            <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-6 flex items-center">
                <Link 
                    href={file.url} 
                    className="flex items-center text-gray-100 hover:text-blue-400"
                    target="_blank"
                >
                    <FileIcon className="mr-3" size={20} />
                    {file.name}
                </Link>
            </div>
            <div className="col-span-2 text-gray-400">{"file"}</div>
            <div className="col-span-2 text-gray-400">{file.size}</div>
            <div className="col-span-2 text-gray-400">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => deleteFile(file.id)}
                    aria-label="delete file"
                >
                    <Trash2Icon size={20} />
                </Button>
            </div>
            </div>
        </li>
    )
}

export function FolderRow(props: { folder: typeof folder_table.$inferSelect }) {
    const { folder } = props;
    return (
        <li key={folder.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750">
            <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-6 flex items-center">
                <Link
                    href={`/f/${folder.id}`}
                    className="flex items-center text-gray-100 hover:text-blue-400 cursor-pointer"
                >
                    <FolderIcon className="mr-3" size={20} />
                    {folder.name}
                </Link>
            </div>
            <div className="col-span-2 text-gray-400">Folder</div>
            <div className="col-span-2 text-gray-400">--</div>
            <div className="col-span-2 text-gray-400">delete folder</div>
            </div>
        </li>
    )
}


