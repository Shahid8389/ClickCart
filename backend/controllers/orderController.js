import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe';
import razorpay from 'razorpay';

// Global variables
const currency = 'inr'
const deliveryCharge = 10

// stripe gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// razorpay gateway initialize
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})


// Placing order using the COD method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({
            success: true,
            message: "Order Placed"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Placing order using the Stripe method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const { origin } = req.headers

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery charge'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({
            success: true,
            session_url: session.url,
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Verify the Stripe payment
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body

    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })

            res.json({
                success: true,
                message: "Payment Successful using Stripe"
            })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)

            res.json({
                success: false,
                message: "Payment Failed"
            })
        }

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })

    }
}


// Placing order using the Razorpay method
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save();

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),

        }

        await razorpayInstance.orders.create(options, (error, order) => {

            if (error) {
                console.log(error);

                return res.json({
                    success: false,
                    message: error
                })
            }

            res.json({
                success: true,
                order
            })
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Verify the Razorpay payment
const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === "paid") {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })

            await userModel.findByIdAndUpdate(userId, { cartData: {} })

            res.json({
                success: true,
                message: "Payment Successful using Razorpay"
            })

        } else {
            res.json({
                success: false,
                message: "Payment Failed"
            })
        }

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }

}

// All orders data for the Users
const getAllOrdersUser = async (req, res) => {
    try {
        const { userId } = req.body

        const orders = await orderModel.find({ userId })

        res.json({
            success: true,
            orders
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// All orders data for the Admin Panel
const getAllOrdersAdmin = async (req, res) => {
    try {
        const orders = await orderModel.find({})

        res.json({
            success: true,
            orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Update orders status from the Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })

        res.json({
            success: true,
            message: "Status Updated"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}


export { placeOrder, placeOrderStripe, placeOrderRazorpay, getAllOrdersAdmin, getAllOrdersUser, updateStatus, verifyStripe, verifyRazorpay }