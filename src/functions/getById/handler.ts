import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { getByIdData } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const getById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  // const { name, fatherName, address, phone } = event.body;
  // const id = v4();
  // const param = {
  //   id,
  //   name,
  //   fatherName,
  //   address,
  //   phone,
  // };
  const { id } = event.pathParameters;

  const result = await getByIdData(id);
  return formatJSONResponse(200, {
    message: result,
  });
};

export const main = middyfy(getById);
