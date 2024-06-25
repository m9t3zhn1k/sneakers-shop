import { z } from 'zod'
import { productSchema, type Product } from './product'

export class Order {
  constructor(
    /**
     * ID of the order.
     */
    public readonly id: number,

    /**
     * Product list.
     */
    public readonly products: Product[],

    /**
     * Created at.
     */
    public readonly createdAt: Date,
  ) {}
}

export const orderSchema = z
  .object({
    id: z.number(),
    products: z.array(productSchema),
    created_at: z.string(),
  })
  .transform(order => new Order(order.id, order.products, new Date(order.created_at)))
