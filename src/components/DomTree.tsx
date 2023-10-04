import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import dynamic from "next/dynamic";
const DynamicTree = dynamic(() => import("./DynamicTree"), { ssr: false });

export type DataType = {
  id: string;
  name: string;
  isEditing?: boolean;
  children?: DataType[];
  depth: number;
};

const DomTree: React.FC = () => {
  const [treeData, setTreeData] = useState({
    id: uuidv4(),
    name: "Category",
    children: [],
    depth: 0,
  });

  const [editingNode, setEditingNode] = useState<DataType | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [addingNodeParent, setAddingNodeParent] = useState<DataType | null>(
    null
  );

  const updateNodeNameRecursive = (
    currentNode: DataType,
    targetNode: DataType,
    newName: string
  ) => {
    if (currentNode.id === targetNode.id) {
      currentNode.name = newName;
      return true;
    }

    if (currentNode.children) {
      for (const child of currentNode.children) {
        if (updateNodeNameRecursive(child, targetNode, newName)) {
          return true;
        }
      }
    }

    return false;
  };

  const handleNodeNameChange = (node: DataType, name: string) => {
    const newTreeData = JSON.parse(JSON.stringify(treeData));
    updateNodeNameRecursive(newTreeData, node, name);
    node.isEditing = false;

    setTreeData(newTreeData);
  };

  const isEditingEmptyNodeExists = (currentNode: DataType): boolean => {
    if (currentNode.isEditing && currentNode.name.trim() === "") {
      return true;
    }

    if (currentNode.children) {
      for (const child of currentNode.children) {
        if (isEditingEmptyNodeExists(child)) {
          return true;
        }
      }
    }

    return false;
  };

  const addChildToNode = (node: DataType) => {
    if (isEditingEmptyNodeExists(treeData)) {
      alert(
        "Будь ласка, завершіть редагування поточного вузла перед додаванням нового."
      );
      return;
    }

    const newNode = {
      id: uuidv4(),
      name: "",
      children: [],
      isEditing: true,
      depth: node.depth + 1,
    };

    const addNodeRecursive = (currentNode: DataType, targetNode: DataType) => {
      if (currentNode.id === targetNode.id) {
        currentNode.children = currentNode.children
          ? [...currentNode.children, newNode]
          : [newNode];
        return true;
      }

      if (currentNode.children) {
        for (const child of currentNode.children) {
          if (addNodeRecursive(child, targetNode)) {
            return true;
          }
        }
      }

      return false;
    };

    const newTreeData = { ...treeData };
    addNodeRecursive(newTreeData, node);

    setIsAdding(true);
    setAddingNodeParent(node);

    setTreeData(newTreeData);
    setEditingNode(newNode);
  };

  const removeNode = (targetNode: DataType) => {
    const removeNodeRecursive = (
      currentNode: DataType,
      targetNodeId: string
    ) => {
      if (!currentNode.children) return;

      const index = currentNode.children.findIndex(
        (child) => child.id === targetNodeId
      );
      if (index !== -1) {
        currentNode.children.splice(index, 1);
      } else {
        currentNode.children.forEach((child) =>
          removeNodeRecursive(child, targetNodeId)
        );
      }
    };

    const newTreeData = JSON.parse(JSON.stringify(treeData));
    removeNodeRecursive(newTreeData, targetNode.id);
    setTreeData(newTreeData);
  };
  return (
    <div style={{ width: "100%", height: "800px" }}>
      <DynamicTree
        data={treeData}
        orientation="vertical"
        pathFunc="step"
        translate={{ x: 250, y: 100 }}
        onAddChild={addChildToNode}
        onNodeNameChange={handleNodeNameChange}
        editingNode={editingNode}
        setEditingNode={setEditingNode}
        onRemoveNode={removeNode}
        rootNodeId={treeData.id}
        isAdding={isAdding}
        addingNodeParent={addingNodeParent}
        setIsAdding={setIsAdding}
        setAddingNodeParent={setAddingNodeParent}
      />
    </div>
  );
};

export default DomTree;
