export const userApi = {
    async getCurrentUser() {
        try {
            const response = await fetch("/data/user.json");
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }
};