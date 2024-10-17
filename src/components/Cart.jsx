import React, { useState, useEffect } from 'react';

const Cart = ({ cartItems, updateCart }) => {
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        if (cartItems.length > 0) {
            const newTotal = cartItems.reduce((acc, item) => {
                const price = parseFloat(item.cost);
                const quantity = parseInt(item.quantity, 10);
                if (!isNaN(price) && !isNaN(quantity)) {
                    return acc + price * quantity;
                } else {
                    console.error(`Invalid price or quantity for item: ${item.title}`);
                    return acc;
                }
            }, 0);
            setTotalAmount(newTotal);
        } else {
            setTotalAmount(0); 
        }
    }, [cartItems]);

    return (
        <div id="cart-container">
            <h2>Ваш заказ</h2>
            {cartItems.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <div id="cart-items">
                    {cartItems.map((item, index) => {
                        const price = parseFloat(item.cost);
                        const quantity = parseInt(item.quantity, 10);
                        const itemTotal = !isNaN(price) && !isNaN(quantity) ? price * quantity : 0;
                        return (
                            <div className="cart-item" key={item.id}>
                                <img src={item.image} alt={item.title} />
                                <div className="cart-item-info">
                                    <div className="cart-item-title">{item.title}</div>
                                    <div className="cart-item-price">
                                        {price}₽ x {quantity} = {itemTotal.toFixed(2)}₽
                                    </div>
                                    <div className="cart-item-quantity-control">
                                        <button
                                            onClick={() => updateCart(index, 'decrease')}
                                        >
                                            –
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateCart(index, 'increase')}>+</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <p id="delivery-info">Доставка: <span>бесплатно</span></p>
            <p id="total-amount">Итого: <span>{totalAmount.toFixed(2)}₽</span></p>
        </div>
    );
};

export default Cart;