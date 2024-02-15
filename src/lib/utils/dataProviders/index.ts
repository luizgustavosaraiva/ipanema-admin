import { dataProvider as prismaDataProvider } from "ra-data-simple-prisma";

import {
  ParseRequestIdentifier,
  ParseResponseIdentifier,
} from "../interceptors";

export function dataProvider(endpoint: string) {
  return prismaDataProvider(endpoint, {
    axiosInterceptors: {
      request: [
        {
          onFulfilled: ParseRequestIdentifier,
        },
      ],
      response: [
        {
          onFulfilled: ParseResponseIdentifier,
        },
      ],
    },
  });
}
