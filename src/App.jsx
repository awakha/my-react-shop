import React, { useState, useEffect, useReducer } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';

import './style.css';


const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const productIndex = state.findIndex(item => item.id === action.payload.product.id);
            if (productIndex !== -1) {
                const updatedCart = [...state];
                updatedCart[productIndex].quantity += action.payload.quantity;
                return updatedCart;
            } else {
                return [...state, { ...action.payload.product, quantity: action.payload.quantity }];
            }
        }
        case 'UPDATE_CART': {
            const updatedCart = [...state];
            if (action.payload.action === 'increase') {
                updatedCart[action.payload.index].quantity += 1;
            } else if (action.payload.action === 'decrease') {
                if (updatedCart[action.payload.index].quantity > 1) {
                    updatedCart[action.payload.index].quantity -= 1;
                } else {
             
                    updatedCart.splice(action.payload.index, 1);
                }
            }
            return updatedCart;
        }
        default:
            return state;
    }
};

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, dispatchCart] = useReducer(cartReducer, []);
    const [searchQuery, setSearchQuery] = useState('');  

  
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            dispatchCart({ type: 'SET_CART', payload: savedCart });
        }
    }, []);  


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://webapi.omoloko.ru/api/v1/products');
                const data = await response.json();
                setProducts(data.products || []);
            } catch (error) {
                console.error('Error loading products', error);
            }
        };
        fetchProducts();
    }, []);  


    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            localStorage.removeItem('cart');  
        }
    }, [cart]);  


    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const productsToDisplay = filteredProducts.length > 0 ? filteredProducts.slice(0, 10) : products.slice(0, 10);

    return (
        <div>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <main>
                <div className="container">
                    <section>
                        {productsToDisplay.map((product) => ( 
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                addToCart={(product, quantity) => dispatchCart({ type: 'ADD_TO_CART', payload: { product, quantity } })}
                            />
                        ))}
                    </section>
                    <Cart cartItems={cart} updateCart={(index, action) => dispatchCart({ type: 'UPDATE_CART', payload: { index, action } })} />
                </div>
            </main>
            <footer>
                <p>Пагалова Хава</p>
                <ul>
                    <li>Тел: +7(928) 018-22-04</li>
                    <li>Email: <a href="mailto:pagalova97@mail.ru">pagalova97@mail.ru</a></li>
                    <li>Телеграм: <a href="https://t.me/awakka" target="_blank">@awakka</a></li>
                </ul>
            </footer>
        </div>
    );
};

export default App;