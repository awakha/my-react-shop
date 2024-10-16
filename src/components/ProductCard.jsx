import React, { useState } from 'react';

const ProductCard = ({ product, addToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    // Преобразуем стоимость в число и проверяем, что это число
    const productPrice = parseFloat(product.price);  // Убедимся, что используем price
    const formattedPrice = isNaN(productPrice) ? 'Цена не указана' : `${productPrice.toFixed(2)}₽`;

    return (
        <article className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h2>{product.title}</h2>
            <p>{formattedPrice}</p>
            <div className="quantity-control">
                <button className="decrease-quantity" onClick={handleDecrease}>–</button>
                <span className="quantity">{quantity}</span>
                <button className="increase-quantity" onClick={handleIncrease}>+</button>
            </div>
            <button className="add-to-cart" onClick={() => addToCart(product, quantity)}>Добавить в корзину</button>
        </article>
    );
};

export default ProductCard;