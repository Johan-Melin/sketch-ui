import './App.css'
import { useState } from 'react';
import TopBar from './components/TopBar'
import Canvas from './components/Canvas'

function App() {
  const [selectedTool, setSelectedTool] = useState(null);

  const handleToolChange = (value) => {
    setSelectedTool(value);
  };

  return (
    <div className="app">
      <TopBar selectedTool={selectedTool} onToolChange={handleToolChange} />
      <Canvas selectedTool={selectedTool} />
    </div>
  )
}

export default App
