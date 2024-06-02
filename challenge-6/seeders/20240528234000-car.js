'use strict';

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
        await queryInterface.bulkInsert('cars', [{
                name: "SUPRA X",
                category: "Matic",
                price: 2500000,
                image: null,
                is_deleted: false,
                created_by: 1,
                updated_by: null,
                deleted_by: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "SUPRA Y",
                category: "Automatic",
                price: 100000,
                image: null,
                is_deleted: false,
                created_by: 2,
                updated_by: null,
                deleted_by: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "SUPRA Z",
                category: "Semi-Auto",
                price: 1000000,
                image: null,
                is_deleted: false,
                created_by: 2,
                updated_by: null,
                deleted_by: null,
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
        await queryInterface.bulkDelete('cars', null, {});
    }
};