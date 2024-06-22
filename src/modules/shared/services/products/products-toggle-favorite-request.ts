import type { Product } from '../../models'

export class ProductsToggleFavoriteRequest {
  constructor(
    /**
     * ID of the product.
     */
    public readonly id: Product['id'],

    /**
     * Whether product is favorite.
     */
    private readonly isFavorite: Product['isFavorite'],
  ) {}

  public getBody(): Record<string, unknown> {
    return {
      favorite: this.isFavorite,
    }
  }
}
