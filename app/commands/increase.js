module.exports = {
  name: "increase",
  description: "Increase karma points of user",
  execute(message, args, db) {
    const user = message.mentions.users.first();
    const userId = user.id;

    if (userId === message.author.id) {
      try {
        let currentPoints = db.get(message.author.id);
        currentPoints = currentPoints - 10;
        db.update(message.author.id, currentPoints);
        message.channel.send(
          "You cannot increase your own points >:( You're points are decreased by 10!"
        );
      } catch (error) {
        message.channel.send(
          "I would've decreased your points by 10, but something went wrong... bitch"
        );
      }
      return;
    }

    try {
      let currentPoints = db.get(userId);
      let newPoints = currentPoints + 1;

      db.update(userId, newPoints);
      message.channel.send(
        `${message.author.username} has increased your karma points, your new total is: ${newPoints}`
      );
    } catch (error) {
      message.channel.send(
        `Something went wrong when trying to increase your karma points`
      );
    }
  },
};
