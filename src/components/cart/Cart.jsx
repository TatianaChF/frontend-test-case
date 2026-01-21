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

    const renderCartItems = () => {
        if (isEmpty) return <p>Корзина пуста</p>;
        else {
            return cart.map(item => (
                <CartProductCard key={item.id} product={item} />
                ))
        }
    }

    const renderCartFooter = () => {
        return <div className="cart-footer">
            <div className="total">Итого: ${totalPrice}</div>
            <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={isEmpty || showCheckout}
            >
                {showCheckout ? 'Оформляем...' : 'Оформить заказ'}
            </button>
        </div>
    }

    const renderCartDropdown = () => {
        if (!isOpen) return null;

        return <div className="cart-dropdown">
            <div className="cart-header">
                <h3>Корзина</h3>
                <button onClick={() => setIsOpen(false)}>×</button>
            </div>

            <div className="cart-items">
                {renderCartItems()}
            </div>

            {renderCartFooter()}
        </div>
    }

    return (
        <div className="cart">
            <button
                className="cart-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                Корзина ({cartCount})
            </button>

            {renderCartDropdown()}
        </div>
    )
}

export default Cart;