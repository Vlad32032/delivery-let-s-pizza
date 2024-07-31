import { FC, memo, useEffect, useRef, useState } from "react";

import { dataSortOptionsList } from "../assets/data/data";

import { useAppDispatch, useAppSelector } from "../redyx/hooks/hooks";
import { ISortOption, selectActiveSortOption, setActiveSortOption, setPageIndex } from "../redyx/slices/filterSlice";

const Sort: FC = memo(() => {
	const sortOptionsList = dataSortOptionsList;

	const dispatch = useAppDispatch();
	
	const activeSortOption = useAppSelector(selectActiveSortOption);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const sortRef = useRef<HTMLDivElement>(null);



	const selectOption = (option: ISortOption) => {
		dispatch(setActiveSortOption(option));
		dispatch(setPageIndex(0));
		setIsPopupOpen(false);
	};


	// ( Закрываем popup по клику вне элемента )
	useEffect(() => {
		const handleClickOutside = (event: globalThis.MouseEvent ) => {
			if (sortRef.current && !sortRef.current.contains(event.target as Node)) { 
				setIsPopupOpen(false);
			}		
		};

		document.body.addEventListener('click', handleClickOutside);

		return () => document.body.removeEventListener('click', handleClickOutside);
	},[]);

	return (
		<div className="sortProperty" ref={sortRef}>
			<div className="sort__label" onClick={() => setIsPopupOpen(!isPopupOpen)}>
				<svg
					className={isPopupOpen ? 'active' : ''}
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Сортировка по:</b>
				<span>{activeSortOption.name}</span>
			</div>
			{isPopupOpen && (
				<div className="sort__popup">
					<ul>
						{sortOptionsList.map((option: ISortOption) => {
							return (
								<li
									key={option.name}
									onClick={() => selectOption(option)}
									className={activeSortOption.name === option.name ? 'active' : ''}
								>
									{option.name}
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
});

export default Sort;