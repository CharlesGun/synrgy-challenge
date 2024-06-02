'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
        *
        * Example:
        * await queryInterface.bulkInsert('People', [{
        *   name: 'John Doe',
        *   isBetaMember: false
        * }], {});
        */
        const salt = await bcrypt.genSalt();
        await queryInterface.bulkInsert('users', [{
            email: "admin@gmail.com",
            password: await bcrypt.hash("admin", salt),
            name: "admin",
            role: "admin",
            refresh_token: null,    
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            email: "superadmin@gmail.com",
            password: await bcrypt.hash("superadmin", salt),
            name: "superadmin",
            role: "superadmin",
            refresh_token: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, 
        {
            email: "user@gmail.com",
            password: await bcrypt.hash("user", salt),
            name: "user",
            role: "user",
            refresh_token: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, 
    ], {})
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
        await queryInterface.bulkDelete('users', null, {});
    }
};