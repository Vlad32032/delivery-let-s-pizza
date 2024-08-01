
import React, { Suspense } from "react";

import { Route, Routes } from "react-router-dom";

import MainLayouts from "./layouts/MainLayouts";

import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import FullPizza from "./pages/FullPizza";
// import NotFound from "./pages/NotFound";

import "./scss/app.scss";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

const App: React.FC = () => {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<MainLayouts />}>
					<Route path="" element={<Home />} />
					<Route path="cart" element={
						<Suspense fallback={<div>Идет загрузка...</div>}>
							<Cart />
						</Suspense>
					} />
					<Route path="pizza/:id" element={
						<Suspense fallback={<div>Идет загрузка...</div>}>
							<FullPizza />
						</Suspense>
					} />
					<Route path="*" element={
						<Suspense fallback={<div>Идет загрузка...</div>}>
							<NotFound />
						</Suspense>
					} />
				</Route>
{/* 
				<Route path="/diliveri-let-s-pizza/" element={<MainLayouts />}>
					<Route path="" element={<Home />} />
					<Route path="cart" element={<Cart />} />
					<Route path="pizza/:id" element={<FullPizza />} />
					<Route path="*" element={<NotFound />} />
				</Route>
				<Route path="*" element={<NotFound />} /> */}
			</Routes>
		</div>
	);
}

export default App;
