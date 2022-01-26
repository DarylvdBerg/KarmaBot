module.exports = {
    name: "points",
    description: "Get your current karma points",
    execute(message, args, instance) {
        const id = message.author.id;
        const points = instance.get(id);
        if(points !== null && points !== undefined) {
            message.channel.send(`Your karma points are: ${points}`)
        } else {
            message.channel.send(`Karma does not know you`);
        }
    }
}