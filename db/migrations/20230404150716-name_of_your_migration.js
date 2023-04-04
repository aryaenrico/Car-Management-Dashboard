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
    await queryInterface.changeColumn('Mobils',"createdBy",{type: Sequelize.STRING,
      allowNull: false});
    await queryInterface.changeColumn('Mobils',"deletedBy",{type: Sequelize.STRING,
        allowNull: true});
    await queryInterface.changeColumn('Mobils',"updatedBy",{type: Sequelize.STRING,
    allowNull: false});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('Mobils',"createdBy",{type: Sequelize.INTEGER,
      allowNull: false});
    await queryInterface.changeColumn('Mobils',"deletedBy",{type: Sequelize.INTEGER,
        allowNull: true});
    await queryInterface.changeColumn('Mobils',"updatedBy",{type: Sequelize.INTEGER,
    allowNull: false});
  }
};
