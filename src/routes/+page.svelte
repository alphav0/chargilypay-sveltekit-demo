<script lang="ts">
	import ProductCard from '$lib/components/store/product-card.svelte';
	export let data;
</script>

<main class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
	{#each data.products as product (product.id)}
		<ProductCard {product} />
	{/each}
</main>
