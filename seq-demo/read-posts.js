const { sequelize, Post, User } = require("./models");

async function readPosts() {
  try {
    await sequelize.sync();

    // Retrieve all posts with their associated user
    const posts = await Post.findAll({ include: User });
    console.log("All posts:", JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error("Error reading posts:", error);
  } finally {
    await sequelize.close();
  }
}

readPosts();
