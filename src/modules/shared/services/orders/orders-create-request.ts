import type { Product } from '../../models'

export class OrdersCreateRequest {
  constructor(
    /**
     * Product list.
     */
    private readonly products: Product[],
  ) {}

  public getBody(): Record<string, unknown> {
    return {
      products: this.products.map(product => ({
        id: product.id,
        imageUrl: product.preview,
        price: product.price,
        title: product.title,
        favorite: product.isFavorite,
      })),
      created_at: new Date().toISOString(),
    }
  }
}
