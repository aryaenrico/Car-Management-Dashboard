'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.addColumn('Mobils',"createdBy",{type: Sequelize.INTEGER,
        allowNull: false});
      await queryInterface.addColumn('Mobils',"deletedBy",{type: Sequelize.INTEGER,
          allowNull: true});
      await queryInterface.addColumn('Mobils',"updatedBy",{type: Sequelize.INTEGER,
      allowNull: false});
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     * 
     */
    await queryInterface.removeColumn('Mobils', 'createdBy'),
    await queryInterface.removeColumn('Mobils', 'deletedBy'),
    await queryInterface.removeColumn('Mobils', 'updateBy')
    

  }
};
