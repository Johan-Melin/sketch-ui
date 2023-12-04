import './App.css'
import { useState } from 'react';
import TopBar from './components/TopBar'
import Canvas from './components/Canvas'

function App() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [showGrid, setShowGrid] = useState(false);

  const handleToolChange = (value) => {
    setSelectedTool(value);
  };

  const handleShowGridChange = () => {
    setShowGrid(!showGrid);
  };

  const handleTouchStart = (event) => {
    event.preventDefault();
  };

  return (
    <div className="app" onTouchStart={handleTouchStart}>
      <TopBar onToolChange={handleToolChange} onShowGridChange={handleShowGridChange} />
      <Canvas selectedTool={selectedTool} showGrid={showGrid} />
    </div>
  )
}

export default App
