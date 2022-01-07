import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { updateDataById } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const updatedata: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
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
  const { id, name } = event.body;
  const data = {
    id,
    name,
  };

  const result = await updateDataById(data);
  return formatJSONResponse({
    message: "Data is Updated Successfully !!!!!!!",
    result,
  });
};

export const main = middyfy(updatedata);
