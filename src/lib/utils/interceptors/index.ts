import { create } from "domain";

type ParamsInput = {
  data: {
    params: {
      pagination: {
        page: number | string;
        perPage: number | string;
      };
      sort: { field: string; order: string };
      filter: {
        [key: string]: string | string[];
      };
      meta: undefined;
    };
  };
};

type ResponseOutput = {
  data: { [key: string]: unknown }[];
  total: number;
};

type MethodType =
  | "getList"
  | "getOne"
  | "getMany"
  | "getManyReference"
  | "create"
  | "update"
  | "updateMany"
  | "delete"
  | "deleteMany";

export function ParseRequestIdentifier<T>(value: T): T {
  const methodType = value.data.method;

  console.log(value);

  switch (methodType as MethodType) {
    case "getList":
      if (value.data.params.sort.field === "id") {
        value.data.params.sort.field = "identifier";
      }
    case "getOne":
      console.log();
      
    case "getMany":
    case "getManyReference":
    case "create":
    case "update":
    case "updateMany":
    case "delete":
    case "deleteMany":
  }

  return value;
}

export function ParseResponseIdentifier<T>(response: T): T {
  return {
    data: (response as ResponseOutput).data.map((object) => {
      if (object["identifier"] !== null) {
        const newObject = Object.assign({ id: object["identifier"] }, object);
        delete newObject["identifier"];
        return newObject;
      }

      return object;
    }),
    total: (response as ResponseOutput).total,
  } as T;
}
