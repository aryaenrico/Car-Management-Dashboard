'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Mobils',"availableAt",{
      type:Sequelize.DATE,defaultValue: Sequelize.NOW})
      await queryInterface.addColumn('Mobils',"tipeDriver",{
        type:Sequelize.STRING,defaultValue: "dengan supir", allowNull: false})
        await queryInterface.addColumn('Mobils',"capacity",{
          type:Sequelize.INTEGER,defaultValue: 2, allowNull: false})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await  queryInterface.removeColumn('Mobils', 'availableAt'),
    await queryInterface.removeColumn('Mobils', 'tipeDriver'),
    await queryInterface.removeColumn('Mobils', 'capacity')
  }
};
