module.exports = {
    name: 'ban',
    description: 'Ban a user from the server',
    execute: async (message, args) => {
      if (!message.member.permissions.has('BanMembers')) {
        return message.reply("❌ You don't have permission to ban members.");
      }
  
      const member = message.mentions.members.first();
      if (!member) {
        return message.reply("❌ Please mention a user to ban.");
      }
  
      try {
        await member.ban();
        message.channel.send(`🔨 ${member.user.tag} has been banned.`);
      } catch (error) {
        console.error(error);
        message.reply("❌ I couldn't ban that user.");
      }
    }
  };
  