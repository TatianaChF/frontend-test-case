export const useProductsFilter = (products, filters) => {
    const { searchTerm, selectedCategory, sortBy } = filters;

    return products
        .filter(product => {
            if (!product) return false;

            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'price') return a.price - b.price;
            return 0;
        });
};