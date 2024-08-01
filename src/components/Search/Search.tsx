import { FC, useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redyx/hooks/hooks";
import { setPageIndex, setSearchValue } from "../../redyx/slices/filterSlice";

import styles from "./Search.module.scss"

const Search: FC = () => {
    const dispatch = useAppDispatch();

    const searchValue = useAppSelector((state) => state.filter.searchValue);

    const [currentValue, setCurrentValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const isMounted = useRef(false);



    const search = () => {
        inputRef.current?.focus();
        
        dispatch(setSearchValue(currentValue));
        dispatch(setPageIndex(0));
    };

    const close = () => {
        inputRef.current?.focus();

        setCurrentValue('');
    };



    useEffect(() => {
        if (isMounted.current) {
            if (currentValue === '') search();
            
            return
        }

        isMounted.current = true;
    }, [currentValue]);

    useEffect(() => {
        setCurrentValue(searchValue);
    }, [searchValue]);

    return (
        <div className={styles.search} >
            <svg className={styles.search__svgSearch} xmlns="http://www.w3.org/2000/svg" id="Glyph" version="1.1" viewBox="0 0 32 32" >
                <path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/>
            </svg>

            <input
                ref={inputRef}
                type="text"
                placeholder="Поиск..."
                value={currentValue}
                onChange={(event) => setCurrentValue(event.target.value)}
            />

            {currentValue && (
                <>
                    <button onClick={search}>Поиск</button>

                    <svg onClick={close} className={styles.search__svgClose} xmlns="http://www.w3.org/2000/svg" id="Layer_1" version="1.1"  viewBox="0 0 512 512">
                        <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
                    </svg>
                </>
            )}
        </div>
    );
}

export default Search;