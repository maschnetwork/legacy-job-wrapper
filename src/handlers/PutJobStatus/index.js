const AWS = require("aws-sdk");
const DynamoDBClient = new AWS.DynamoDB({apiVersion: '2012-08-10', region: 'eu-west-1'});

exports.handler = async (event) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            'id' : {S: event.jobId},
            'status' : {S: event.status}
        }
    };

    try {
        const result = await DynamoDBClient.putItem(params).promise()
        return {"jobId": event.jobId, "status": event.status}
    } catch(error) {
        console.log(error)
        throw new Error("Error while saving job with id " + event.jobId)
    }
}