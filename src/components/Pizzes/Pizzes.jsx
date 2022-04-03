import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPizzes, filteredPizzes } from "./PizzesSlice";
// components
import PizzaBlock from "../PizzaBlock/PizzaBlock";
import Skeleton, { skelets } from "../Loaders/Skeleton";

const Pizzes = () => {
	const { pizzes, selectedPoppupFilter, loading } = useSelector(filteredPizzes);
	const cartItems = useSelector(({ cart }) => cart.cartItems);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPizzes(selectedPoppupFilter));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedPoppupFilter]);

	if (loading === "loading") return skelets.map((el, index) => <Skeleton key={`${el}_${index}`} />);

	return (
		<>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{loading === "idle" && pizzes.length > 0 ? (
					pizzes.map((pizza) => {
						return (
							<PizzaBlock
								{...pizza}
								key={pizza.id}
								dispatch={dispatch}
								addedCount={cartItems[pizza.id]?.items.length}
							/>
						);
					})
				) : (
					<h3>Пицц пока нет...</h3>
				)}
			</div>
		</>
	);
};

export default Pizzes;
