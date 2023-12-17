import styles from './ProjectMenu.module.css';
import data from '../rectData.js';
import PropTypes from 'prop-types';

const ProjectMenu = ({selectedProject, setSelectedProject, setSelectedScreen}) => {

  const handleProjectClick = (projectId) => {
    setSelectedProject(projectId);
  };

  const handleScreenClick = () => {
    setSelectedScreen(1);
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
          <RectList projectId={selectedProject} handleScreenClick={handleScreenClick} />
        </>
      )}
    </div>
  );
};

ProjectMenu.propTypes = {
  selectedProject: PropTypes.string,
  setSelectedProject: PropTypes.func,
  setSelectedScreen: PropTypes.func,
};

const RectList = ({ projectId, handleScreenClick }) => {
  const project = data.find((item) => item.id === projectId);

  return (
    <div>
      <h3>{project.name}:</h3>
      <div>
        {project.rect.map((rect, index) => (
          <div className={styles.item} key={index} onClick={handleScreenClick}>{rect.name}</div>
        ))}
      </div>
    </div>
  );
};

export default ProjectMenu;


RectList.propTypes = {
  projectId: PropTypes.string,
  handleScreenClick: PropTypes.func,
};
