import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPoppupFilters, selectPoppupFilter } from "../Categories/FiltersAllSlice";
import { createSelector } from "@reduxjs/toolkit";
// classnames
import cn from "classnames";
// components
import Spinner from "../Loaders/Spinner";

const SortPoppup = () => {
	// console.log("SortPoppup");

	const { sortItems, selectedPoppupFilter, loading } = useSelector(
		createSelector(
			(state) => state.filters.poppup_filters,
			(state) => state.filters.selectedPoppupFilter,
			(state) => state.filters.poppupFiltersLoadingStatus,
			(sortItems, selectedPoppupFilter, loading) => ({
				sortItems,
				selectedPoppupFilter,
				loading,
			})
		)
	);

	const dispatch = useDispatch();

	const [visible, setVisible] = useState(false); // local state
	const sortRef = useRef();

	const showPopup = () => {
		setVisible(!visible);
	};

	const handleOutsideClick = (event) => {
		const path = event.path || (event.composedPath && event.composedPath());
		if (!path.includes(sortRef.current)) {
			setVisible(false);
		}
	};

	useEffect(() => {
		dispatch(fetchPoppupFilters());

		document.body.addEventListener("click", handleOutsideClick);

		return () => {
			document.body.removeEventListener("click", handleOutsideClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const selectSort = (name) => {
		dispatch(selectPoppupFilter(name));
		setVisible(false);
	};

	if (loading === "loading") {
		return <Spinner />;
	}

	return (
		<div className="sort" ref={sortRef}>
			<div className="sort__label">
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					style={{
						transform: visible && "rotate(180deg)",
						transition: "transform .15s ease-out",
					}}
				>
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={showPopup}>{selectedPoppupFilter}</span>
			</div>
			{visible && (
				<div className="sort__popup">
					<ul>
						{sortItems && sortItems.length > 0 ? (
							sortItems.map((name, index) => {
								return (
									<li
										key={`${name}_${index}`}
										className={cn(null, {
											active: name === selectedPoppupFilter,
										})}
										onClick={() => {
											selectSort(name);
										}}
									>
										{name}
									</li>
								);
							})
						) : (
							<li>Пока пусто...</li>
						)}
					</ul>
				</div>
			)}
		</div>
	);
};
export default SortPoppup;
