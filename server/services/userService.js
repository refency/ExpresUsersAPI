import * as path from 'path';
import fs from 'fs';
import models from '../../db/models';
import apiError from '../exceptions/apiError';

const { User } = models;

class UserService {
    async list (page) {
        if (!page) page = 1
        const limit = 10 // Count of entries on 1 page

        const users = await User.findAll({
            order: ['createdAt'],
            limit: limit,
            offset: (parseInt(page) - 1) * limit
        })

        return users
    }

    async info (id) {
        const user = await User.findOne({ where: { id } })

        return user
    }

    async update (id, req) {
        const userToUpdate = await User.findOne({ where: { id: id } })
        if (!userToUpdate) throw apiError.BadRequest(`User does not exist!`)

        if (req.files) {
            if ((req.files.photo.size > 10 * 1024 * 1024 * 8) && !(req.files.photo.name.split('.')[1] === 'jpg' || req.files.photo.split('.')[1] === 'png')) {
                throw apiError.BadRequest(`Size of photo more than 10 MBytes or type of photo is not .jpg/.png`)
            }
        }

        const fileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const filePath = path.resolve('server/files', `${fileName}.${req.files.photo.name.split('.')[1]}`);

        fs.createWriteStream(filePath).write(req.files.photo.data);

        await userToUpdate.update({
            name: req.body.name ? req.body.name : userToUpdate.name,
            surname: req.body.surname ? req.body.surname : userToUpdate.surname,
            login: req.body.login ? req.body.login : userToUpdate.login,
            gender: req.body.gender ? req.body.gender : userToUpdate.gender,
            photo: fileName ? fileName : userToUpdate.photo
        })

        return 'User was updated'
    }
}

export default new UserService();
