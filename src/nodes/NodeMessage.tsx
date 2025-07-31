import { memo } from "react";
import { useAppSelector } from "../redux/hookStore";
import { MessageSquareText } from "lucide-react";
import { Handle, Position, type NodeProps } from "reactflow";

function NodeMessage({ data: { message, id } }: NodeProps<{ message: string, id: string }>) {
    const selectedNode = useAppSelector(state => state.selectedNode);

    return (
        <div className={`w-48 min-h-14 shadow-[0_10px_25px_rgba(0,0,0,0.3)] rounded-md overflow-hidden
        ${(selectedNode?.node?.id == id) ? 'outline outline-2 outline-blue-900' : ''}`}>
            <div className="h-[40%] bg-green-200 flex items-center justify-between px-2 py-1">
                <div className="flex items-center gap-1">
                    <MessageSquareText className="w-3 h-3 text-black" />
                    <span className="text-black font-semibold text-xs pb-1">Send Message</span>
                </div>

                <img
                    src="/WhatsApp.png"
                    alt="WhatsApp"
                    className="w-3 h-3 object-contain"
                />
            </div>

            <div className="bg-white px-4 py-1 text-sm text-black font-light overflow-y-auto max-h-36 min-h-[60%] whitespace-pre-wrap break-words">
                {message || <span className="text-gray-400 italic">Enter message</span>}
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