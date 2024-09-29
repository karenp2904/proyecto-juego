import React from 'react';
import styles from '../styles/StatBox.module.css';
import Combatiente from '../interfaces/Combatiente';

type StatBoxProps = Pick<Combatiente, 'attack' | 'defense' | 'health' | 'maxHealth'>;

const StatBox: React.FC<StatBoxProps> = ({ attack, defense, health, maxHealth }) => {
  return (
    <div className={styles.statBox}>
      <div className={styles.characterInfo}>
        
      </div>
      <div className={styles.stat}>
        <span className={styles.statLabel}>ATK:</span>
        <span className={styles.statValue}>{attack}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statLabel}>DEF:</span>
        <span className={styles.statValue}>{defense}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statLabel}>HP:</span>
        <span className={styles.statValue}>{health}/{maxHealth}</span>
      </div>
    </div>
  );
};

export default StatBox;