const { sequelize, Post } = require("./models");

async function deletePost(postId) {
  try {
    await sequelize.sync();

    // Find the post by ID and delete it
    const post = await Post.findByPk(postId);
    if (post) {
      await post.destroy();
      console.log("Post deleted");
    } else {
      console.log("Post not found");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
  } finally {
    await sequelize.close();
  }
}

// Replace 1 with the ID of the post you want to delete
deletePost(3);
