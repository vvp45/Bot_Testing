var bot = require("./bot").bot;
var recognizer = require("./bot").recognizer;
var db = require("../../core/db/dbconnector"); //OrintDb setup
const builder = require('botbuilder');

bot.recognizer(recognizer);

exports.default = function () {
    bot.dialog('/api/messages', function (session) {
        session.send("Hello World");
    });

    bot.dialog('help',(session) =>{
        session.endDialog(`Hi! Try asking me things like \'tell me about TKIET\', \'tell me last years result\' or \'show me the reviews of The TKIET Bot \'!`);
    }).triggerAction({
        matches: /help/i,
        onSelectAction: (session, args) => {
            session.beginDialog(args.action, args);
        }
    });
    
    bot.dialog('developers',(session) =>{
       // (function (session, result) {
            db.query("select First_Name from user").then(
                function (result) {
                console.log("query result received");
                console.log(result);
                var a;
                var dev="";
                for(a=0; a<result.length;a++)
                {
                  dev += result[a].First_Name+";";
                }
                
                session.send(dev)
                session.endDialog(`\n\nThese are the developers.'\n`);
            }
        )
        session.endDialog(`\n\nThese are the developers.'\n`);
    }).triggerAction({
        matches: /developers/i,
        onSelectAction: (session, args) => {
            session.beginDialog(args.action, args);
        }
    });
    
    bot.dialog('department',[
        (session ,args, next) =>{
            session.beginDialog('getAttendeeInfo');
            //pass control to getAttendeeInfo
            //when new diaglog completes, return control here. 
        },
        (session, result, next) => {
            session.endConversation(`Alright, Lets talk about ${result.response} department!`);
        },
    ]).triggerAction({
        matches: /department/i,
        onSelectAction: (session, args) => {
            session.beginDialog(args.action, args);
        }
    }); 
    
    bot.dialog('getAttendeeInfo',[
        (session ,args, next) =>{
                builder.Prompts.text(session,'Which department you are intrested in?');
        },
        (session, result, next) => {
                const department = result.response;
                session.endDialogWithResult({response: department});
        },
    ]); 
}
