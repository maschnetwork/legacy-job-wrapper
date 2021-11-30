const AWS = require("aws-sdk");
const stepFunctions = new AWS.StepFunctions();

exports.handler = async (event, context) => {
    let jobId;

    try {
      jobId = JSON.parse(event.body).jobId
    } catch(error) {
        console.log(error)
        return getResponse(400, 'Invalid Job-Id provided')
    }

    const params = {
        stateMachineArn: process.env.STEP_FUNCTION_ARN,
        name: jobId,
        input: JSON.stringify({"jobId": jobId})
    };

    try {
        await stepFunctions.startExecution(params).promise()
        return getResponse(200, 'Successfully started Job-Execution');
    } catch (error){
        console.log(error)

        if (error.code == 'ExecutionAlreadyExists') {
            return getResponse(400, 'Execution already exists');
        } else {
            return getResponse(500, 'Problem while starting Job-Execution');
        }
    }
}

function getResponse(statusCode, message) {
    return {
        statusCode: statusCode,
        body: JSON.stringify({message: message})
    };
}
