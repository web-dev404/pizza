"use strict";

import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search.svg';
import closeIcon from '../../assets/img/close.svg';
import {useCallback, useRef, useState} from "react";
import debounce from "lodash.debounce";
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/slices/filterSlice";
import React from 'react';

const Search: React.FC = () => {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('');

        inputRef.current?.focus();
    }

    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str))
        }, 250), []
    )

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        updateSearchValue(e.target.value)
    }

    return (
        <div className={styles.root}>
            <img src={searchIcon} alt=""/>
            <input ref={inputRef} value={value} onChange={(e) => onChangeInput(e)} className={styles.input}
                   placeholder={'Поиск пиццы...'} type="text"/>
            {value && <img onClick={onClickClear} className={styles.close} src={closeIcon} alt=""/>}
        </div>
    )
}

export default Search;