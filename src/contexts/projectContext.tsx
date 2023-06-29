import { createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import type { Project } from 'src/types/projects';

interface IProjectContext {
  currentProject: Project;
  setCurrentProject: Dispatch<SetStateAction<Project>>;
}

// Initialized with an empty function
const ProjectContext = createContext<IProjectContext>({
  currentProject: {
    id: '',
    name: '',
    domain: '',
  },
  setCurrentProject: () => {},
});

export default ProjectContext;