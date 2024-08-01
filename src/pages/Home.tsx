import { useEffect, useRef, useState} from "react";

import { dataSortOptionsList } from "../assets/data/data";

import { useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { selectFilterState, setAllSearchParams } from "../redux/slices/filterSlice";
import { fetchPizzas, fetchPizzasLength, selectPizzasState } from "../redux/slices/pizzasSlice";

import qs from 'qs';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import PizzaSkeletonLoader from "../components/PizzaBlock/PizzaSkeletonLoader";
import Pagination from "../components/Pagination/Pagination";
import PizzaError from "../components/PizzaBlock/PizzaError";

function Home() {
	const sortOptionsList = dataSortOptionsList;

	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const { pizzasListLength, pizzasList, status } = useAppSelector(selectPizzasState);
	const { activeSortOption, categoriesIndex, pageIndex, searchValue} = useAppSelector(selectFilterState);

	const [ pizzazPages, setPizzasPages ] = useState(1); 
	const pizzasLimit = 8;



	const createUrl = (withLimit: boolean) => {
		const search = searchValue ? `&title=${searchValue}` : '';
		const category = categoriesIndex > 0 ? `&category=${categoriesIndex}` : '';
		const sortBy = `&sortBy=${activeSortOption.sortProperty.replace('-', '')}`;
		const order = activeSortOption.sortProperty.includes('-') ? '&order=asc' : '&order=desc';
		const page = `&page=${pageIndex + 1}`;
		const limit = `&limit=${pizzasLimit}`;

		return `https://66913f9226c2a69f6e8f1533.mockapi.io/pizzas?${category}${search}${sortBy}${order}${withLimit ? page + limit : ''}`;
	};


	// ( Открываем уникальную ссылку )
	// На первом рендере проверяем наличие Url-параметров, парсим и сохраняем их в redux,
	// обновление state в redux вызовет запрос на сервер с параметрами из Url
	useEffect(() => {
		if (location.search) {

			// qs библиотека с методами для парсинга а метод .substring(1) просто уберает '?' из Url-параметров
			const paramsFromUrl = qs.parse(location.search.substring(1));
			const sortObj = sortOptionsList.find((obj) => obj.sortProperty === paramsFromUrl.activeSortOption);

			if (!sortObj || paramsFromUrl.searchValue === undefined) {
				isSearch.current = true;
				navigate('/error');
				return
			};

			const searchParams = {
				searchValue: `${paramsFromUrl.searchValue}`,
				categoriesIndex: Number(paramsFromUrl.categoriesIndex),
				pageIndex: Number(paramsFromUrl.pageIndex),
				activeSortOption: sortObj
			};
			
			dispatch(setAllSearchParams({...searchParams}));

			// на первом рендере isSearch станет true и запрос на сервер не произойдет,
			// dispatch обновит state и запрос будет выполнен на втором рендере
			isSearch.current = true;
		}
	}, []);

	// ( Формируем уникальную ссылку )
	// Пропускаем первый рендер(isMounted меняем на true),
	// со второго рендера все параметры поиска из state в redyx превращаем в строку и вшиваем в Url-параметры
	useEffect(() => {
		if (isMounted.current) {
			// qs библиотека с методами для парсинга
			const querySrting = qs.stringify({
				activeSortOption: activeSortOption.sortProperty, 
				categoriesIndex, 
				pageIndex, 
				searchValue
			});

			// знак '?' для обозначения передавемых параметров
			navigate(`?${querySrting}`);
		}

		isMounted.current = true;
	}, [activeSortOption, categoriesIndex, pageIndex, searchValue]);

	// ( Делаем запрос на сервер )
	//  добавляем debounce для небольшой задержки перед отправкой
	useEffect(() => {
		// isSearch по умолчанию будет false
		if (!isSearch.current) {
			// запрос на сервер feachPizzas() отработает только если компонет не будет обновлен в течении задавнно времени в setTimeout()
			// если компонент будет обновлен раньше то сработат clearTimeout()
			const debounceTimeout1 = setTimeout(() => dispatch(fetchPizzasLength(createUrl(false))), 150);
			const debounceTimeout2 = setTimeout(() => dispatch(fetchPizzas(createUrl(true))), 300);

			return () => {
				clearTimeout(debounceTimeout1);
				clearTimeout(debounceTimeout2);
			};	
		}

		// это может отработать только один раз, если была уникальная ссылка в Url-адресе и isSearch стал true,
		// тогда на первом рендере в state в redux будут сохранены параметры поиска,
		// на втором рендере isSearch станет false и запрос с выбранными параметрами произойдет
		isSearch.current = false;
	}, [activeSortOption, categoriesIndex, pageIndex, searchValue]);

	useEffect(() => {
		setPizzasPages(Math.ceil(pizzasListLength / pizzasLimit));
	}, [pizzasListLength])

	useEffect(() => {	
		window.scrollTo(0, 0);
	}, [pageIndex, searchValue]);



	const renderSkeletons = [...new Array(pizzasLimit)].map((_, index) => (
		<PizzaSkeletonLoader className="pizza-block" key={index} />
	));

	const renderPizzas = pizzasList
		.map((pizza) => (
			<PizzaBlock {...pizza} key={pizza.title} />
		)
	);

    return (
        <div className="container">
            <div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{ status === 'error' ? (
				<PizzaError />
			) : (
				<div className="content__items">
					{ status === 'loading' ? renderSkeletons : renderPizzas }
				</div>
			)}
			
			<Pagination length={pizzazPages}/>
        </div>
    );
}

export default Home;