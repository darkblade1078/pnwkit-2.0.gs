import { Kit } from "../../..";
import { messageResult } from "../../interfaces/v2/sendMessage";


export default async function sendMessage(this: Kit, recipientID: number, subject: string, message: string): Promise<messageResult> {
    if (!this.apiKey) throw new Error('SuperAgent: Cannot make a call without an API key!');

    const formData  = {
        'to': recipientID,
        'subject': subject,
        'message': message
      };
    const options = {
        'method' : 'post',
        'payload' : formData
    };

    // @ts-ignore
    const res = await UrlFetchApp.fetch(`https://politicsandwar.com/api/send-message?key=${this.apiKey}`, options);

    const resJSON = JSON.parse(res.getContentText());

    if (!resJSON)
      throw new Error(`GraphQLService: Recieved no data from API call, ${JSON.stringify(resJSON)}`);

    if (!resJSON.success) throw new Error(`SuperAgent: Received no data from API call, ${JSON.stringify(resJSON.body)}`);

    return resJSON;
}