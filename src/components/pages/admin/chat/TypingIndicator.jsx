import React from 'react';
import styles from './TypingIndicator.module.css';

function TypingIndicator() {
  return (
    <div className={styles.typingIndicator}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default TypingIndicator;