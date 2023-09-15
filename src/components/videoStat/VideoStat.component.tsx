import React, { useEffect } from 'react';
import styles from './VideoStat.module.scss';

import { FaComment } from 'react-icons/fa';
import { AiFillLike, AiFillEye } from 'react-icons/ai';
type Props = {
  type: 'Views' | 'Likes' | 'Comments';
  amount: number;
};

const VideoStat = (props: Props) => {
  const getIcon = () => {
    switch (props.type) {
      case 'Views':
        return <AiFillEye className={styles.icon} />;
      case 'Likes':
        return <AiFillLike className={styles.icon} />;
      case 'Comments':
        return <FaComment className={styles.icon} />;
    }
  };
  return (
    <div className={styles.container}>
      <p>{props.amount}</p> {getIcon()}
    </div>
  );
};

export default VideoStat;
