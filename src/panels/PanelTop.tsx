import { memo } from "react";

function PanelTop() {
    return (
        <div className="bg-gray-200 px-4 py-2 flex justify-end items-center">
            <button className="bg-white text-blue-900 border border-blue-900 px-6 py-1 rounded hover:bg-gray-100 mr-20">
                Save Changes
            </button>
        </div>
    );
}

export default memo(PanelTop);