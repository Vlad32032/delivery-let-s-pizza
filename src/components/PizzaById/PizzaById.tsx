import { FC, useState } from "react";

import { dataTypesDough } from "../../assets/data/data";

import { Link } from "react-router-dom";

import { IPizza } from "../../redyx/slices/pizzasSlice";
import { useAppDispatch, useAppSelector } from "../../redyx/hooks/hooks";
import { addCartItem, countCart } from "../../redyx/slices/cartSlice";

import styles from "./PizzaById.module.scss" 

const PizzaById: FC<IPizza> = ({ id, title, description, imageUrl, prices, sizes, types }) => {
    const typesDough = dataTypesDough;

    const dispatch = useAppDispatch();

    const [activeSize, setActiveSize] = useState(sizes[0]);
    const [activePrice, setActivePrise] = useState(prices[0]);
    const [activeType, setActiveType] = useState(types[0]);
    const [activeImg, setActiveImg] = useState(1);

    const pizzaId = Number(`${activeType + 1}${activeSize}${id}`);

    const cartItem = useAppSelector((state) => state.cart.cartItems.find((obj) => obj.id === pizzaId));

    const addPizzaToCart = () => {
        const item = {
            id: pizzaId, 
            title,
            imageUrl: imageUrl[0],
            price: activePrice, 
            size: activeSize,
            type: typesDough[activeType],
            count: 1,
        };

        dispatch(addCartItem(item));
        dispatch(countCart());
    };

    const onSizeClick = (size: number, i: number) => {
        setActiveSize(size);
        setActivePrise(prices[i]);
        setActiveImg(i + 1)
    };

    return (
        <div className={styles.PizzaById}>
            <div className={styles.wrapperImg}>
                <img
                    className={styles[`img${activeImg}`]}
                    src={imageUrl[activeImg]}
                    alt="Pizza"
                />
            </div>

            <div className={styles.wrapperDescription}>
                <h2>{title}</h2>

                <p>{`${activeSize}см ${typesDough[activeType]} тесто`}</p>

                <p>{description}</p>

                <div className="pizza-block__selector">
                    <ul>
                        {types.map((type) => {
                            return (
                                <li
                                    key={typesDough[type]}
                                    onClick={() => setActiveType(type)}
                                    className={activeType === type ? 'active' : ''}
                                >
                                    {typesDough[type]}
                                </li>
                            );
                        })}
                    </ul>
                    <ul>
                        {sizes.map((size, i) => {
                            return (
                                <li
                                    key={size}
                                    onClick={() => onSizeClick(size, i)}
                                    className={activeSize === size ? 'active' : ''}
                                >
                                    {size} см.
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">{activePrice} ₽</div>
                    <button onClick={addPizzaToCart} className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        { cartItem && (
                            <i>{cartItem.count}</i>
                        )}
                    </button>
                </div>

                <Link to={'/'}>
                    <button className="button button--outline button--add">Вернуться назад</button>
                </Link>
            </div>
        </div>
    );
};

export default PizzaById;