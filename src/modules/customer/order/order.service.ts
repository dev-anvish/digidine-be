import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) public orderModel: Model<OrderDocument>,
  ) {}
  async getOrderDetails(id?: string) {
    try {
      const order = await this.orderModel.findById(id).lean();
      if (!order) {
        const emptyOrder = await new this.orderModel({}).save();
        return { isSuccess: true, data: emptyOrder };
      }
      return { isSuccess: true, data: order };
    } catch (error) {
      return { isSuccess: false, err: 'orderId not correct' };
    }
  }
}
