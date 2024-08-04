import { responseAndMetadataI } from '../interfaces/other';
import { anyCall } from '../interfaces';
import { channelSubscription, subscriptionEvent, subscriptionModel } from '../interfaces/subscriptions';

/**
 * An internal method of handling calls to the P&W graphQL API
 */
class GraphQLService {
  private politicsAndWarAPIRoot = 'https://api.politicsandwar.com/graphql';

  /**
   * Calls the Politics and War V3 API with a query
   * @param {string} query The GraphQL query to make
   * @param {string} apiKey Your P&W API key
   *
   * @return {Promise<responseAndMetadataI>} Returns data to be type determined in a closer function
   * @throws {Error}
   */
  public async makeCall(query: string, apiKey: string): Promise<responseAndMetadataI> {
    if (!apiKey) throw new Error('GraphQLService: Cannot make a call without an API key!');

    const res = UrlFetchApp.fetch(`${this.politicsAndWarAPIRoot}?api_key=${apiKey}&query=${encodeURIComponent(query.replace(/([ \n])+/g, ''))}`);

    const resJSON = JSON.parse(res.getContentText());

    if (!resJSON.data) 
      throw new Error(`GraphQLService: Recieved no data from API call, ${JSON.stringify(resJSON)}`);

    return {
      data: resJSON.data,
      rateLimit: {
        // @ts-ignore
        resetAfterSeconds: Number(res.getHeaders()['X-RateLimit-Reset-After']),
        // @ts-ignore
        limit: Number(res.getHeaders()['X-RateLimit-Limit']),
        // @ts-ignore
        remaining: Number(res.getHeaders()['X-RateLimit-Remaining']),
        // @ts-ignore
        reset: Number(res.getHeaders()['X-RateLimit-Reset']),
      },
    };
  }

  /**
 * Calls the Politics and War V3 API with a mutation
 * @param {string} query The GraphQL query to make
 * @param {string} apiKey Your P&W API key
 * @param {string} botKey Your P&W bot key
 *
 * @return {Promise<responseAndMetadataI>} Returns data to be type determined in a closer function
 * @throws {Error}
 */
  public async makeMutationCall(query: string, apiKey: string, botKey: string): Promise<responseAndMetadataI> {
    if (!botKey) throw new Error('GraphQLService: Cannot make a call without an botKey!');
    if (!apiKey) throw new Error('GraphQLService: Cannot make a call without an API key!');

    const options = {
      'method' : 'get',
      "headers" : {
        'X-Bot-Key': `${botKey}`,
        'X-Api-Key': `${apiKey}`,
      }
    };

    // @ts-ignore
    const res = UrlFetchApp.fetch(`${this.politicsAndWarAPIRoot}?api_key=${apiKey}&query=${encodeURIComponent(query.replace(/([ \n])+/g, ''))}`, options);

    const resJSON = JSON.parse(res.getContentText());

    if (!resJSON.data) 
      throw new Error(`GraphQLService: Recieved no data from API call, ${JSON.stringify(resJSON)}`);

    return {
      data: resJSON.data,
      rateLimit: {
        // @ts-ignore
        resetAfterSeconds: Number(res.getHeaders()['X-RateLimit-Reset-After']),
        // @ts-ignore
        limit: Number(res.getHeaders()['X-RateLimit-Limit']),
        // @ts-ignore
        remaining: Number(res.getHeaders()['X-RateLimit-Remaining']),
        // @ts-ignore
        reset: Number(res.getHeaders()['X-RateLimit-Reset']),
      },
    };
  }

  /**
   * Takes a query and outputs query Parameters
   * @param {anyCall} queryParameters Any one of the five queries that take Parameters
   * @param {string} enumeratorParameters Parameters who are represented as strings, but not sent as a string;
   * they are treated like numbers, with no quotes.
   * @return {string}
   */
  public generateParameters(queryParameters: anyCall, enumeratorParameters: string[] = []): string {
    const parameters: string[] = [];

    for (const [parameter, value] of Object.entries(queryParameters)) {
      if (value === undefined) continue;

      if (typeof value == 'string' && !enumeratorParameters.includes(parameter)) {
        parameters.push(`${parameter}: "${value}"`);
      } else if (typeof value == 'object' && Array.isArray(value)) {
        let interpretedValue = `${parameter}: [`;

        for (const v of value) {
          if (typeof v == 'string') {
            interpretedValue += `"${v}",`;
          } else {
            interpretedValue += `${v},`;
          }
        }

        interpretedValue.slice(0, -1);
        interpretedValue += ']';

        parameters.push(interpretedValue);
      } else if (typeof value == 'object' && !Array.isArray(value)) {
        // for orderBy handling

        let interpretedValue = '';
        interpretedValue += `${parameter}: {`;

        for (const [k, v] of Object.entries(value)) {
          interpretedValue += `${k}: ${v},`;
        }

        interpretedValue = interpretedValue.slice(0, -1);
        interpretedValue += '}';

        parameters.push(interpretedValue);
      } else {
        parameters.push(`${parameter}: ${value}`);
      }
    }

    if (parameters.length == 0) return '';

    const joinedParameters = parameters.join(',');
    return `(${joinedParameters})`;
  }
}

export default new GraphQLService();
