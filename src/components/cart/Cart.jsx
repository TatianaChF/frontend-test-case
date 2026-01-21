import {useDispatch, useSelector} from "react-redux";
import {useMemo, useState} from "react";
import {selectCart, selectCartCount, selectTotalPrice} from "../../store/selectors";
import {clearCart} from "../../store/slices/cartStore";
import CartProductCard from "./CartProductCard";

function Cart() {
    const dispatch = useDispatch()
    const cart = useSelector(selectCart)
    const cartCount = useSelector(selectCartCount)
    const totalPrice = useSelector(selectTotalPrice)

    const [isOpen, setIsOpen] = useState(false)
    const [showCheckout, setShowCheckout] = useState(false)

    const isEmpty = useMemo(() => cart.length === 0, [cart]);

    const handleCheckout = () => {
        setShowCheckout(true)
        setTimeout(() => {
            alert('Заказ оформлен!')
            dispatch(clearCart())
            setShowCheckout(false)
            setIsOpen(false)
        }, 1000)
    }

    return (
        <div className="cart">
            <button
                className="cart-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                Корзина ({cartCount})
            </button>

            {isOpen && (
                <div className="cart-dropdown">
                    <div className="cart-header">
                        <h3>Корзина</h3>
                        <button onClick={() => setIsOpen(false)}>×</button>
                    </div>

                    <div className="cart-items">
                        {isEmpty ? (
                            <p>Корзина пуста</p>
                        ) : (
                            cart.map(item => (
                                <CartProductCard key={item.id} product={item} />
                            ))
                        )}
                    </div>

                    <div className="cart-footer">
                        <div className="total">Итого: ${totalPrice}</div>
                        <button
                            className="checkout-btn"
                            onClick={handleCheckout}
                            disabled={isEmpty || showCheckout}
                        >
                            {showCheckout ? 'Оформляем...' : 'Оформить заказ'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart;