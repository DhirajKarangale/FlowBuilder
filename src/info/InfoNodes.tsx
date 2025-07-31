import { memo } from "react";
import { nodes } from "../nodes/Nodes";
import { useReactFlow } from "reactflow";

function InfoNodes() {
    const { setNodes } = useReactFlow();

    function SpawnNode(type: string) {
        const id = new Date();

        setNodes((pre) => [
            ...pre,
            {
                id: `${id}`,
                data: { message: '', id: `${id}` },
                type: type,
                position: { x: 50, y: 30 }
            }
        ]);
    }

    function onDragStart(event: React.DragEvent, nodeType: string) {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    }

    return (
        <div className="w-[20%] min-w-[200px] p-4 overflow-auto select-none">
            <div className="flex flex-wrap gap-4">
                {nodes.map((node, index) => (
                    <div
                        key={index}
                        draggable
                        onDragStart={(event) => onDragStart(event, node.type)}
                        onClick={() => SpawnNode(node.type)}
                        className="w-[calc(50%-0.5rem)] bg-white border-2 border-blue-900 rounded-md flex flex-col items-center justify-center px-4 py-2 shadow hover:shadow-md transition"
                    >
                        <node.icon className="text-blue-900 w-5 h-5 mb-2" />
                        <span className="text-sm font-medium text-center text-blue-900">
                            {node.type}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default memo(InfoNodes);