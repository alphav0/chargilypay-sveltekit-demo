<script lang="ts">
	import { cartStore } from '$lib/stores';

	export let item: CartProduct;

	$: image = item.image?.[0] || '/assets/placeholder.png';
	$: price = item.prices.find((price) => price.id === item.priceId);
</script>

<div class="flex items-center justify-between gap-4 rounded-lg border p-4 shadow-md">
	<img class="h-14 rounded-md" src={image} alt="{item.name} - image 1" />
	<div class="flex w-full flex-col justify-between">
		<div class="flex items-center justify-between">
			<h2 class="truncate text-lg font-semibold">{item.name}</h2>
		</div>
		<div class="mt-2 flex items-center justify-between">
			<div class="flex items-center justify-between gap-2 rounded-xl bg-muted p-2">
				<button class="rounded px-2" on:click={() => item.quantity < 5 && item.quantity++}>+</button
				>
				<p class="font-medium">{item.quantity}</p>
				<button
					class="rounded px-2"
					on:click={() => {
						if (item.quantity > 0) {
							item.quantity--;
							if (item.quantity === 0) $cartStore = $cartStore.filter((i) => i !== item);
						}
					}}>-</button
				>
			</div>
			{#if price}
				<p class="text-sm font-medium text-muted-foreground">
					{(price.amount * item.quantity).toFixed(2)} DZD
				</p>
			{/if}
		</div>
	</div>
</div>
