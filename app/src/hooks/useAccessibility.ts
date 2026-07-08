import { useState, useEffect } from 'react';

export function useAccessibility() {
  const [isEasyRead, setIsEasyRead] = useState(() => {
    const saved = localStorage.getItem('accessibility-easy-read');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('accessibility-easy-read', String(isEasyRead));
    if (isEasyRead) {
      document.documentElement.classList.add('easy-read');
    } else {
      document.documentElement.classList.remove('easy-read');
    }
  }, [isEasyRead]);

  const toggleEasyRead = () => setIsEasyRead((prev) => !prev);

  return { isEasyRead, toggleEasyRead };
}
