import { configureStore } from "@reduxjs/toolkit";
import sliceSelectedNode from './sliceSelectedNode';
import sliceSelectedEdge from './sliceSelectedEdge';

export const store = configureStore({
    reducer: {
        selectedNode: sliceSelectedNode,
        selectedEdge: sliceSelectedEdge
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;