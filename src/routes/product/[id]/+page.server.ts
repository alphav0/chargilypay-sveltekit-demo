import { getProduct } from "$lib/server/chargilypay.js";
import { error } from "@sveltejs/kit";

export const load = (async ({ params }) => {
    try {
        return {
            product: await getProduct(params.id),
        }
    }
    catch (err) {
        console.log(err);
        return error(404, "Product not found");
    }
});