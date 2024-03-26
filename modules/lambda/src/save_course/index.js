const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
    region: process.env.AWS_REGION,
    apiVersion: "2012-08-10"
});

const replaceAll = (str, find, replace) => {
    return str.replace(new RegExp(find, "g"), replace);
};
exports.handler = (event, context, callback) => {
    const id = replaceAll(event.title, " ", "-").toLowerCase();
    const params = {
        Item: {
            id: {
                S: id
            },
            Title: {
                S: event.title
            },
            AuthorId: {
                S: event.authorId
            }
        },
        TableName: process.env.TABLE_NAME
    };
    dynamodb.putItem(params, (err, data) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            callback(null, {
                id: params.Item.id.S,
                title: params.Item.Title.S,
                authorId: params.Item.AuthorId.S
            });
        }
    });
};