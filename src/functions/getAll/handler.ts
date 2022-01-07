import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { getAllData } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const getALLData: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
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

  const result = await getAllData();
  return formatJSONResponse(200, {
    message: result,
  });
};

export const main = middyfy(getALLData);
