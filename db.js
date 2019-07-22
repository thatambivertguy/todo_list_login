const Sequelize =require('sequelize')
const db= new Sequelize({
    dialect : 'sqlite',
    storage: 'users.db'
})
const Users = db.define('user',{
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fbAccessToken: {
        type: Sequelize.STRING,
      },
      ghAccessToken: {
        type: Sequelize.STRING,
      },
    })
    const Tasks = db.define('task',{
      // username: {
      //     type: Sequelize.STRING,
      //     // unique: false,
      //     allowNull: true,
      //   },
        task : {
          type: Sequelize.STRING,
          allowNull: false,
          // unique : false,
        }
       })
       const completed = db.define('completed',{
        // username: {
        //     type: Sequelize.STRING,
        //     // unique: false,
        //     allowNull: true,
        //   },
          task : {
            type: Sequelize.STRING,
            allowNull: false,
            // unique : false,
          }
         })
    module.exports = {
        db,
        Users,
        Tasks,
        completed
      }