import { Product, productSchema } from '@shared'
import axios from 'axios'
import { z } from 'zod'
import type { ProductsIndexRequest } from './products-index-request'

export class ProductsService {
  private readonly apiUrl = import.meta.env.VITE_BASE_URL

  public index(request: ProductsIndexRequest): Promise<Product[]> {
    const params = request.getParams()

    return axios
      .get<unknown>(`${this.apiUrl}/products`, { params })
      .then(response => z.array(productSchema).parse(response.data))
  }
}
