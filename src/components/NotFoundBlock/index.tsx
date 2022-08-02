"use strict";

import styles from './NotFoundBlock.module.scss';
import React from 'react';

const NotFoundBlock: React.FC = () => {
    return (
        <h1 className={styles.root}>
            <span>☹ ☹ ☹</span> <br/>
            Ничего не найдено
        </h1>
    )
}

export default NotFoundBlock;