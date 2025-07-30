import { memo } from "react";
import { useAppSelector } from "../redux/hookStore";
import { Handle, Position, type NodeProps } from "reactflow";

function NodeMessage({ data: { message, id } }: NodeProps<{ message: string, id: string }>) {
    const selectedNode = useAppSelector(state => state.selectedNode);

    return (
        <div className={`w-48 h-14 shadow-[0_10px_25px_rgba(0,0,0,0.3)] rounded-md overflow-hidden
        ${(selectedNode?.node?.id == id) ? 'outline outline-2 outline-blue-900' : ''}`}>
            <div className="h-[40%] bg-green-200 flex items-center justify-start">
                <span className="text-black font-semibold text-sm px-4 py-1">Send Message</span>
            </div>

            <div className="h-[60%] bg-white flex items-center justify-start">
                <span className="text-black font-light text-sm px-4 py-1">{message}</span>
            </div>

            <Handle
                type="source"
                position={Position.Left}
            />

            <Handle
                type="target"
                position={Position.Right}
            />
        </div>
    );
}

export default memo(NodeMessage);