const fs = require("fs");
const path = require("path");

const optout = require("../optout.js");

const directoryPath = path.join(__dirname, "../domains");

let combinedArray = [];

fs.readdir(directoryPath, function (err, files) {
    if(err) throw err;

    function removeValue(value, index, arr) {
        if(value === "reserved") {
            arr.splice(index, 1);
            return true;
        }

        return false;
    }

    files.filter(removeValue);

    files.forEach(function (file) {
        const filePath = path.join(directoryPath, file);

        fs.readFile(filePath, "utf8", (err, data) => {
            if(err) throw err;

            const dataArray = [JSON.parse(data)];

            for(const item of dataArray) {
                delete item.$schema;

                item.owner.email = item.owner.email.replace(/@/, " (at) ");
            }

            combinedArray = combinedArray.concat(dataArray);

            if(combinedArray.length === files.length) {
                const filteredData = combinedArray.filter(item => !optout.includes(item.owner.email.toLowerCase()));

                fs.writeFile("raw-api/index.json", JSON.stringify(filteredData), (err) => {
                    if(err) throw err;
                })
            }
        })
    })
})
