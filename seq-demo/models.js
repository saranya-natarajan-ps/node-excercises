const { Sequelize, DataTypes } = require("sequelize");

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize("test_db", "root", "redApple6^", {
  host: "localhost",
  dialect: "mysql",
});

// Define the User model
const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

// Define the Post model
const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Set up associations
User.hasMany(Post);
Post.belongsTo(User);

// Export the models and the Sequelize instance
module.exports = {
  sequelize,
  User,
  Post,
};
