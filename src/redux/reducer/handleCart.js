const cart = [];

const handleCart = (state = cart, action) => {
    const product = action.payload;
    switch (action.type) {
        case "ADDITEM":
            // Check if product already exists in the cart
            const exist = state.find((x) => x.id === product.id);
            if (exist) {
                // Increase the quantity if the product exists
                return state.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty + 1 } : x
                );
            } else {
                // Add the product to the cart if it doesn't exist
                return [
                    ...state,
                    {
                        ...product,
                        qty: 1,
                    },
                ];
            }

        case "DELITEM":
            const exist1 = state.find((x) => x.id === product.id);
            if (exist1.qty === 1) {
                // Remove the item from the cart if the quantity is 1
                return state.filter((x) => x.id !== exist1.id);
            } else {
                // Decrease the quantity if more than one
                return state.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty - 1 } : x
                );
            }

        default:
            return state;
    }
};

export default handleCart;
