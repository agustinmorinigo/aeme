import { useEffect, useState } from 'react';

const STORAGE_KEY = 'sidebar-open';

const getInitialState = (): boolean => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved !== null) return saved === 'true';
  return true;
};

export default function useSidebarVisibility() {
  const [isOpen, setIsOpen] = useState<boolean>(getInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isOpen));

    return () => {
      localStorage.removeItem(STORAGE_KEY);
    };
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  return { isOpen, toggleSidebar };
}
