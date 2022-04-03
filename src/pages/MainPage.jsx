import { Categories, SortPoppup, Pizzes } from "../components";

const MainPage = () => {
	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<SortPoppup />
			</div>
			<Pizzes />
		</div>
	);
};

export default MainPage;
