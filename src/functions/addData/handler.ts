import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { addDataFun } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";
import { v4 } from "uuid";
import schema from "./schema";

const addDataa: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const { name, fatherName, address, phone } = event.body;
    const id = v4();
    if (
      name === undefined ||
      name === "" ||
      fatherName === undefined ||
      fatherName == "" ||
      address == undefined ||
      address == "" ||
      phone == undefined ||
      phone == ""
    ) {
      return formatJSONResponse(400, {
        message: "Bad request",
      });
    } else {
      const param = {
        id,
        name,
        fatherName,
        address,
        phone,
      };

      let x = await addDataFun(param);
      return formatJSONResponse(200, {
        message: "Data is added",
      });
    }
  } catch (error) {
    return formatJSONResponse(500, {
      error: "internal server error ",
    });
  }
};
export const main = middyfy(addDataa);
