<script lang="ts">
	import Search from "../components/Search/index.svelte";
	import logo from "$lib/images/svelte-logo.svg";
	import { Cart, CategoriesSearch, User } from "../components/Menu";
	export let userInfo: ICustomer;
</script>

<header class="py-4 bg-neutral-900 flex items-center justify-between gap-4">
	<CategoriesSearch />
	<div class="md:flex gap-4 hidden">
		<div class="w-max">
			<a href="/">
				<img src={logo} alt="SvelteKit" class="h-10" width="40" height="40" />
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
			<img src={logo} alt="SvelteKit" class="h-10" width="40" height="40" />
		</a>
	</div>
	<div class="hidden md:block w-full max-w-lg mx-auto">
		<Search idSearch="search" />
	</div>
	<nav>
		<ul class="flex gap-4">
			<li>
				<User {userInfo} />
			</li>
			<li>
				<Cart />
			</li>
		</ul>
	</nav>
</header>
