import { memo, useMemo, useCallback } from "react";

import 'reactflow/dist/style.css';
import ReactFlow, { Background, Controls, useNodesState, useEdgesState, addEdge, type Connection, type Node, type Edge } from "reactflow";
import NodeMessage from "../nodes/NodeMessage";

import { useAppDispatch } from "../redux/hookStore";
import { setSelectedEdge, clearSelectedEdge } from "../redux/sliceSelectedEdge";
import { setSelectedNode, clearSelectedNode } from "../redux/sliceSelectedNode";

function PanelBuilder() {
    const dispatch = useAppDispatch();

    const nodeTypes = useMemo(() => ({
        Message: NodeMessage,
    }), []);

    const [nodes, _setNodes, onNodeChange] = useNodesState([]);
    const [edges, setEdges, onEdgeChange] = useEdgesState([]);

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

    return (
        <div className="flex-1 p-4 overflow-auto">
            <ReactFlow
                fitView
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodeChange}
                onEdgesChange={onEdgeChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                onEdgeClick={onEdgeClick}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default memo(PanelBuilder);