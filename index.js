const { CommandoClient } = require('discord.js-commando');
const path = require('path');

// Set up the bot to report on the craftory discord and with the ? as a
// listener for commands. 
const client = new CommandoClient({
	commandPrefix: '?',
	owner: '197773056557580288',
	invite: 'https://discord.gg/bRCvFy9',
});

// Register any needed groups for the commands
// NOTE: If you add any folder with commands make sure to
//		 add the new folder here and a decent description.
client.registry
	.registerDefaultTypes()
	.registerGroups([
		// foldername, description
		['command-template','Example command to help with new command creation'],
		['wiki', 'Commands related to wiki actions'],
		['wiki-machines', 'Commands related to machines on the wiki'],
		['wiki-ores', 'Commands related to ores on the wiki'],
		['wiki-items', 'Commands related to itmes on the wiki'],
		['plugin', 'Commands related to general plugin information']
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

// Once the bot is initialized report in console and set the bots
// activity as needed. 
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('Crafting Craftory');
});

// Read all incoming messages and remove any message needed
client.on('message', message => {
	// Remove messages that start with ? after 1 second
	if (message.content.startsWith("?")) {
		message.delete({timeout: 1000});
    }
});

// Write any errors to console
client.on('error', console.error);

// Login to the discords using a env 
client.login(process.env.token);