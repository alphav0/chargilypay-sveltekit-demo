<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import CartIcon from 'lucide-svelte/icons/shopping-cart';
	import { Badge } from '../ui/badge';
	import { cartStore } from '$lib/stores';
	import { Separator } from '../ui/separator';
	import CartItem from './cart-item.svelte';
	import CheckoutForm from '../forms/checkout-form.svelte';

	let open = false;

	function calculateTotal() {
		return $cartStore.reduce(
			(acc, item) =>
				acc + (item.prices.find((price) => price.id === item.priceId)?.amount || 0) * item.quantity,
			0
		);
	}

	$: items =
		$cartStore.map((item) => ({
			priceId: item.priceId,
			quantity: item.quantity
		})) || [];
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger asChild>
		<Button on:click={() => (open = !open)} size="icon" class="relative">
			<CartIcon class="h-5" />
			{#if $cartStore.length > 0}
				<Badge variant="secondary" class="absolute -right-2 -top-2">{$cartStore.length}</Badge>
			{/if}
		</Button>
	</Sheet.Trigger>
	<Sheet.Content class="space-y-4">
		<Sheet.Header>
			<Sheet.Title>My cart</Sheet.Title>
		</Sheet.Header>
		<div class="flex h-full flex-col gap-2">
			{#if $cartStore.length === 0}
				<p class="h-[85%]">No item in the cart</p>
			{:else}
				<div class="flex h-[85%] flex-col gap-2">
					{#each $cartStore as item}
						<CartItem {item} />
					{/each}
				</div>
			{/if}
			<div class="flex flex-col gap-2">
				<div class="flex items-center justify-between gap-2">
					<span>Total price:</span>
					{#if $cartStore.length > 0}
						<p class="text-lg font-semibold">{calculateTotal().toFixed(2)} DZD</p>
					{:else}
						<p class="text-lg font-semibold">0 DZD</p>
					{/if}
				</div>
				<Separator />
				<CheckoutForm {items} />
			</div>
		</div>
	</Sheet.Content>
</Sheet.Root>
