import { Product, productSchema } from '@shared'
import axios from 'axios'
import { z } from 'zod'
import { CartUpdateRequest } from './cart-update-request'

export class CartService {
  private readonly apiUrl = import.meta.env.VITE_BASE_URL

  /**
   * Shows content of the cart.
   */
  public show(): Promise<Product[]> {
    return axios
      .get<unknown>(`${this.apiUrl}/basket`)
      .then(response => z.array(productSchema).parse(response.data))
  }

  /**
   * Updates cart.
   */
  public update(request: CartUpdateRequest): Promise<Product[]> {
    const body = request.getBody()

    return axios
      .patch<unknown>(`${this.apiUrl}/basket`, body)
      .then(response => z.array(productSchema).parse(response.data))
  }
}
