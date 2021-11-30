const AWS = require("aws-sdk");

exports.handler = async (event) => {
    //Todo: Submit Request to External API here
    
    const response = {
        "jobId": event.jobId
    }
    
    return response;
}
