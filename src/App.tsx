import PanelTop from "./panels/PanelTop";
import PanelNodes from "./panels/PanelNodes";
import PanelBuilder from "./panels/PanelBuilder";

import { store } from './redux/store';
import { Provider } from 'react-redux';
import { ReactFlowProvider } from "reactflow";

function App() {
  return (
    <Provider store={store}>
      <ReactFlowProvider>

        <div className="h-screen w-screen flex flex-col overflow-hidden">
          <PanelTop />
          <div className="flex flex-1">
            <PanelBuilder />
            <div className="w-[1px] bg-gray-300" />
            <PanelNodes />
          </div>
        </div>

      </ReactFlowProvider>
    </Provider>
  );
}

export default App;