<script>
	import Title from '$lib/items/Title.svelte';
</script>

<div class="mt-6 h-20 mx-auto  flex items-center">
	<div class="container mx-auto flex justify-start items-center">
		<Title>
			<img slot="logo" src="terra_logo.png" alt="Terra Logo" width={75} height={75} />
			<h1 slot="title" class="text-3xl font-bold">Light as a Feather</h1>
		</Title>
	</div>
	<slot name="view" class="justify-end"></slot>
</div>
