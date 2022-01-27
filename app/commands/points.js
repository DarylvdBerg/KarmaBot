module.exports = {
    name: "points",
    description: "Get your current karma points",
    execute(message, args, db) {
        const id = message.author.id;
        const data = db.get(id);
        if(data !== null && data !== undefined) {
            message.channel.send(`Your karma points are: ${data['points']}`);
        } else {
            message.channel.send(`Karma does not know you`);
        }
    }
}