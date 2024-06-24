import { Product, productSchema } from '@shared'
import axios from 'axios'
import { z } from 'zod'
import { BasketUpdateRequest } from './basket-update-request'

export class BasketService {
  private readonly apiUrl = import.meta.env.VITE_BASE_URL

  /**
   * Updates basket.
   */
  public show(): Promise<Product[]> {
    return axios
      .get<unknown>(`${this.apiUrl}/basket`)
      .then(response => z.array(productSchema).parse(response.data))
  }

  /**
   * Updates basket.
   */
  public update(request: BasketUpdateRequest): Promise<Product[]> {
    const body = request.getBody()

    return axios
      .patch<unknown>(`${this.apiUrl}/basket`, body)
      .then(response => z.array(productSchema).parse(response.data))
  }
}
