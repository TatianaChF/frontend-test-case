export const productsApi = {
    async getProducts() {
        try {
            const response = await fetch("/data/products.json");
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }
};