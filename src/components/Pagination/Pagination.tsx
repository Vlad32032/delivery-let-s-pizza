import { FC } from "react";

import { useAppDispatch, useAppSelector } from "../../redyx/hooks/hooks";
import { setPageIndex } from "../../redyx/slices/filterSlice";

import styles from "./Pagination.module.scss";

interface IPaginationProps {
    length: number
};

const Pagination: FC<IPaginationProps> = ({ length }) => {
    const dispatch = useAppDispatch();

    const pageIndex = useAppSelector((state) => state.filter.pageIndex);

    const paginationLenght = length;



    const nextPage = () => dispatch(setPageIndex(pageIndex === (paginationLenght - 1) ? 0 : pageIndex + 1));
    const thisPage = (index: number) => dispatch(setPageIndex(index));
    const previousPage = () => dispatch(setPageIndex(pageIndex === 0 ? (paginationLenght - 1) : pageIndex - 1));

    return (
        <div className={styles.pagination}>
            <ul>
                <li onClick={previousPage}>{'<'}</li>

                {[...new Array(paginationLenght)].map((_, index) => (
                    <li
                        key={index}
                        className={pageIndex === index ? styles.active : ''}
                        onClick={() => thisPage(index)}
                    >
                        {index + 1}
                    </li>
                ))}

                <li onClick={nextPage}>{'>'}</li>
            </ul>
        </div>
    );
}

export default Pagination;