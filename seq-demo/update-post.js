const { sequelize, Post } = require("./models");

async function updatePost(postId) {
  try {
    await sequelize.sync();

    // Find the post by ID and update its title
    const post = await Post.findByPk(postId);
    if (post) {
      post.title = "Third Post";
      await post.save();
      console.log("Post updated:", post.toJSON());
    } else {
      console.log("Post not found");
    }
  } catch (error) {
    console.error("Error updating post:", error);
  } finally {
    await sequelize.close();
  }
}

// Replace 1 with the ID of the post you want to update
updatePost(3);
