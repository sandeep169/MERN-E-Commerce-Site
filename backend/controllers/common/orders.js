import orderModel from '../../models/order.js';
import productCustomizationModel from '../../models/productCustomization.js';
import cartModel from '../../models/cart.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const getOrdersController = tryCatchUtility(async (req, res) => {
    /*const response = await orderModel.find({ user_id: req.user.userid });
    if(!response) return res.send('No order placed yet!');
    res.status(200).json({ orders: response });*/

    const order_ids = await orderModel.find({ user_id: req.user.userid }, { product_id: 1, order_no: 1 }).sort({ _id: -1 }).lean();
    if(!order_ids.length) return res.send('No order placed yet!');
    // console.log('order_ids',order_ids);

    /*const order = {
        order_no: 1,
        products: []
    };*/
    /*function createOrder(order_no, customization, product_id) {
        this.order_no = order_no;
        this.products = [];
        if(customization) {
            customization.product_id = product_id;
            customization.order_no = order_no;
            this.products.push(customization);
        }
    }*/
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
    // const orders = [];
    // console.log('1 orders',orders,orders.length);
    // let order;
    // console.log('\n1 order',order,typeof order);
    // let order_no;// = 1;
    // let nullCount = 0;
    let [orders, order, order_no, idCount] = [[], undefined, undefined, order_ids.length];
    // for(let id of order_ids) {
    // for(let i = 0; i < order_ids.length; i++) {
    for(let i = order_ids.length; i>0;) {
        if(order_no !== order_ids[--i].order_no) {
            // console.log('-> 1 <-');
            if(order !== undefined) orders.push(order);
            // console.log('\n2 order',order,typeof order);
            // console.log('\n2 orders',orders,orders.length);
            order_no = order_ids[i].order_no;
            // order = {
                // order_no: order_no,
                // products: []
            // };
            order = new Order(order_no);
        } // console.log('\n1 order',order);

        const response = await productCustomizationModel.find({ id: order_ids[i]._id }).sort({ createdAt: 1 }).lean();
        // console.log('\nresponse',response);
        if(response.length)
            response.forEach(customization => {
                // customization.product_id = order_ids[i].product_id;
                // customization.order_no = order_no;
                // order.products.push(customization);
                // orderedProducts.push(customization);

                // order.product_id = order_ids[i].product_id;
                order.addProduct(customization, order_ids[i].product_id);
            });
        // else nullCount++;
        else idCount--;
        // console.log('idCount',idCount);
        // console.log('\n2 order',order);

        // if(order_ids.length - i === 1) orders.push(order);
        if(!i) orders.push(order);
    }
    // console.log('\n3 orders',orders,orders.length);
    // if(nullCount === order_ids.length) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
    if(!idCount) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
    res.status(200).json({ orders: orders });
    // res.sendStatus(200);
});

export const placeOrderController = tryCatchUtility(async (req, res) => {
    // get all cart products from cart model
    const cart_ids = await cartModel.find({ user_id: req.user.userid }, { user_id: 1, product_id: 1 }).lean();
    if(!cart_ids.length) return res.send('Cart is empty!');
    // console.log(cart_ids,cart_ids[0]._id,typeof cart_ids[0]._id);

    // insert all cart products in order model
    const { order_no:last_order_no } = await orderModel.findOne({ user_id: req.user.userid }, { order_no: 1, _id: 0 }).sort({ order_no: -1 }).lean() || { order_no: 0 };
    // console.log(last_order_no);
    // const current_order_no = last_order_no ? ++last_order_no : 0;
    // const current_order_no = last_order_no ? last_order_no+1 : 1;
    const current_order_no = last_order_no + 1;
    const ids = [];
    cart_ids.forEach(id => {
        ids.push(id._id);
        delete id._id;
        id.order_no = current_order_no;
    });
    // console.log(cart_ids,ids);
    const response = await orderModel.insertMany(cart_ids); // .lean();
    if(!response.length) throw new generateErrUtility('Unable to place order at the moment!\nPlease try again later...',500);
    // console.log('response',response);

    // res.status(200).send('Order placed successfully!');

    // update 'id' from cart id to order id in product customization model and
    // delete all cart products from cart model
    // let i = 0;
    // ids.forEach(async id => {
    // for(let id of ids){
    for(let i=0; i<ids.length;) { // i++) {
        const { nModified } = await productCustomizationModel.updateMany({ id: ids[i] }, { id: response[i]._id, order_status: "pending" }).lean();
        if(!nModified) throw new generateErrUtility(`Unable to update field 'id' in product customization model!`,500);
        // console.log('nModified',nModified);

        const { deletedCount } = await cartModel.deleteOne({ _id: ids[i++] }).lean();
        if(!deletedCount) throw new generateErrUtility('Unable to delete ids from cart model!',500);
    }

    // delete all cart products from cart model
    // ids.forEach(async id => {
    /*for(let id of ids){
        const { deletedCount } = await cartModel.deleteOne({ _id: id }).lean();
        if(!deletedCount) throw new generateErrUtility('Unable to delete ids from cart model!',500);
    }*/

    res.status(201).send('Order placed successfully!');
    // res.sendStatus(200);
});

