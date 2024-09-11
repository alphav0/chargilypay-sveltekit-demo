import { persisted } from 'svelte-persisted-store'
import { get } from 'svelte/store';

export const cartStore = persisted<CartProduct[]>("ShoppingCart", []);

export function addToCart(product: CartProduct) {
    const cart = get(cartStore);
    const existingProduct = cart.find((p) => p.priceId === product.priceId);

    cartStore.update((cart) => {
        if (existingProduct) {
            let newQuantity = existingProduct.quantity + product.quantity;
            if (newQuantity > 5) newQuantity = 5;
            cart[cart.indexOf(existingProduct)].quantity = newQuantity;
            return cart;
        } else {
            return [...cart, product];
        }
    })
}
