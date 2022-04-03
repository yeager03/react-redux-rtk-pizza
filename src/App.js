import "./scss/app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// components
import { Header } from "./components";
// pages
import MainPage from "./pages/MainPage";
import CartPage from "./pages/CartPage";

function App() {
	return (
		<Router>
			<div className="wrapper">
				<Header />
				<main>
					<div className="content">
						<Routes>
							<Route path={"/"} element={<MainPage />} />
							<Route path={"/cart"} element={<CartPage />} />
						</Routes>
					</div>
				</main>
			</div>
		</Router>
	);
}

export default App;
