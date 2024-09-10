<script lang="ts" context="module">
	import { z } from 'zod';

	const productSchema = z.object({
		priceId: z.string({
			required_error: 'Price Id is required'
		}),
		quantity: z
			.number({
				required_error: 'Quantity is required'
			})
			.min(1, 'Quantity must be greater than 0')
			.max(5, 'Quantity must be less than 6')
			.default(1)
	});

	type ProductSchema = typeof productSchema;
</script>

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

	let data: SuperValidated<Infer<ProductSchema>> = defaults(zod(productSchema));
	export let prices: { id: string; amount: number }[];

	const pricesSelect = prices.map((price) => ({
		label: `${price.amount} DZD`,
		value: price.id
	}));

	const form = superForm(data, {
		SPA: true,
		validators: zodClient(productSchema),
		onUpdate({ form }) {
			if (form.valid) {
				// TODO: add to cart
			}
		}
	});

	const { form: formData, enhance } = form;

	if (prices.length > 0) {
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

<form method="POST" action="?/add" class="space-y-6" use:enhance>
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
