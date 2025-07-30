import { memo, useEffect } from "react";

import { useReactFlow } from "reactflow";
import { clearSelectedEdge } from "../redux/sliceSelectedEdge";
import { clearSelectedNode } from "../redux/sliceSelectedNode";
import { useAppSelector, useAppDispatch } from "../redux/hookStore";

import InfoNodes from "../info/InfoNodes";
import InfoMessage from "../info/InfoMessage";

function PanelNodes() {
    const dispatch = useAppDispatch();
    const { setNodes, setEdges } = useReactFlow();
    const selectedNode = useAppSelector(state => state.selectedNode);
    const selectedEdge = useAppSelector(state => state.selectedEdge);

    function DeleteNode() {
        if (!selectedNode || !selectedNode.node) return;
        setNodes((pre) => pre.filter((node) => node.id !== selectedNode.node?.id));
        dispatch(clearSelectedNode());
    }

    function DeleteEdge() {
        if (!selectedEdge || !selectedEdge.edge) return;
        setEdges((pre) => pre.filter((edge) => edge.id !== selectedEdge.edge?.id));
        dispatch(clearSelectedEdge());
    }

    function KeyDown(event: KeyboardEvent) {
        if (event.key === "Delete") {
            DeleteNode();
            DeleteEdge();
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", KeyDown);
        return () => { window.removeEventListener("keydown", KeyDown); };
    }, [selectedNode, selectedEdge]);


    if (!selectedNode || !selectedNode.node) return <InfoNodes />;
    if (selectedNode.node.type === 'Message') return <InfoMessage />;

    return <InfoNodes />;
}

export default memo(PanelNodes);