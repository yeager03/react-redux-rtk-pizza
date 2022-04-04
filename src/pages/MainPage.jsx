import { Categories, SortPoppup, Pizzas } from "../components";

const MainPage = () => {
	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<SortPoppup />
			</div>
			<Pizzas />
		</div>
	);
};

export default MainPage;
