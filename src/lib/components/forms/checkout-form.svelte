<script lang="ts">
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import {
		type Infer,
		type SuperValidated,
		defaults,
		superForm
	} from 'sveltekit-superforms/client';
	import { Button } from '$lib/components/ui/button';
	import { type CheckoutSchema, checkoutSchema } from '$lib/schemas';
	import LoaderCircleIcon from 'lucide-svelte/icons/loader-circle';
	import { cartStore } from '$lib/stores';

	let data: SuperValidated<Infer<CheckoutSchema>> = defaults(zod(checkoutSchema));
	export let items: { priceId: string; quantity: number }[];

	const form = superForm(data, {
		validators: zodClient(checkoutSchema),
		dataType: 'json',
		onSubmit() {
			cartStore.reset();
		}
	});

	const { form: formData, enhance, delayed, message } = form;
	$formData.items = items;
</script>

<form class="w-full space-x-2" method="POST" action="/checkout" use:enhance>
	<Button class="w-full space-x-2" disabled={$delayed} variant="secondary" type="submit">
		{#if $delayed}
			<LoaderCircleIcon class="animate-spin" />
		{/if}
		<span>Proceed to Checkout</span>
	</Button>
	{#if $message}
		<span class="text-destructive-foreground">{$message}</span>
	{/if}
</form>
