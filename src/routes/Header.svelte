<script>
	import { page } from "$app/stores";
	import MenuSearch from "../components/MenuSearch/Index.svelte";
	import Search from "../components/Search/index.svelte";
	import logo from "$lib/images/svelte-logo.svg";
</script>

<header class="p-4 bg-neutral-900 flex items-center justify-between gap-4">
	<MenuSearch />
	<div class="md:flex gap-4 hidden">
		<div class="w-max">
			<a href="/">
				<img src={logo} alt="SvelteKit" class="h-10" />
			</a>
		</div>
		<ul class="flex gap-4 items-center justify-center text-white">
			<li>
				<a
					href="/products"
					class="text-neutral-100 hover:underline underline-offset-4"
				>
					Tudo
				</a>
			</li>
			<li>Roupas</li>
			<li>Biju</li>
			<li>
				<svg
					width="15"
					height="15"
					viewBox="0 0 15 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1.5 6.625C1.01675 6.625 0.625 7.01675 0.625 7.5C0.625 7.98325 1.01675 8.375 1.5 8.375C1.98325 8.375 2.375 7.98325 2.375 7.5C2.375 7.01675 1.98325 6.625 1.5 6.625ZM5.5 6.625C5.01675 6.625 4.625 7.01675 4.625 7.5C4.625 7.98325 5.01675 8.375 5.5 8.375C5.98325 8.375 6.375 7.98325 6.375 7.5C6.375 7.01675 5.98325 6.625 5.5 6.625ZM9.5 6.625C9.01675 6.625 8.625 7.01675 8.625 7.5C8.625 7.98325 9.01675 8.375 9.5 8.375C9.98325 8.375 10.375 7.98325 10.375 7.5C10.375 7.01675 9.98325 6.625 9.5 6.625ZM12.625 7.5C12.625 7.01675 13.0168 6.625 13.5 6.625C13.9832 6.625 14.375 7.01675 14.375 7.5C14.375 7.98325 13.9832 8.375 13.5 8.375C13.0168 8.375 12.625 7.98325 12.625 7.5Z"
						fill="currentColor"
						fill-rule="evenodd"
						clip-rule="evenodd"
					/>
				</svg>
			</li>
		</ul>
	</div>
	<div class="md:hidden">
		<a href="/">
			<img src={logo} alt="SvelteKit" class="h-10" />
		</a>
	</div>
	<div class="hidden md:block w-full max-w-lg mx-auto">
		<Search />
	</div>
	<nav>
		<ul class="flex gap-4">
			<li>
				<button
					class="relative flex h-11 w-11 items-center justify-center rounded-md border text-black transition-colors dark:text-white border-neutral-700"
					aria-label="Menu do usuário"
				>
					<svg
						width="15"
						height="15"
						viewBox="0 0 15 15"
						fill="none"
						class="h-4 transition-all ease-in-out hover:scale-110"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
							fill="currentColor"
							fill-rule="evenodd"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</li>
			<li>
				<button
					class="relative flex h-11 w-11 items-center justify-center rounded-md border transition-colors border-neutral-700 text-white"
					aria-label="Carrinho"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
						class="h-4 transition-all ease-in-out hover:scale-110"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
						/>
					</svg>
				</button>
			</li>
		</ul>
	</nav>
</header>
