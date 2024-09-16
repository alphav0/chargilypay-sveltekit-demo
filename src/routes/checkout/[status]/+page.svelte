<script lang="ts">
	import { cartStore } from '$lib/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	if (data.status === 'success') {
		cartStore.reset();
	}
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>
