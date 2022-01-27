module.exports = {
  name: "decrease",
  description: "Decrease karma points of user",
  execute(message, args, db) {
    const user = message.mentions.users.first();
    const userId = user.id;

    if (userId === message.author.id) {
      message.channel.send(
        "You cannot decrease your own karma points... idiot."
      );
      return;
    }

    try {
      let currentPoints = db.get(userId)["points"];
      let newPoints = currentPoints - 1;
      db.update(userId, newPoints);
      message.channel.send(
        `${message.author.name} has decreased your karma points, your new total is: ${newPoints}`
      );
    } catch (error) {
      message.channel.send(
        "Something went wrong decreasing your karma points, you're lucky... for now."
      );
    }
  },
};
