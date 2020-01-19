const AWS = require("aws-sdk")

const space = new AWS.Endpoint("nyc3.digitaloceanspaces.com")

const s3 = new AWS.S3({
    endpoint: space,
    accessKeyId: "AJI44VAODNQTV43TNOEQ",
    secretAccessKey: "iZ43dQIm5R+cYP7PIqDHOKEk89/M9BNApUe9JBqMq7w"
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
