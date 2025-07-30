import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Node } from 'reactflow';

export interface SelectedNode {
    node: Node | null
}

export const getInitialSelectedNode = (): SelectedNode => ({
    node: null
});

const initialState = getInitialSelectedNode();

const sliceSelectedNode = createSlice({
    name: 'selectedNode',
    initialState,
    reducers: {
        setSelectedNode(_state, action: PayloadAction<SelectedNode>) {
            return action.payload;
        },
        clearSelectedNode() {
            return getInitialSelectedNode();
        },
    },
});

export const { setSelectedNode, clearSelectedNode } = sliceSelectedNode.actions;
export default sliceSelectedNode.reducer;