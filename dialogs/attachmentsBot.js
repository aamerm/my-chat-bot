const { ActivityHandler, ActionTypes, ActivityTypes, CardFactory } = require('botbuilder');
const fs = require('fs');
const path = require('path');

class AttachmentsBot extends ActivityHandler {
    constructor() {
        super();

        this.onMessage(async (context, next) => {
            console.log(`${ context.activity.text }`);

            const reply = { type: ActivityTypes.message };
            reply.text = 'Here is your pic of the day';
            reply.attachments = [AttachmentsBot.getInternetAttachment()];

            await context.sendActivity(reply);
            await next();
        });
    }

    static getInlineAttachment() {
        const imageData = fs.readFileSync(path.join(__dirname, '../resources/ssh.jpeg'));
        const base64Image = Buffer.from(imageData).toString('base64');

        return {
            name: 'ssh.jpeg',
            contentType: 'image/jpeg',
            contentUrl: `data:image/jpeg;base64,${ base64Image }`
        };
    };

    static getInternetAttachment() {
        // NOTE: The contentUrl must be HTTPS.
        return {
            name: 'architecture-resize.png',
            contentType: 'image/png',
            contentUrl: 'https://docs.microsoft.com/en-us/bot-framework/media/how-it-works/architecture-resize.png'
        };
    };
}

module.exports.AttachmentsBot = AttachmentsBot;
