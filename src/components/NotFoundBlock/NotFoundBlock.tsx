import { FC } from "react";

import { Link } from "react-router-dom";

import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: FC = () => {
    return (
        <div className={styles.not_found}>
            <span>😕</span>
            <h1>Ничего не найдено</h1>
            <p>К сожалению такой страницы нет в нашем интернет-магазине</p>

            <Link to="/diliveri-let-s-pizza" className="button button--black">
              <span>Вернуться назад</span>
            </Link>
        </div>
    );
}

export default NotFoundBlock;