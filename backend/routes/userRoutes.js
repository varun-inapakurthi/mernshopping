import express from 'express';
const router = express.Router();
import { authUser, getUserProfie, registerUser, deleteUser, updateUserProfie, getUsers, getUserById, updateUser } from './../controllers/userController.js'
import { protect, admin } from './../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfie).put(protect, updateUserProfie);

router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
// router.route('/delete').delete(deleteUser);
export default router;