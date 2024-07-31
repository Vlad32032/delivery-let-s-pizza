import { FC } from "react";

import { Link } from "react-router-dom";

import cartEmptyPng from "../assets/img/empty-cart.png";

const CartEmpty: FC = () => {
    return (
        <div className="cart cart--empty">
            <h2>Корзина пустая <span>😕</span></h2>
            <p>
              Вероятней всего, вы не заказывали ещё пиццу.<br />
              Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src={cartEmptyPng} alt="Empty cart" />
            <Link to="/diliveri-let-s-pizza" className="button button--black">
              <span>Вернуться назад</span>
            </Link>
        </div>
    );
}

export default CartEmpty;