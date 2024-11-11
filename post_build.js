const zl = require("zip-lib");

zl.archiveFolder("./build", "./website.zip").then(function () {
    console.log("done");
}, function (err) {
    console.log(err);
});