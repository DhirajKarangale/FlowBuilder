import { memo, useMemo, useCallback } from "react";

import 'reactflow/dist/style.css';
import ReactFlow, {
    Background, Controls, useNodesState, useEdgesState, addEdge,
    type Connection, type Node, type Edge, useReactFlow
} from "reactflow";
import NodeMessage from "../nodes/NodeMessage";

import { useAppDispatch } from "../redux/hookStore";
import { setSelectedEdge, clearSelectedEdge } from "../redux/sliceSelectedEdge";
import { setSelectedNode, clearSelectedNode } from "../redux/sliceSelectedNode";


function PanelBuilder() {
    const dispatch = useAppDispatch();
    const { screenToFlowPosition } = useReactFlow();
    const [nodes, setNodes, onNodeChange] = useNodesState([]);
    const [edges, setEdges, onEdgeChange] = useEdgesState([]);

    const nodeTypes = useMemo(() => ({
        Message: NodeMessage,
    }), []);

    const onNodeClick = useCallback((_event: any, node: Node) => {
        dispatch(setSelectedNode({ node }));
    }, []);

    const onEdgeClick = useCallback((_event: any, edge: Edge) => {
        dispatch(setSelectedEdge({ edge }));
    }, []);

    const onPaneClick = () => {
        dispatch(clearSelectedNode());
        dispatch(clearSelectedEdge());
    };

    const onConnect = useCallback(
        (connection: Connection) => {
            setEdges((prevEdges) => {
                const filteredEdges = prevEdges.filter(
                    (edge) => edge.target !== connection.target
                );

                const newEdge = {
                    ...connection,
                    animated: true,
                    id: `${new Date()}`,
                };

                return addEdge(newEdge, filteredEdges);
            });
        },
        [setEdges]
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();

        const type = event.dataTransfer.getData('application/reactflow');
        if (!type) return;

        const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
        const id = `${new Date().getTime()}`;

        const newNode: Node = {
            id,
            type,
            position,
            data: { id, message: '' },
        };

        setNodes((prev) => [...prev, newNode]);
    }, [screenToFlowPosition, setNodes]);

    return (
        <div className="flex-1 p-4 overflow-auto">
            <ReactFlow
                // fitView
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodeChange}
                onEdgesChange={onEdgeChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                onEdgeClick={onEdgeClick}
                onDrop={onDrop}
                onDragOver={onDragOver}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default memo(PanelBuilder);