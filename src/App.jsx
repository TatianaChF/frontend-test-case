import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

import './App.css'
import Header from "./components/Header";
import ProductsList from "./components/products/ProductsList";
import Cart from "./components/cart/Cart";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <div className="main-content">
          <ProductsList />
          <Cart />
        </div>
      </div>
    </Provider>
  )
}

export default App
