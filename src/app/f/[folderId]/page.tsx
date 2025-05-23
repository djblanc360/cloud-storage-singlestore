import { QUERIES } from "~/server/db/queries";
import Contents from "~/app/f/[folderId]/contents";


export default async function GoogleDriveClone(props: {params: Promise<{folderId: string}>}) {
  const params = await props.params;

  const parsedFolderId = parseInt(params.folderId);

  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }


  const [files, folders, parents] = await Promise.all([
    QUERIES.getFiles(parsedFolderId),
    QUERIES.getFolders(parsedFolderId), 
    QUERIES.getAllParentsForFolder(parsedFolderId)
  ]);

  return (
    <Contents files={files} folders={folders} parents={parents} currentFolderId={parsedFolderId} />
  )
}