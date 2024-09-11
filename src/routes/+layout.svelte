<script>
	import '../app.css';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import SearchIcon from 'lucide-svelte/icons/search';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import ShoppingCartSheet from '$lib/components/store/shopping-cart-sheet.svelte';
</script>

<div class="min-h-screen space-y-2">
	<header class="flex items-center justify-between gap-4 px-8 py-4">
		<a href="/" class="flex w-full items-center gap-2">
			<img class="size-8" src="/favicon.png" alt="site logo" />
			<h1 class="text-xl font-bold">Chargily Pay Acme</h1>
		</a>

		{#if $page.url.pathname === '/'}
			<div class="relative w-full" in:fade out:fade>
				<Input class="w-full" type="search" placeholder="Search for products..." />
				<SearchIcon class="absolute right-2 top-1/2 h-4 -translate-y-1/2 transform" />
			</div>
		{/if}

		<div class="flex w-full justify-end">
			<ShoppingCartSheet />
		</div>
	</header>

	<div class="px-8">
		<slot />
	</div>
</div>

<footer class="border-t bg-background">
	<div class="container mx-auto px-4 py-6">
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<div>
				<h3 class="mb-2 text-base font-semibold">About</h3>
				<p class="text-sm text-muted-foreground">ACME Shop</p>
			</div>
			<div>
				<h3 class="mb-2 text-base font-semibold">Quick Links</h3>
				<ul class="space-y-1 text-sm">
					<li><a href="/" class="text-muted-foreground hover:text-foreground">Home</a></li>
					<li>
						<a
							href="https://islamzaoui.top/contact"
							target="_blank"
							class="text-muted-foreground hover:text-foreground">Contact</a
						>
					</li>
				</ul>
			</div>
			<div>
				<h3 class="mb-2 text-base font-semibold">Contact Us</h3>
				<address class="text-sm not-italic text-muted-foreground">
					<a href="mailto:contact@islamzaoui.top">contact@islamzaoui.top</a>
				</address>
			</div>
		</div>
		<div class="mt-6 flex flex-col items-center justify-between border-t pt-4 sm:flex-row">
			<p class="text-xs text-muted-foreground">
				&copy; 2024 Chargily Pay Acme | <a
					href="https://github.com/alphav0/chargilypay-sveltekit-demo"
					target="_blank"
					class="underline underline-offset-2 hover:no-underline"
					rel="noopener noreferrer">View the Source</a
				>
			</p>
			<p class="mt-2 text-xs text-muted-foreground sm:mt-0">
				Powered by <a
					href="http://kit.svelte.dev"
					class="underline underline-offset-2 hover:no-underline"
					target="_blank"
					rel="noopener noreferrer">SvelteKit</a
				>
				&
				<a
					href="https://chargily.com/business/pay"
					class="underline underline-offset-2 hover:no-underline"
					target="_blank"
					rel="noopener noreferrer">Chargily pay</a
				>
			</p>
		</div>
	</div>
</footer>
