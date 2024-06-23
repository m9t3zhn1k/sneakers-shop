import { Product, ProductsToggleFavoriteRequest, productSchema } from '@shared'
import axios from 'axios'
import { z } from 'zod'
import type { ProductsIndexRequest } from './products-index-request'

export class ProductsService {
  private readonly apiUrl = import.meta.env.VITE_BASE_URL

  /**
   * Returns list of products.
   */
  public index(request: ProductsIndexRequest): Promise<Product[]> {
    const params = request.getParams()

    return axios
      .get<unknown>(`${this.apiUrl}/products`, { params })
      .then(response => z.array(productSchema).parse(response.data))
  }

  /**
   * Toggles favorite boolean value for specified product.
   */
  public toggleFavorite(request: ProductsToggleFavoriteRequest): Promise<Product> {
    const body = request.getBody()

    return axios
      .patch<unknown>(`${this.apiUrl}/products/${request.id}`, body)
      .then(response => productSchema.parse(response.data))
  }
}
