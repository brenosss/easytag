import { useState } from 'react';
import ProjectContext from 'src/contexts/projectContext';

const ProjectProvider = ({ children }) => {
    const [currentProject, setCurrentProject] = useState(null);

    return (
        <ProjectContext.Provider value={{ currentProject, setCurrentProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectProvider;
