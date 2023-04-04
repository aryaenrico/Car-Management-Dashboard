'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * 
     */
    await queryInterface.changeColumn('Users', 'email',{
      type:Sequelize.STRING,
      allowNull:false,
      unique: true
    });
    await queryInterface.changeColumn('Users', 'password',{
      type:Sequelize.TEXT,
      allowNull:false
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('Users', 'email',{
      type:Sequelize.STRING,
    });
    await queryInterface.changeColumn('User', 'password',{
      type:Sequelize.TEXT,
    });
  }
};
