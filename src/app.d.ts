// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			customer: ICustomer;
		}
		interface PageData {
			customer: ICustomer;
		}
		// interface Platform {}
	}
}

export { };
