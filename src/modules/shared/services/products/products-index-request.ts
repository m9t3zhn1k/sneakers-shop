export class ProductsIndexRequest {
  constructor(private readonly options?: ProductsIndexRequestOptions) {}

  public getParams(): Record<string, unknown> {
    return {
      title: this.options?.search ? `*${this.options.search}*` : undefined,
      sortBy: this.options?.sortBy ?? undefined,
      favorite: this.options?.isFavorite,
    }
  }
}

interface ProductsIndexRequestOptions {
  /**
   * Search query.
   */
  readonly search?: string

  /**
   * Sort by.
   */
  readonly sortBy?: string

  /**
   * Whether product should be favorite.
   */
  readonly isFavorite?: boolean
}
