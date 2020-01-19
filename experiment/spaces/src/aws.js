const AWS = require("aws-sdk")

const space = new AWS.Endpoint("nyc3.digitaloceanspaces.com")

const s3 = new AWS.S3({
    endpoint: space,
    accessKeyId: "",
    secretAccessKey: ""
})

var params = {
    Body: "The contents of the file",
    Bucket: "routerating",
    Key: "deleteme/file.txt",
};

s3.putObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
});
