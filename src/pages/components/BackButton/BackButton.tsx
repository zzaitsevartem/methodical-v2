import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BackButton.module.scss';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

interface BackButtonProps {
  hasUnsavedProgress?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({ hasUnsavedProgress = false }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (hasUnsavedProgress) {
      e.preventDefault();
      Swal.fire({
        title: 'Прогресс не сохранён',
        text: 'Вы не завершили тест. Если уйдёте, прогресс будет потерян. Продолжить?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#F59E0B',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Да, уйти',
        cancelButtonText: 'Остаться',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/';
        }
      });
    }
  };

  return (
    <NavLink 
      to="/" 
      className={`${styles.backButton} ${!isVisible ? styles.hidden : ''}`} 
      onClick={handleClick}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        ← На главную
      </motion.div>
    </NavLink>
  );
};

export default BackButton;