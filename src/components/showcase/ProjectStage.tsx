import type { Project } from '../../data/projects';
import { WebBrowserModel } from './models/WebBrowserModel';
import { PhoneModel } from './models/PhoneModel';
import { KioskModel } from './models/KioskModel';
import { AutoShedModel } from './models/AutoShedModel';
import { KeypadLockModel } from './models/KeypadLockModel';

interface ProjectStageProps {
  project: Project;
  isActive: boolean;
  isLight: boolean;
  onClick?: () => void;
}

export function ProjectStage({ project, isActive, isLight, onClick }: ProjectStageProps) {
  if (project.slug === 'auto-shed') {
    return <AutoShedModel project={project} isActive={isActive} isLight={isLight} onClick={onClick} />;
  }

  if (project.slug === 'digital-keypad-lock') {
    return <KeypadLockModel project={project} isActive={isActive} isLight={isLight} onClick={onClick} />;
  }

  if (project.kind === 'mobile') {
    return <PhoneModel project={project} isActive={isActive} isLight={isLight} onClick={onClick} />;
  }

  if (project.kind === 'kiosk') {
    return <KioskModel project={project} isActive={isActive} isLight={isLight} onClick={onClick} />;
  }

  // Default web / dashboard
  return <WebBrowserModel project={project} isActive={isActive} isLight={isLight} onClick={onClick} />;
}
