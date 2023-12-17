import './App.css'
import { useState } from 'react';
import TopBar from './components/TopBar'
import Canvas from './components/Canvas'
import ProjectMenu from './components/ProjectMenu'

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  return (
    <div className="app">
      {!selectedScreen
      ? <ProjectMenu selectedProject={selectedProject} setSelectedProject={setSelectedProject} setSelectedScreen={setSelectedScreen} />
      : <>
        <TopBar selectedTool={selectedTool} onToolChange={setSelectedTool} onActionChange={setSelectedAction} />
        <Canvas selectedTool={selectedTool} selectedAction={selectedAction} setSelectedAction={setSelectedAction} setSelectedScreen={setSelectedScreen} />
      </>
      }
    </div>
  )
}

export default App
