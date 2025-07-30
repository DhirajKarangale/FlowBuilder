import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Edge } from 'reactflow';

export interface SelectedNode {
    edge: Edge | null
}

export const getInitialSelectedNode = (): SelectedNode => ({
    edge: null
});

const initialState = getInitialSelectedNode();

const sliceSelectedEdge = createSlice({
    name: 'selectedEdge',
    initialState,
    reducers: {
        setSelectedEdge(_state, action: PayloadAction<SelectedNode>) {
            return action.payload;
        },
        clearSelectedEdge() {
            return getInitialSelectedNode();
        },
    },
});

export const { setSelectedEdge, clearSelectedEdge } = sliceSelectedEdge.actions;
export default sliceSelectedEdge.reducer;