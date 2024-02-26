require('dotenv').config();
const{Client, IntentsBitField} = require("discord.js");
const readline = require('readline');
const mongoose = require('mongoose');
const fs = require('fs');
const eventHandler = require('./handlers/eventHandler')



// Read the contents of the file
const client = new Client({
        intents: [ 
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers, 
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});


function convertToSnakeCase(input) {
    return input.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/_/g, ' ').replace(/\b\w/g, function(c) {
        return c.toUpperCase();
    }).replace(/ /g, '_');
}
fs.readFile('list.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Split the file contents into an array of lines
    const fileContents = data.split('\n');

    // Setup event listener for message creation
    client.on('messageCreate', (msg) => {
        if (msg.author.bot) {
            return; // Ignore messages from other bots
        }
        const userInputSnakeCase = convertToSnakeCase(msg.content);
        // Iterate over each line in fileContents array
        for (const line of fileContents) {
            // Check if message content matches the line
            if (userInputSnakeCase === convertToSnakeCase(line.trim())) { // Trim whitespace for comparison
                // Reply with a link to Terraria wiki page
                msg.reply("https://terraria.wiki.gg/wiki/" + userInputSnakeCase);   
                break; // Exit loop once a match is found
            }
        }
    });
});
fs.readFile('calamity.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Split the file contents into an array of lines
    const fileContents = data.split('\n');

    // Setup event listener for message creation
    client.on('messageCreate', (msg) => {
        if (msg.author.bot) {
            return; // Ignore messages from other bots
        }
        const userInputSnakeCase = convertToSnakeCase(msg.content);
        // Iterate over each line in fileContents array
        for (const line of fileContents) {
            // Check if message content matches the line
            if (userInputSnakeCase === convertToSnakeCase(line.trim())) { // Trim whitespace for comparison
                // Reply with a link to Terraria wiki page
                msg.reply("https://calamitymod.wiki.gg/wiki/" + userInputSnakeCase);   
                break; // Exit loop once a match is found
            }
        }
    });
});

(async()=>{
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB.");
    
        eventHandler(client);

        
    client.login(process.env.TOKEN);
    } catch (error) {
        console.log('Error:',error);
    }

})();

