const AWS = require("aws-sdk");

exports.handler = async (event) => {
    //Todo: Get Result from External-Source Here
    //States: IN_PROGRESS, SUCCESS, FAILED

    const response = {
        "status": "SUCCESS",
        "jobId": event.jobId
    }
    
    return response;
}
