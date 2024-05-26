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
