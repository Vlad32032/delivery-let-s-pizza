import { FC, memo, useState } from "react";

import { dataTypesDough } from "../../assets/data/data";

import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { addCartItem, countCart } from "../../redux/slices/cartSlice";
import { IPizza } from "../../redux/slices/pizzasSlice";

const PizzaBlock: FC<IPizza> = memo(({ id, title, imageUrl, prices, sizes, types }) => {
    const typesDough = dataTypesDough;

    const dispatch = useAppDispatch();

    const [activeSize, setActiveSize] = useState(sizes[0]);
    const [activePrice, setActivePrise] = useState(prices[0]);
    const [activeType, setActiveType] = useState(types[0]);

    const pizzaId = Number(`${activeType + 1}${activeSize}${id}`);

    const cartItem = useAppSelector((state) => state.cart.cartItems.find((obj) => obj.id === pizzaId));

    const addPizzaToCart = () => {
        const item = {
            id: pizzaId, 
            title,
            imageUrl: imageUrl[0],
            price: activePrice + (activeType * 100), 
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
    };

    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <Link to={`/pizza/${id}`}>
                    <img
                        className="pizza-block__image"
                        src={imageUrl[0]}
                        alt="Pizza"
                    />
                    <h4 className="pizza-block__title">{title}</h4>
                </Link>
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
                    <div className="pizza-block__price">{activePrice + (activeType * 100)} ₽</div>
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
            </div>
        </div>
    );
});

export default PizzaBlock;