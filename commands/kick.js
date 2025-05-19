module.exports = {
    name: 'kick',
    description: 'Kick a user from the server',
    execute: async (message, args) => {
      if (!message.member.permissions.has('KickMembers')) {
        return message.reply("❌ You don't have permission to kick members.");
      }
  
      const member = message.mentions.members.first();
      if (!member) {
        return message.reply("❌ Please mention a user to kick.");
      }
  
      try {
        await member.kick();
        message.channel.send(`👢 ${member.user.tag} has been kicked.`);
      } catch (error) {
        console.error(error);
        message.reply("❌ I couldn't kick that user.");
      }
    }
  };
  