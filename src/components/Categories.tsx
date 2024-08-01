import { FC, memo } from "react";

import { dataCategoriesNames } from "../assets/data/data";

import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { selectCategoriesIndex, setCategoriesIndex, setPageIndex } from "../redux/slices/filterSlice";

const Categories: FC = memo(() => {
	const categoriesNames = dataCategoriesNames;

	const dispatch = useAppDispatch();

	const categoriesIndex = useAppSelector(selectCategoriesIndex);

	const chooseCategory = (index: number) => {
		dispatch(setCategoriesIndex(index));
		dispatch(setPageIndex(0))
	};

	return (
		<div className="categories">
			<ul>
				{categoriesNames.map((categoryName, index) => {
					return (
						<li 
							key={categoryName}
							onClick={() => chooseCategory(index)}
							className={ categoriesIndex === index ? 'active' : ''}
						>
							{categoryName}
						</li>
					);
				})}
			</ul>
		</div>
	);
})

export default Categories;