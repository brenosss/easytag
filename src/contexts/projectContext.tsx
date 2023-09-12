import { createContext } from 'react';

import type { Project } from 'src/types/projects';

interface IProjectContext {
  currentProject: Project;
}

// Initialized with an empty function
const ProjectContext = createContext<IProjectContext>({
  currentProject: {
    id: '',
    name: '',
    domain: '',
  },
});

export default ProjectContext;