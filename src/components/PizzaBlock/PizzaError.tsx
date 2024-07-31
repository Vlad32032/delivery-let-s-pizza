import { FC } from "react";

const PizzaError: FC = () => {
    return (
        <div className="pizza-block__error">
            <h2>Произошла ошибка <span>😕</span></h2>
            <p>
              К сожалению, не удалось получить пиццы<br />
              Попробуйте повторить попытку позже.
            </p>
        </div>
    );
}

export default PizzaError;