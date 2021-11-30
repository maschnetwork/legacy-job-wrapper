const AWS = require("aws-sdk");
const DynamoDBClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10', region: 'eu-west-1'});

exports.handler = async (event) => {

    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {'id' : event.pathParameters.id}
    };

    try {
        const result = await DynamoDBClient.get(params).promise()
        if(!result.Item) return getResponse(404, "Job not found")
        switch(result.Item.status){
            case "SUCCESS":
                return getResponse(200, "Job finished")
            case "STARTED":
                return getResponse(202, "Job still in progress...")
            default:
                return getResponse(500, "Job in a non valid state")
        }
    } catch(error) {
        console.log(error)
        return getResponse(500, "Error while retrieving the result")
    }
}

function getResponse(statusCode, message) {
    return {
        statusCode: statusCode,
        body: JSON.stringify({message: message})
    };
}
