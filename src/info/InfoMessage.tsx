import { memo, useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { clearSelectedNode } from "../redux/sliceSelectedNode";
import { useAppDispatch, useAppSelector } from "../redux/hookStore";
import { useReactFlow } from "reactflow";

function InfoMessage() {
    const dispatch = useAppDispatch();
    const { setNodes } = useReactFlow();
    const [text, setText] = useState("");
    const selectedNode = useAppSelector(state => state.selectedNode);

    function ButtonBack() {
        if (!selectedNode || !selectedNode.node) return;
        dispatch(clearSelectedNode());
    }

    function TextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const newMessage = e.target.value;
        setText(newMessage);

        setNodes((nodes) =>
            nodes.map((node) =>
                node.id === selectedNode.node?.id
                    ? {
                        ...node,
                        data: {
                            ...node.data,
                            message: newMessage,
                        },
                    }
                    : node
            )
        );
    };

    useEffect(() => {
        if (selectedNode?.node?.data?.message) {
            setText(selectedNode.node.data.message);
        }
        else {
            setText("");
        }
    }, [selectedNode]);

    if (!selectedNode || !selectedNode.node) return null;

    return (
        <div className="w-[20%] min-w-[200px] p-4 overflow-auto relative z-20 pointer-events-none">

            <div className="w-full h-full flex flex-col bg-white rounded-md border border-gray-300 shadow">
                <div className="flex items-center justify-between bg-gray-100 p-4 border-b border-gray-300 z-10">
                    <button
                        className="text-gray-700 hover:text-black transition pointer-events-auto"
                        onClick={ButtonBack}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-center flex-1 text-base font-semibold text-black -ml-5">{selectedNode.node.type}</h2>
                </div>

                <div className="flex-1 p-4 overflow-auto select-none">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Text</label>
                    <textarea
                        rows={6}
                        className="w-full resize-none rounded-md border border-gray-300 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 pointer-events-auto"
                        value={text}
                        onChange={TextChange}
                    />
                </div>
            </div>

        </div>
    );
}

export default memo(InfoMessage);