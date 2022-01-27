module.exports = {
  name: "increase",
  description: "Increase karma points of user",
  execute(message, args, db) {
    const user = message.mentions.users.first();
    const userId = user.id;

    if (userId === message.author.id) {
      message.channel.send("You cannot increase your own points >:(");
      return;
    }

    let currentPoints = db.get(userId)["points"];
    let newPoints = currentPoints + 1;

    try {
      db.update(id, newPoints);
      message.channel.send(
        `Karma points have been increased, your new total is: ${newPoints}`
      );
    } catch (error) {
      message.channel.send(
        `Something went wrong when trying to increase your karma points`
      );
    }
  },
};
