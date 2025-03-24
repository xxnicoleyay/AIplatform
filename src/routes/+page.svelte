<script lang="ts">
	let userInput = '';
	let response = '';
	let loading = false;

	async function askAI() {
		loading = true;
		response = '';
		const res = await fetch('/api2/generate', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ chat: userInput })
		});
		const data = await res.json();
		response = data.response || data.error;
		loading = false;
	}
</script>

<main class="flex items-center justify-center min-h-screen px-4">
	<div class="bg-white bg-opacity-90 shadow-lg rounded-xl p-10 w-full max-w-2xl backdrop-blur-md text-center">
		<h1 class="text-5xl font-bold text-purple-700 mb-8 flex justify-center items-center gap-4">
			<span>Ready Set Bot AI</span>
		</h1>

		<input
			bind:value={userInput}
			placeholder="Enter your message..."
			class="w-full p-5 text-xl border border-purple-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 mb-6 placeholder-purple-400 italic"
		/>

		<button
			on:click={askAI}
			class="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white text-xl font-bold py-4 px-6 rounded transition mb-6 shadow-lg"
		>
			{#if loading}
				<span class="animate-pulse">Thinking...</span>
			{:else}
				Send
			{/if}
		</button>

		{#if !loading && response}
			<div class="p-5 bg-purple-100 border border-purple-300 rounded text-xl text-purple-900 font-semibold">
				{response}
			</div>
		{/if}
	</div>
</main>

<style>
	:global(html, body) {
		background-image: url('/background.png'); 
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		min-height: 100vh;
		margin: 0;
		font-family: 'Segoe UI', sans-serif;
		color: #4b0082;
	}
</style>
