import { Tree, TreeViewElement, File, Folder } from '@/components/extension/tree-view-api';
import { FileItem } from '@/components/file/fileItem';

type TOCProps = {
  toc: TreeViewElement[];
};

const TOC = ({ toc }: TOCProps) => {
  return (
    <Tree className="w-full h-full bg-transparent p-2 rounded-md" indicator={true}>
      {toc.map((element) => (
        <TreeItem key={element.id} elements={[element]} />
      ))}
    </Tree>
  );
};

type TreeItemProps = {
  elements: TreeViewElement[];
};

export const TreeItem = ({ elements }: TreeItemProps) => {
  return (
    <ul className="w-full space-y-1">
      {elements.map((element) => (
        <li key={`${element.id}+${element.filename}`} className="w-full space-y-2">
          {element.children && element.children?.length > 0 ? (
            <Folder
              element={element.filename}
              value={`Folder-${element.id}`}
              key={`Folder-${element.id}`}
              isSelectable={element.isSelectable}
              className="px-px pr-1 text-[13px] font-[400]"
            >
              <TreeItem
                key={`iFolder-${element.id}`}
                aria-label={`folder ${element.filename}`}
                elements={element.children}
              />
            </Folder>
          ) : (
            <File key={`File-${element.id}`} value={element.id} isSelectable={element.isSelectable}>
              <FileItem key={`iFile-${element.id}`} file={element}></FileItem>
            </File>
          )}
        </li>
      ))}
    </ul>
  );
};

const FileTree = ({ data }: { data: TreeViewElement[] }) => {
  console.log(data);

  return <TOC toc={data} />;
};

export default FileTree;
