const axios = require("axios");

module.exports = {
  config: {
    name: "cat",
    version: "1.1",
    author: "NZ R",
    category: "Chat~AI",
    cooldown: 0,
    role: 0,
    guide: {
      en: "{p}chat hi\nfor initiating conversation: {p}chat hi"
    }
  },
  nehalovesMetaApiRequest: async function (question) {
    try {
      const res = await axios.post(
        'https://api.simsimi.vn/v2/simtalk',
        new URLSearchParams({
          'text': question,
          'lc': 'bn'
        })
      );

      if (res.status > 200)
        throw new Error(res.data.success);

      return res.data.message;
    } catch (error) {
      throw error;
    }
  },
  nehalovesMetaHandleCommand: async function ({ args, message }) {
    try {
      const name = args.join(' ');

      try {
        const result = await this.nehalovesMetaApiRequest(name);
        message.reply(result, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            messageID: info.messageID,
            author: message.senderID
          });
        });
      } catch (error) {
        console.error(error);
        message.reply('Chup tumi pocha tomar sathe kotha nai amak msg dio na 😾');
      }
    } catch (error) {
      message.reply('Chup tmr sathe kotha bolbo na! 😾: ' + error.message);
    }
  },
  onStart: function ({ args, message }) {
    return this.nehalovesMetaHandleCommand({ args, message });
  },
  onReply: function ({ args, message }) {
    return this.nehalovesMetaHandleCommand({ args, message });
  }
};
