<script lang="ts">
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import {
		type Infer,
		type SuperValidated,
		defaults,
		superForm
	} from 'sveltekit-superforms/client';
	import * as Form from '$lib/components/ui/form';
	import { Button } from '$lib/components/ui/button';
	import PlusIcon from 'lucide-svelte/icons/plus';
	import { Input } from '$lib/components/ui/input';
	import { type AddToCartSchema, addToCartSchema } from '$lib/schemas';
	import { cartStore } from '$lib/stores';

	let data: SuperValidated<Infer<AddToCartSchema>> = defaults(zod(addToCartSchema));
	export let product: Product;

	const pricesSelect = product.prices.map((price) => ({
		label: `${price.amount} DZD`,
		value: price.id
	}));

	const form = superForm(data, {
		validators: zodClient(addToCartSchema),
		SPA: true,
		resetForm: false,
		clearOnSubmit: 'errors-and-message',
		onUpdate({ form }) {
			if (!form.valid) return;

			const newCartProduct: CartProduct = {
				...product,
				...form.data
			};

			cartStore.addToCart(newCartProduct);
		}
	});

	const { form: formData, enhance } = form;

	if (product.prices.length > 0) {
		$formData.priceId = pricesSelect[0].value;
	}

	$: selectedPrice = $formData.priceId
		? pricesSelect.find((price) => price.value === $formData.priceId)
		: undefined;

	$: if (typeof $formData.quantity === 'string') {
		const parsedQuantity = parseInt($formData.quantity);
		$formData.quantity = isNaN(parsedQuantity) ? 1 : Math.min(Math.max(parsedQuantity, 1), 5);
	}
</script>

<form method="POST" class="space-y-6" use:enhance>
	<Form.Field {form} name="priceId">
		<Form.Control let:attrs>
			<Form.Label>Price</Form.Label>
			<div class="flex flex-wrap gap-2">
				{#each pricesSelect as { value, label }}
					<Button
						variant={selectedPrice && selectedPrice.value === value ? 'default' : 'outline'}
						on:click={() => ($formData.priceId = value)}>{label}</Button
					>
				{/each}
			</div>
			<input hidden bind:value={$formData.priceId} name={attrs.name} />
		</Form.Control>
		<Form.Description>select a price of the gift card you want</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="quantity">
		<Form.Control let:attrs>
			<Form.Label>Quantity</Form.Label>
			<Input
				type="number"
				{...attrs}
				placeholder="Quantity"
				bind:value={$formData.quantity}
				min="1"
				max="5"
			/>
		</Form.Control>
		<Form.Description>select quantity</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button type="submit" size="lg" class="relative w-full">
		<PlusIcon class="absolute left-2" /> Add to Shopping Cart
	</Form.Button>
</form>
