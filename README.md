# 💬 FlowBuilder

A visual flow builder built with **React Flow**, **Tailwind CSS**, **Redux**, and **TypeScript**. Create, customize, and manage message flows with a modern drag-and-drop interface.

🚀 **Live Demo**: [flow-builder-tau.vercel.app](https://flow-builder-tau.vercel.app/)  
📦 **GitHub Repo**: [github.com/DhirajKarangale/FlowBuilder](https://github.com/DhirajKarangale/FlowBuilder)

---

## 📸 Preview

![FlowBuilder Screenshot](https://raw.githubusercontent.com/DhirajKarangale/FlowBuilder/main/public/FlowBuilderDemo.png)

---

## ✨ Features

- 🔘 **Drag-and-drop** interface for building message flows
- 💬 **MessageNode**: Add, edit, and connect message blocks
- ➕ **Node Palette**: Click or drag nodes from sidebar to builder area
- 📝 **Editable Node Content**: Select a node to edit its message in the side panel
- 🔗 **Connections**: One **source handle** per node (outgoing), multiple **target handles** (incoming)
- ⌨️ **Keyboard Shortcuts**:
  - `Delete`: Remove selected node or edge
  - `Ctrl/Cmd + S`: Save flow to local storage
- 💾 **Auto-Persisted State**: Load saved flows on refresh
- ⚠️ **Validation**: Error shown when more than one node has an empty target connection

---

## 🛠️ Tech Stack

- **React + TypeScript**
- **React Flow**
- **Redux Toolkit**
- **Tailwind CSS**
- **Vite**

---

## 📦 Installation & Usage

```bash
# 1. Clone the repo
git clone https://github.com/DhirajKarangale/FlowBuilder.git

# 2. Navigate to the project folder
cd FlowBuilder

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
