import './App.css'
import { useState } from 'react';
import TopBar from './components/TopBar'
import Canvas from './components/Canvas'

function App() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  const handleToolChange = (value) => {
    setSelectedTool(value);
  };

  const handleActionChange = (value) => {
    setSelectedAction(value);
  };

  return (
    <div className="app">
      <TopBar selectedTool={selectedTool} onToolChange={handleToolChange} onActionChange={handleActionChange} />
      <Canvas selectedTool={selectedTool} selectedAction={selectedAction} />
    </div>
  )
}

export default App
