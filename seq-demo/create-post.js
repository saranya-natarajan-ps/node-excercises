const { sequelize, User, Post } = require("./models");

async function createPost() {
  try {
    await sequelize.sync();
    
    let user = await User.findByPk(1);
    if (!user) {
      user = await User.create({
        name: "John Doe",
        email: "john.doe@example.com",
      });
    }

    // Create a new post associated with the user
    const post = await Post.create({
      title: "First Post",
      content: "This is the content of the first post.",
      UserId: user.id, // Associate post with user
    });

    console.log("Post created:", post.toJSON());
  } catch (error) {
    console.error("Error creating post:", error);
  } finally {
    await sequelize.close();
  }
}

createPost();
