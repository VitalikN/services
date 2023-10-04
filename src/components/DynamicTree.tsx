import React from "react";
import Tree from "react-d3-tree";
import styles from "../sass/dynamicTree.module.scss";
import { HiOutlinePlusSm } from "react-icons/hi";

import { DataType } from "./DomTree";

type CustomNodeProps = {
  nodeData: DataType;
  onAddChild: (node: DataType) => void;
  onNodeNameChange: (node: DataType, name: string) => void;
  isEditing: boolean;
  setEditingNode: (node: DataType | null) => void;
  onRemoveNode: (node: DataType) => void;
  rootNodeId: string;
  isAdding: boolean;
  addingNodeParent: DataType | null;
  setIsAdding: (value: boolean) => void;
  setAddingNodeParent: (node: DataType | null) => void;
  editingNode: DataType | null;
};

const CustomNode: React.FC<CustomNodeProps> = ({
  nodeData,
  onAddChild,
  onNodeNameChange,
  isEditing,
  setEditingNode,
  onRemoveNode,
  rootNodeId,

  setIsAdding,
  setAddingNodeParent,
  editingNode,
}) => {
  const isCurrentNodeEditing = nodeData.id === editingNode?.id;

  const handleConfirmClick = () => {
    if (nodeData.name.trim() === "") {
      alert("Введіть назву вузла перед тим як продовжити");
      return;
    }
    setIsAdding(false);
    setEditingNode(null);
  };

  const handleCancelClick = () => {
    onRemoveNode(nodeData);
    setIsAdding(false);
    setEditingNode(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsAdding(false);
      setAddingNodeParent(null);
      if (nodeData.name.trim() === "") {
        onRemoveNode(nodeData);
      }
    }
  };
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + "...";
  };

  return (
    <g>
      <rect x="-50" y="-15" className={styles.box__tree} />
      {isCurrentNodeEditing ? (
        <foreignObject x="-40" y="-10" width="150" height="30">
          <input
            autoFocus
            value={nodeData.name}
            onChange={(e) => onNodeNameChange(nodeData, e.target.value)}
            onBlur={() => {
              if (nodeData.name.trim() === "") {
                alert("Введіть назву вузла перед тим як продовжити");
              } else {
                setEditingNode(null);
              }
            }}
            onKeyDown={handleKeyPress}
            className={styles.inputTrim}
          />
        </foreignObject>
      ) : (
        <text
          x="-40"
          y="0"
          className={styles.box__tree__text}
          dy=".35em"
          onClick={() => setEditingNode(nodeData)}
        >
          {truncateText(nodeData.name, 10)}
        </text>
      )}

      {isCurrentNodeEditing && (
        <>
          <foreignObject x="80" y="-10" width="100" height="30">
            <div>
              <button onClick={handleCancelClick}>❌</button>

              <button onClick={handleConfirmClick}>✅</button>
            </div>
          </foreignObject>
        </>
      )}
      {!isCurrentNodeEditing && (
        <>
          <foreignObject x="80" y="-10" width="150" height="30">
            <div>
              {/* <button> */}
              <HiOutlinePlusSm
                onClick={() => onAddChild(nodeData)}
                disabled={isEditing}
              />
              {/* </button> */}
              <button onClick={() => setEditingNode(nodeData)}>🖉</button>
              {nodeData.id !== rootNodeId && (
                <button onClick={() => onRemoveNode(nodeData)}>🗑️</button>
              )}
            </div>
          </foreignObject>
        </>
      )}
    </g>
  );
};

type TreeProps = {
  data: DataType;
  onAddChild: (node: DataType) => void;
  onNodeNameChange: (node: DataType, name: string) => void;
  orientation?: "vertical" | "horizontal";
  pathFunc?: "diagonal" | "elbow" | "straight" | "step";
  translate?: { x: number; y: number };
  editingNode: DataType | null;
  setEditingNode: (node: DataType | null) => void;
  onRemoveNode: (node: DataType) => void;
  rootNodeId: string;
  isAdding: boolean;
  addingNodeParent: DataType | null;
  setIsAdding: (value: boolean) => void;
  setAddingNodeParent: (node: DataType | null) => void;
};

const DynamicTree: React.FC<TreeProps> = ({
  onAddChild,
  onNodeNameChange,
  editingNode,
  setEditingNode,
  onRemoveNode,
  isAdding,
  addingNodeParent,
  setIsAdding,
  setAddingNodeParent,
  ...props
}) => {
  return (
    <Tree
      separation={{ siblings: 1.5, nonSiblings: 1.5 }}
      renderCustomNodeElement={(rd3tProps: any) => (
        <CustomNode
          nodeData={rd3tProps.nodeDatum}
          onAddChild={onAddChild}
          onNodeNameChange={onNodeNameChange}
          isEditing={rd3tProps.nodeDatum === editingNode}
          setEditingNode={setEditingNode}
          onRemoveNode={onRemoveNode}
          rootNodeId={props.rootNodeId}
          isAdding={isAdding}
          addingNodeParent={addingNodeParent}
          setIsAdding={setIsAdding}
          setAddingNodeParent={setAddingNodeParent}
          editingNode={editingNode}
        />
      )}
      {...props}
    />
  );
};
export default DynamicTree;
