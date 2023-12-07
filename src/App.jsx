import './App.css'
import { useState } from 'react';
import TopBar from './components/TopBar'
import Canvas from './components/Canvas'

function App() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  return (
    <div className="app">
      <TopBar selectedTool={selectedTool} onToolChange={setSelectedTool} onActionChange={setSelectedAction} />
      <Canvas selectedTool={selectedTool} selectedAction={selectedAction} setSelectedAction={setSelectedAction} />
    </div>
  )
}

export default App
