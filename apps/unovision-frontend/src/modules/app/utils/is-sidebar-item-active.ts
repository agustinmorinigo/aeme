import { matchPath } from 'react-router';

const isSidebarItemActive = (itemPath: string, currentPathname: string): boolean => {
  const match = matchPath({ path: itemPath }, currentPathname);
  return !!match;
};

export default isSidebarItemActive;
