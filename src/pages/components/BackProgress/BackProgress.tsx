import React from 'react';
import styles from './BackProgress.module.scss';

interface BackProgressProps {
  onReset: () => void;
  testPassed: boolean;  
}

const BackProgress: React.FC<BackProgressProps> = ({ onReset, testPassed }) => {
  return (
    <button
      onClick={onReset}
      className={styles.backProgress}
      disabled={!testPassed}  
    >
      Сбросить прогресс темы
    </button>
  );
};

export default BackProgress;