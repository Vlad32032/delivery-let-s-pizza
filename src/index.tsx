import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
        <BrowserRouter basename="/delivery-let-s-pizza/">
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    );
};
