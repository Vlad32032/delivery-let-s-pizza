export const getCartFromLocalStorage = () => {
    const pizzasCartItems = localStorage.getItem('pizzasCartItems');

    return pizzasCartItems ? JSON.parse(pizzasCartItems) : [];
};