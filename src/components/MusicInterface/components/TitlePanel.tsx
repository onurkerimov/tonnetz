import React from 'react';
import styles from '../MusicInterface.module.css';

const TitlePanel: React.FC = () => {
  return (
    <div className={styles.titlePanel}>
      <h1 className={styles.title}>Tonnetz Playground</h1>
      <p className={styles.subtitle}>Interactive Music Theory Visualization</p>
    </div>
  );
};

export default TitlePanel; 