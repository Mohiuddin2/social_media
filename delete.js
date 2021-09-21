const publisherSchema = new mongoose.Schema({
    companyName: String,
    firstParty: Boolean,
    website: String
}),

const gameSchema = new mongoose.Schema({
    title: String,
    publisher: publisherSchema
}),


async function updatePublisher(gameId) {
    const game = await Game.findById(gameId);
    game.publisher.companyName = 'Epic Games';
    game.publisher.website = 'epicgames';
    game.save();
}