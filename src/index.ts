import { ApiClient } from "./client";
import { buildFormData, encodeUrlQuery } from "./client-helper";


export const createApiClient: (args: {baseUrl: string}) => ApiClient<FetchRequestInit> = ({baseUrl}: {baseUrl: string}) => ({
  request: async (args, o): Promise<any> => {
    const {headers, httpMethod, queryParameters, uri, requestBody} = args
    const requestUrl = encodeUrlQuery(baseUrl + uri, queryParameters)
    const response = await fetch(requestUrl, {
      body: headers['Content-Type']?.includes('multipart/form-data') ? buildFormData(requestBody) as unknown as FormData : JSON.stringify(requestBody),
      headers,
      method: httpMethod,
      ...o
    });
    return await response.json();
  },
});
