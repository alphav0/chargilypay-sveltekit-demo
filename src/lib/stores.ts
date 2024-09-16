import { persisted } from 'svelte-persisted-store'
import { get, type Updater } from 'svelte/store';

export function createCartStore(initialValue: CartProduct[] = [], onChange?: (value: CartProduct[]) => void) {
    const cart = persisted<CartProduct[]>("ShoppingCart", initialValue);

    function update(updater: Updater<CartProduct[]>) {
        cart.update((curValue) => {
            const newValue = updater(curValue);
            onChange?.(newValue);
            return newValue;
        });
    }

    function reset() {
        update(() => initialValue);
    }

    function addToCart(product: CartProduct) {
        update((cart) => {
            const existingProductIndex = cart.findIndex((p) => p.priceId === product.priceId);
            if (existingProductIndex !== -1) {
                const existingProduct = cart[existingProductIndex];
                const newQuantity = Math.min(existingProduct.quantity + product.quantity, 5);
                return cart.map((p, index) => index === existingProductIndex ? { ...p, quantity: newQuantity } : p);
            } else {
                return [...cart, product];
            }
        });
    }

    function removeFromCart(priceId: string) {
        update((cart) => {
            return cart.filter((p) => p.priceId !== priceId);
        });
    }

    function increaseQuantity(priceId: string) {
        update((cart) => {
            const product = cart.find((p) => p.priceId === priceId);
            if (product) {
                let newQuantity = product.quantity + 1;
                if (newQuantity > 5) newQuantity = 5;
                cart[cart.indexOf(product)].quantity = newQuantity;
            }
            return cart;
        })
    }

    function decreaseQuantity(priceId: string) {
        update((cart) => {
            const productIndex = cart.findIndex((p) => p.priceId === priceId);
            if (productIndex !== -1) {
                let newQuantity = cart[productIndex].quantity - 1;
                if (newQuantity < 1) {
                    return cart.filter((_, index) => index !== productIndex);
                } else {
                    cart[productIndex].quantity = newQuantity;
                }
            }
            return cart;
        })
    }

    return {
        ...cart,
        update,
        reset,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
    }
}

export type CartStore = ReturnType<typeof createCartStore>

export const cartStore = createCartStore()