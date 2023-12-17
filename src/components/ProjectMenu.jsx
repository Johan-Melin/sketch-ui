import styles from './ProjectMenu.module.css';
import data from '../rectData.js';
import { useState } from 'react';

const ProjectMenu = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (projectId) => {
    setSelectedProject(projectId);
  };

  const handleBackClick = () => {
    setSelectedProject(null);
  };

  return (
    <div>
      {!selectedProject ? (
        <div>
          <h2>Projects:</h2>
          <div>
            {data.map((project) => (
              <div className={styles.item} key={project.id} onClick={() => handleProjectClick(project.id)}>
                {project.name}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <button onClick={handleBackClick}>Back</button>
          <RectList projectId={selectedProject} />
        </>
      )}
    </div>
  );
};

const RectList = ({ projectId }) => {
  const project = data.find((item) => item.id === projectId);

  return (
    <div>
      <h3>{project.name}:</h3>
      <div>
        {project.rect.map((rect, index) => (
          <div className={styles.item} key={index}>{rect.name}</div>
        ))}
      </div>
    </div>
  );
};

export default ProjectMenu;
