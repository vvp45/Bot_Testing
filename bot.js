const builder = require('botbuilder');
require('dotenv-extended').load();
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});


const bot = new builder.UniversalBot(connector, [
    (session, args, next) => {
        const botName = 'TKIET Bot';
        const description = "I'm a Bot who can provide you information about College and Admission process!";

        session.send(`Hi there! I'm ${botName}`);
        session.send(`In short, here's what I can do:\n\n${description}`);

        builder.Prompts.text(session,`What's your name?`);
    },
    (session, result, next) => {
        session.endConversation(`Welcome, ${result.response}`);
    } 
]);

var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);

const botHandler = connector.listen();
exports.bot = bot;
exports.recognizer = recognizer;
exports.botHandler = botHandler;