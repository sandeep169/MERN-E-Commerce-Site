import orderModel from '../../models/order.js';
import productCustomizationModel from '../../models/productCustomization.js';
import cartModel from '../../models/cart.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const getOrdersController = tryCatchUtility(async (req, res) => {
    // find all orders under current user
    const order_ids = await orderModel.find({ user_id: req.user.userid }, { product_id: 1, order_no: 1 }).sort({ _id: -1 }).lean();
    if(!order_ids.length) return res.send('No order placed yet!');

    class Order {
        constructor(order_no) {
            this.order_no = order_no;
            this.products = [];
        }
        addProduct(customization, product_id) {
            customization.product_id = product_id;
            customization.order_no = this.order_no;
            this.products.push(customization);
        }
    }
    let [orders, order, order_no, idCount] = [[], undefined, undefined, order_ids.length];
    for(let i = order_ids.length; i>0;) {
        if(order_no !== order_ids[--i].order_no) {
            if(order !== undefined) orders.push(order);
            order_no = order_ids[i].order_no;
            order = new Order(order_no);
        }

        // find each order's details
        const response = await productCustomizationModel.find({ id: order_ids[i]._id }).sort({ createdAt: 1 }).lean();
        if(response.length)
            response.forEach(customization => order.addProduct(customization, order_ids[i].product_id));
        else idCount--;

        if(!i) orders.push(order);
    }

    if(!idCount) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
    res.status(200).json({ orders: orders });
});

export const placeOrderController = tryCatchUtility(async (req, res) => {
    // get all cart products from cart model
    const cart_ids = await cartModel.find({ user_id: req.user.userid }, { user_id: 1, product_id: 1 }).lean();
    if(!cart_ids.length) return res.send('Cart is empty!');

    // get user's last order no.
    const { order_no:last_order_no } = await orderModel.findOne({ user_id: req.user.userid }, { order_no: 1, _id: 0 }).sort({ order_no: -1 }).lean() || { order_no: 0 };
    const current_order_no = last_order_no + 1;

    const ids = [];
    cart_ids.forEach(id => {
        ids.push(id._id);       // getting cart model _ids to delete entries from cart model

        // updating cart_ids[{},{}] to insert in order model
        delete id._id;
        id.order_no = current_order_no;
    });

    // inserting ordered products into order model
    const response = await orderModel.insertMany(cart_ids);
    if(!response.length) throw new generateErrUtility('Unable to place order at the moment!\nPlease try again later...',500);

    for(let i=0; i<ids.length;) {
        // update 'id' from cart id to order id in product customization model
        const { nModified } = await productCustomizationModel.updateMany({ id: ids[i] }, { id: response[i]._id, order_status: "pending" }).lean();
        if(!nModified) throw new generateErrUtility(`Unable to update field 'id' in product customization model!`,500);

        // delete all cart products from cart model
        const { deletedCount } = await cartModel.deleteOne({ _id: ids[i++] }).lean();
        if(!deletedCount) throw new generateErrUtility('Unable to delete ids from cart model!',500);
    }

    res.status(201).send('Order placed successfully!');
});

