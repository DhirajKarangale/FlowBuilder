import { memo, useState, useRef } from "react";
import { useReactFlow } from "reactflow";

function PanelTop() {
    const { getNodes, getEdges } = useReactFlow();
    const [msg, setMsg] = useState("");
    const [msgColor, setMsgColor] = useState("");

    const msgTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const disableTime = 3000;

    function ShowMsg(msg: string, color?: string) {
        setMsg(msg);
        setMsgColor(color || 'black');

        if (msgTimer.current) clearTimeout(msgTimer.current);
        if (!msg) return;

        msgTimer.current = setTimeout(() => { setMsg(""); }, disableTime);
    }

    function Save() {
        const nodes = getNodes();
        const edges = getEdges();

        if (nodes.length < 1) {
            ShowMsg("Nodes not present", "red");
            return;
        }

        let nodesWithEmptyTarget = 0;

        if (nodes.length > 1) {
            nodes.forEach(node => {
                const hasOutgoing = edges.some(edge => edge.source === node.id);
                if (!hasOutgoing) nodesWithEmptyTarget++;
            })
        }

        if (nodesWithEmptyTarget > 1) {
            ShowMsg("Unable to Save", "red");
            return;
        }

        localStorage.setItem("flow-nodes", JSON.stringify(nodes));
        localStorage.setItem("flow-edges", JSON.stringify(edges));
        ShowMsg("Saved Successfully", "green");
    }

    return (
        <div className="bg-gray-200 px-4 py-2 flex justify-end items-center">
            {msg && (
                <div
                    className={`
                        absolute left-1/2 transform -translate-x-1/2 
                        px-4 py-2 rounded shadow text-sm font-medium border 
                        bg-${msgColor}-200 text-${msgColor}-800 border-${msgColor}-800`}>
                    {msg}
                </div>
            )}

            <button
                onClick={Save}
                className="bg-white text-blue-900 border border-blue-900 px-6 py-1 rounded hover:bg-gray-100 mr-20"
            >
                Save Changes
            </button>
        </div>
    );
}

export default memo(PanelTop);