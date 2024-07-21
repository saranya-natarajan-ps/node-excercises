const { sequelize, User, Post } = require("./models");

async function syncAndSeed() {
  try {
    await sequelize.sync({ force: true }); // This will drop the tables and re-create them
    console.log("Database synced");

    // Create a sample user
    const user = await User.create({
      name: "John Doe",
      email: "john.doe@example.com",
    });

    // Create some posts for the user
    await Post.create({
      title: "My First Post",
      content: "This is the content of my first post.",
      UserId: user.id,
    });

    await Post.create({
      title: "Another Post",
      content: "This is some more content.",
      UserId: user.id,
    });

    console.log("Sample data created");

    // Query and log the created data to verify
    const users = await User.findAll({
      include: Post,
    });
    console.log(JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error syncing and seeding database", error);
  } finally {
    await sequelize.close();
  }
}

syncAndSeed();
