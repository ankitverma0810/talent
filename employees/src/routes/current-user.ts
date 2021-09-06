import express from 'express';
import { currentUser } from '@talent-org/common';

const router = express.Router();

router.get('/api/employees/currentemployee', currentUser, (req, res) => {
	res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };