import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useState} from "react";
import {fetchProducts} from "../../store/slices/productsStore";
import {selectProducts, selectProductsLoading, selectProductsStatus} from "../../store/selectors";
import ProductCard from "./ProductCard";

function ProductsList() {
    const dispatch = useDispatch()
    const products = useSelector(selectProducts)
    const loading = useSelector(selectProductsLoading)
    const status = useSelector(selectProductsStatus)

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [sortBy, setSortBy] = useState('name')
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const filteredProducts = useMemo(() => {
        if (!products.length) return [];
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
            return matchesSearch && matchesCategory
        }).sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name)
            if (sortBy === 'price') return a.price - b.price
            return 0
        })
    }, [products, searchTerm, selectedCategory, sortBy])

    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value)
    }, [])

    const handleCategoryChange = useCallback((e) => {
        setSelectedCategory(e.target.value)
    }, [])

    const handleSortChange = useCallback((e) => {
        setSortBy(e.target.value)
    }, [])

    if (loading) {
        return <div className="loading">Загрузка товаров...</div>
    }

    if (status === 'failed') {
        return <div className="loading">Ошибка загрузки товаров</div>
    }

    if (status === 'succeeded' && products.length === 0) {
        return (
            <div className="product-list">
                <p>Товары не найдены</p>
            </div>
        );
    }

    return (
        <div className="product-list">
            <div className="filters">
                <div className="search">
                    <input
                        type="text"
                        placeholder="Поиск товаров..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="filter-controls">
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="all">Все категории</option>
                        <option value="phones">Телефоны</option>
                        <option value="laptops">Ноутбуки</option>
                        <option value="tablets">Планшеты</option>
                    </select>

                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="name">По названию</option>
                        <option value="price">По цене</option>
                    </select>

                    <button onClick={() => setShowFilters(!showFilters)}>
                        {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
                    </button>
                </div>
            </div>

            <div className="products">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default ProductsList;