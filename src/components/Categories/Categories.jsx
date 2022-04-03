import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter, fetchFilters } from "./FiltersAllSlice";
import { createSelector } from "@reduxjs/toolkit";
// components
import Spinner from "../Loaders/Spinner";
// classnames
import cn from "classnames";

const Categories = () => {
	// console.log("Categories");
	const { items, selectedFilter, loading } = useSelector(
		createSelector(
			(state) => state.filters.filters,
			(state) => state.filters.selectedFilter,
			(state) => state.filters.filtersLoadingStatus,
			(items, selectedFilter, loading) => ({
				items,
				selectedFilter,
				loading,
			})
		)
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchFilters());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const selectCategory = (index) => {
		dispatch(selectFilter(index));
	};

	if (loading === "loading") {
		return <Spinner />;
	}

	return (
		<div className="categories">
			<ul>
				<li
					className={cn(null, {
						active: selectedFilter === null,
					})}
					onClick={() => selectCategory(null)}
				>
					Все
				</li>
				{items && items.length > 0 ? (
					items.map((name, index) => {
						return (
							<li
								onClick={() => {
									selectCategory(index);
								}}
								className={cn(null, {
									active: selectedFilter === index,
								})}
								key={`${name}_${index}`}
							>
								{name}
							</li>
						);
					})
				) : (
					<h3>Категории пока нет..</h3>
				)}
			</ul>
		</div>
	);
};

export default Categories;
