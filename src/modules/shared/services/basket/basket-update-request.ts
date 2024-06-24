import { Product } from '../../models'

export class BasketUpdateRequest {
  constructor(
    /**
     * Products.
     */
    private readonly products: Product[],
  ) {}

  public getBody(): Record<string, unknown>[] {
    return this.products.map(product => ({
      id: product.id,
      imageUrl: product.preview,
      price: product.price,
      title: product.title,
      favorite: product.isFavorite,
    }))
  }
}
