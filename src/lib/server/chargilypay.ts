import { env } from '$env/dynamic/private';
import { PRIVATE_CHARGILYPAY_API_KEY } from '$env/static/private';
import { ChargilyClient } from '@chargily/chargily-pay';

export const client = new ChargilyClient({
	api_key: PRIVATE_CHARGILYPAY_API_KEY,
	mode: 'test' // Change to 'live' when deploying your application
});

export async function getProductsList(): Promise<Product[]> {
	const items = (await client.listProducts()).data
	const products: Product[] = []

	// Fetch prices concurrently
	const pricePromises = items.map(item =>
		client.getProductPrices(item.id).then(prices => ({
			id: item.id,
			name: item.name,
			description: item.description,
			image: item.images[0] || null,
			prices: prices.data.map(price => ({
				id: price.id,
				amount: price.amount
			})).sort((a, b) => a.amount - b.amount)
		}))
	);

	// Wait for all price promises to resolve
	const resolvedProducts = await Promise.all(pricePromises);
	products.push(...resolvedProducts);

	return products
}

export async function getProduct(id: string): Promise<Product> {
	const item = await client.getProduct(id)
	const prices = await client.getProductPrices(id)

	return {
		id: item.id,
		name: item.name,
		description: item.description,
		image: item.images,
		prices: prices.data.map(price => ({
			id: price.id,
			amount: price.amount
		})).sort((a, b) => a.amount - b.amount)
	}
}

const siteURL = env.VERCEL_URL || 'http://localhost:8080'

export async function getCheckoutURL(items: { priceId: string, quantity: number }[]) {
	const cart = items.map(({ priceId, quantity }) => ({
		price: priceId,
		quantity
	}))

	const newCheckout = await client.createCheckout({
		items: cart,
		success_url: new URL('/checkout/success', siteURL).href,
		failure_url: new URL('/checkout/failure', siteURL).href,
		payment_method: 'edahabia',
		locale: 'en',
		pass_fees_to_customer: true,
	});

	return newCheckout.checkout_url
}