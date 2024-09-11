type Product = {
    id: string
    name: string
    description: string | null
    image: string | string[] | null
    prices: {
        id: string
        amount: number
    }[]
}

type CartProduct = Product & {
    quantity: number,
    priceId: string
}