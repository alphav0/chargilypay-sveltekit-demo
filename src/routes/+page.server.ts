import { getProductsList } from "$lib/server/chargilypay";

export const load = async () => {
	return {
		products: await getProductsList()
	};
};
