import { Controller, Get, Body, Param, Query } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('customer/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrder(@Query('id') id?: string) {
    return this.orderService.getOrderDetails(id);
  }
}
