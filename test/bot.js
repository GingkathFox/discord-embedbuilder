const {
  Client,
  MessageEmbed,
} = require('discord.js');
const {
  token
} = require('./settings.json');
const client = new Client();
const {
  EmbedBuilder,
  PageUpdater
} = require('../out/index');

client.on('message', async message => {
  if (message.author.bot || !message.content.startsWith('test')) return;
  const multiFields = [{
    name: 'test',
    value: 123
  }, {
    name: 'test2',
    value: 321
  }];
  const help = new EmbedBuilder(message.channel);
  const other = new EmbedBuilder(message.channel);
  help.calculatePages(23, 3, (embed, i) => {
    embed.addField(i, Math.floor(Math.random() * 23));
  });
  other.calculatePages(20, 8, (embed, i) => {
    embed.addField(i + ' other', Math.floor(Math.random() * 4));
  });
  other.setTitle('Other Commands');
  help.addFields(multiFields);
  help.addEmoji('❗', sent => {
    sent.channel.send('wassup');
  });
  help
    .setTitle('Commands')
    .concatEmbeds(other.embeds)
    .build();
});

client.login(token);