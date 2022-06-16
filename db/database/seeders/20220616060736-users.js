import models from '../../models';

const { User } = models;

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      User.create({
        id: 1,
        name: 'Semen',
        surname: 'Semenov',
        login: '88005553535',
        password: '$2b$04$zxu76gmVc1BDoVL0B4EbUeWG.BKLSUS5Kk.bkT.F40pz3m/0ioOUq',
        gender: true,
        photo: 't5818n5ka9kmfgadfp6fo' // Example name of photo
      }),
      User.create({
        id: 2,
        name: 'Petr',
        surname: 'Petrov',
        login: 'email@example.com',
        password: '$2b$04$9hRkzO7UANFHcctMp29kDu0sdGc4fhQG6LNpvCfz3ffa3F56FOodu',
        gender: false,
        photo: '0e6g9rwsf8y5ymu0qzj1khk' // Example name of photo
      })
    ])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
}
