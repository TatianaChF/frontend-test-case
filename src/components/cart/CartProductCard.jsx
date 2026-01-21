import {removeFromCart, updateQuantity} from "../../store/slices/cartStore";
import {useDispatch} from "react-redux";
import {useCallback} from "react";

function CartProductCard({product}) {
    const dispatch = useDispatch()

    const handleRemoveItem = useCallback((id) => {
        dispatch(removeFromCart(id))
    }, [])

    const handleUpdateQuantity = useCallback((id, quantity) => {
        if (quantity <= 0) {
            handleRemoveItem(id)
            return
        }
        dispatch(updateQuantity({id, quantity}))
    }, [])

    return (
        <div className="cart-item">
            <img src={product.image} alt={product.name} />
            <div className="item-details">
                <h4>{product.name}</h4>
                <p>${product.price}</p>
                <div className="quantity-controls">
                    <button onClick={() => handleUpdateQuantity(product.id, product.quantity - 1)}>
                        -
                    </button>
                    <span>{product.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}>
                        +
                    </button>
                </div>
            </div>
            <button
                className="remove-btn"
                onClick={() => handleRemoveItem(product.id)}
            >
                Удалить
            </button>
        </div>
    )
}

export default CartProductCard