import React from "react";
//@ts-ignore
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./features/homePage/HomePage";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<HomePage/>} />
            <Route path="home" element={<HomePage/>} />
            <Route path="favorites" element={<div>Favorites</div>} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
