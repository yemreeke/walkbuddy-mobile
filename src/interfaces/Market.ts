export type IProduct = {
    id: number
    name: string
    description: string
    coin: string
    image_url: string
}


export type IOrderBuyResponse = {
    product_id: number
    discount_coupon: string
    user_id: number
    updated_at: string
    created_at: string
    id: number
}

export type IPastOrderItem = {
    id: number
    user_id: string
    product_id: string
    discount_coupon: string
    created_at: string
    updated_at: string
    product: {
        id: number,
        name: string
        description: string
        coin: string
        image_url: string
    }
}