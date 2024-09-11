<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import { writable } from 'svelte/store';
	import { ProductForm } from '$lib/components/forms';

	export let data;

	const images = (data.product.image as string[]) || ['/assets/placeholder.png'];

	let api: CarouselAPI;
	let currentIndex = writable(0);
	$: if (api) {
		$currentIndex = api.selectedScrollSnap();
		api.on('select', () => {
			$currentIndex = api.selectedScrollSnap();
		});
	}
</script>

<main class="flex items-center justify-center">
	<Card.Root class="flex w-full max-w-[1500px] gap-8">
		<div class="size-full basis-full">
			<Carousel.Root bind:api opts={{ loop: true }}>
				<Carousel.Content>
					{#each images as image, index}
						<Carousel.Item>
							<img
								src={image}
								alt="{data.product.name} - image {index + 1}"
								class="size-full object-cover p-4"
							/>
						</Carousel.Item>
					{/each}
				</Carousel.Content>
				<ul class="mt-12 flex justify-center gap-3 overflow-x-scroll p-4">
					{#each images as image, index}
						<button
							on:click={() => api.scrollTo(index)}
							class:border-primary={$currentIndex === index}
							class="overflow-hidden rounded border"
						>
							<img class="h-14" src={image} alt="{data.product.name} - image {index + 1}" />
						</button>
					{/each}
				</ul>
			</Carousel.Root>
		</div>
		<div class="flex basis-full flex-col gap-4 p-4">
			<h2 class="text-5xl font-semibold">{data.product.name}</h2>
			<Separator />
			<ProductForm product={data.product} />
		</div>
	</Card.Root>
</main>
