import { z } from 'zod'

export class Product {
  constructor(
    /**
     * ID of the product.
     */
    public readonly id: string,

    /**
     * Title.
     */
    public readonly title: string,

    /**
     * Price.
     */
    public readonly price: number,

    /**
     * Preview image.
     */
    public readonly preview: string,

    /**
     * Whether product is favorite.
     */
    public readonly isFavorite: boolean,

    /**
     * Whether product is in cart.
     */
    public readonly isInCart: boolean,
  ) {}
}

export const productSchema = z
  .object({
    id: z.string(),
    imageUrl: z.string(),
    price: z.number(),
    title: z.string(),
    favorite: z.boolean(),
  })
  .transform(
    product =>
      new Product(
        product.id,
        product.title,
        product.price,
        product.imageUrl,
        product.favorite,
        false,
      ),
  )
