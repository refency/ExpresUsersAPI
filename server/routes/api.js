import Router from 'express';
import api from '../controllers/api.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = new Router()

router.post('/user/login', api.login, function(req, res, next) { //
    res.json({ msg: 'CORS is enabled' })
})
router.post('/user/new_token', api.refresh, function(req, res, next) { //
    res.json({ msg: 'CORS is enabled' })
})
router.post('/user/register', api.registration, function(req, res, next) { //
    res.json({ msg: 'CORS is enabled' })
})

router.get('/profiles', authMiddleware, api.profilesList, function(req, res, next) { //
    res.json({ msg: 'CORS is enabled' })
})
router.get('/profile/:id', authMiddleware, api.profileInfo, function(req, res, next) { //
    res.json({ msg: 'CORS is enabled' })
})
router.get('/logout', authMiddleware, api.logout, function(req, res, next) { //
    res.json({ msg: 'CORS is enabled' })
})

router.put('/profile/:id', authMiddleware, api.profileUpdate, function(req, res, next) { //
    res.json({ msg: 'CORS is enabled' })
})

export default router;
