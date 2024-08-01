import { FC, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { fetchPizzaById, selectPizzasState } from "../redux/slices/pizzasSlice";
import PizzaById from "../components/PizzaById/PizzaById";

const FullPizza: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { id } = useParams();
    const url = `https://66913f9226c2a69f6e8f1533.mockapi.io/pizzas/${id}`;

    const { pizzaById, status } = useAppSelector(selectPizzasState);


    useEffect(() => {
        dispatch(fetchPizzaById(url));
    }, []);

    if (status === 'error') {
        navigate('/error');
    };

    return (
        <div>
            {status === 'loading' && (
                <div>Loading...</div>
            )}
            {pizzaById && <PizzaById {...pizzaById}/>}
        </div>
    );
} 

export default FullPizza;