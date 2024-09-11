import { z } from "zod"

export const addToCartSchema = z.object({
    priceId: z.string({ required_error: "Price ID is required" }).min(1),
    quantity: z
        .number({
            required_error: "Quantity is required"
        })
        .min(1, "Quantity must be greater than 0")
        .max(5, "Quantity must be less than 6")
        .default(1)
})

export type AddToCartSchema = typeof addToCartSchema

export const checkoutSchema = z.object({
    items: z.array(addToCartSchema)
})

export type CheckoutSchema = typeof checkoutSchema