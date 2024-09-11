import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/server/chargilypay';

export const load = (async ({ params, url }) => {
    const checkoutId = url.searchParams.get('checkout_id')

    if (!checkoutId) {
        redirect(301, '/')
    }

    const checkout = await client.getCheckout(checkoutId)

    return {
        status: params.status,
        amount: checkout.amount,
    };
}) satisfies PageServerLoad;