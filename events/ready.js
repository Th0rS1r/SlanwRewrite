const chalk = require('chalk');
const activities = require('../includes/json/activity');

module.exports = client => { // eslint-disable-line no-unused-vars

  console.log(chalk.bgGreen.black(`${client.user.username} is online on ${client.guilds.size} servers!`));
  console.log(chalk.bgGreen.black('The connection was successful. Press CTRL+C to exit.'));
  /*client.setInterval(() => {
		const activity = activities[Math.floor(Math.random() * activities.length)];
		client.user.setActivity(activity.text, { type: activity.type });
	}, 900000);*/
  //client.user.setStatus("idle");
  client.user.setActivity(`${process.env.prefix}help`, true);
 
};
