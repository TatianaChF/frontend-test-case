import {addToCart} from "../../store/slices/cartStore";
import {useDispatch} from "react-redux";
import {useCallback} from "react";

function ProductCard({product}) {
    const dispatch = useDispatch()

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    }

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name}/>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="price">${product.price}</div>
            <button
                onClick={() => handleAddToCart(product)}
            >
                Добавить в корзину
            </button>
        </div>
    )
}

export default ProductCard;