import ApiService from '../services/apiService.js'
import userService from '../services/userService.js';

class apiController {
    async login(req, res, next) {
        try {
            const { login, password } = req.body;
            const userData = await ApiService.login(login, password)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true })

            return res.json(userData)
        } catch (err) {
            next(err)
        }
    }

    async registration(req, res, next) {
        try {
            const { name, login, password } = req.body;
            const userData = await ApiService.registration(name, login, password)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true })

            return res.json(userData)
        } catch (err) {
            next(err)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await ApiService.logout(refreshToken);

            res.clearCookie('refreshToken');

            return res.json(token)
        } catch (err) {
            next(err)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await ApiService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true })

            return res.json(userData)
        } catch (err) {
            next(err)
        }
    }

    async profileInfo (req, res, next) {
        try {
            const { id } = req.params
            if (!id) throw apiError.BadRequest('Id does not specified')
            
            const user = await userService.info(id)
            
            res.json(user)
        } catch (err) {
            next(err)
        }
    }

    async profilesList (req, res, next) {
        try {
            const { page } = req.query

            const files = await userService.list(page)

            res.json(files)
        } catch (err) {
            next(err)
        }
    }

    async profileUpdate (req, res, next) {
        try {
            const { id } = req.params
            if (!id) throw apiError.BadRequest('Id does not specified')

            const user = await userService.update(id, req);

            res.json(user)
        } catch (err) {
            next(err)
        }
    }
}

export default new apiController();
