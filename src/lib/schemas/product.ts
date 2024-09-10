import { z } from "zod"

export const productSchema = z.object({
    priceId: z
        .string({
            required_error: "Price Id is required"
        }),
    quantity: z
        .number({
            required_error: "Quantity is required"
        })
        .min(1, "Quantity must be greater than 0")
        .max(5, "Quantity must be less than 6")
        .default(1)
})

export type ProductSchema = typeof productSchema