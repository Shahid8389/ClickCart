import express from 'express'
import { getAllOrdersAdmin, getAllOrdersUser, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, verifyRazorpay, verifyStripe } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';


const orderRouter = express.Router();

// Payment Features
orderRouter.post("/place", authUser, placeOrder)
orderRouter.post("/stripe", authUser, placeOrderStripe)
orderRouter.post("/razorpay", authUser, placeOrderRazorpay)

// User Feature
orderRouter.post("/userorders", authUser, getAllOrdersUser)

// Admin Features
orderRouter.post("/status", adminAuth, updateStatus)
orderRouter.post("/list", adminAuth, getAllOrdersAdmin)

// Verify payment
orderRouter.post("/verifyStripe", authUser, verifyStripe)
orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay)


export default orderRouter;