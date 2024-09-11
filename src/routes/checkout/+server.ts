import { getCheckoutURL } from '$lib/server/chargilypay';
import type { RequestHandler } from './$types';
import { checkoutSchema } from '$lib/schemas';
import { superValidate, actionResult } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';

export const POST: RequestHandler = async ({ request }) => {
    const form = await superValidate(request, zod(checkoutSchema));
    if (!form.valid) {
        return actionResult('failure', { form });
    }

    if (form.data.items.length === 0) {
        return actionResult('failure', { form });
    }

    try {
        const checkoutURL = await getCheckoutURL(form.data.items)
        return actionResult('redirect', checkoutURL, {
            status: 301
        })
    }
    catch (err) {
        console.log(err)
        return actionResult('error', { form });
    }
};