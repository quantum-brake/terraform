const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
    region: process.env.AWS_REGION,
    apiVersion: "2012-08-10"
});

exports.handler = (event, context, callback) => {
    const params = {
        TableName: process.env.TABLE_NAME
    };
    dynamodb.scan(params, (err, data) => {
        if (err) {
            console.log(err);
            callback(err);
        } else { const authors = data.Items.map(item => {
            return {
                id: item.id.N,
                First_Name: item.First_Name.S,
                Last_Name: item.Last_Name.S
            };
        });
            callback(null, authors);
        }
    });
};