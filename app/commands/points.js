module.exports = {
    name: "karma",
    description: "Get your current karma points",
    execute(message, args, db) {
        const id = message.author.id;
        const points = db.get(id);
        if(points !== null && points !== undefined) {
            message.channel.send(`Your karma points are: ${points}`);
        } else {
            message.channel.send(`Karma does not know you`);
        }
    }
}