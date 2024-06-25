import axios from 'axios'
import { Order, orderSchema } from '../../models'
import { OrdersCreateRequest } from './orders-create-request'

export class OrdersService {
  private readonly apiUrl = import.meta.env.VITE_BASE_URL

  /**
   * Creates cart.
   */
  public create(request: OrdersCreateRequest): Promise<Order> {
    const body = request.getBody()

    return axios
      .post<unknown>(`${this.apiUrl}/orders`, body)
      .then(response => orderSchema.parse(response.data))
  }
}
