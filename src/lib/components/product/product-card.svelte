<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import type { Product } from '$lib/server/chargilypay';

	export let product: Product;
	const image = (product.image as string) ?? '/assets/placeholder.png';
</script>

<a
	href="/product/{product.id}"
	class="block w-full max-w-sm overflow-hidden transition-shadow hover:shadow-lg"
>
	<Card class="h-full">
		<div class="relative aspect-[3/2] overflow-hidden">
			<img
				src={image}
				alt={product.name}
				class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
			/>
		</div>
		<CardContent class="p-4">
			<h3 class="mb-2 text-lg font-semibold text-foreground">{product.name}</h3>
			<p class="text-sm text-muted-foreground">
				{#if product.prices.length === 1}
					{product.prices[0].amount.toFixed(2)} DZD
				{:else if product.prices.length > 1}
					{product.prices[0].amount.toFixed(2)} - {product.prices[
						product.prices.length - 1
					].amount.toFixed(2)} DZD
				{:else}
					Price not available
				{/if}
			</p>
		</CardContent>
	</Card>
</a>
