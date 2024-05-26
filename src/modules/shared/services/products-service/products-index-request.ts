export class ProductsIndexRequest {
  constructor(private readonly options?: ProductsIndexRequestOptions) {}

  public getParams() {
    return {
      title: this.options ? `*${this.options.search}*` : undefined,
      sortBy: this.options?.sortBy ?? undefined,
    }
  }
}

interface ProductsIndexRequestOptions {
  /**
   * Search query.
   */
  readonly search: string

  /**
   * Sort by.
   */
  readonly sortBy: string
}
