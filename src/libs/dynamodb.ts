const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000",
});

export const addDataFun = async (params) => {
  //   const data = {
  //     TableName: "NaveedTable",
  //     Item: params,
  //   };
  // try {
  const data1 = dynamodb
    .put({
      TableName: "NaveedTable",
      Item: params,
    })
    .promise();
  console.log(data1);
  return data1;
  // } catch (err) {
  //   return err;
  // }
};

export const getByIdData = async (event) => {
  const data = {
    TableName: "NaveedTable",
    KeyConditionExpression: "id = :a",
    ExpressionAttributeValues: {
      ":a": event,
    },
  };
  const result = await dynamodb.query(data).promise();
  return result;
};

export const updateDataById = async (event) => {
  const data = {
    TableName: "NaveedTable",
    Key: {
      id: event.id,
    },
    UpdateExpression: "set fatherName = :anything",
    ExpressionAttributeValues: {
      ":anything": event.name,
    },
  };
  const result = await dynamodb.update(data).promise();
  return result;
};
export const deleteDataById = async (event) => {
  const result = await getByIdData(event);
  console.log(
    result,
    "hdsakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
  );
  if (result.Item != null) {
    try {
      const data = {
        TableName: "NaveedTable",
        Key: {
          id: event,
        },
      };
      await dynamodb.delete(data).promise();
    } catch (err) {
      return "some thing wrong";
    }
    return "Data is Deleted !!!!!!!!" + "  ; ";
  }
  return "data not found";
};

export const getAllData = async () => {
  const result = await dynamodb
    .scan({
      TableName: "NaveedTable",
    })
    .promise();
  return result;
};
