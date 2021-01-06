import express from 'express';
const router = express.Router();
import { addOrderItems, getAllOrders, getMyOrders, getOrderById, updateOrderToDelivered, updateOrderToPaid } from './../controllers/orderController.js'
import { admin, protect } from './../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders)
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
export default router;