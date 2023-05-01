const fs = require("fs");
const { execSync } = require("child_process");

fs.readdirSync("domains").forEach((file) => {
    if (file.endsWith(".json")) {
        const domain = file.slice(0, -5);

        const data = JSON.parse(fs.readFileSync(`domains/${file}`));

        for (const [recordType, recordValue] of Object.entries(data.records)) {
            if (recordType === "A" || recordType === "AAAA") {
                for (const val of recordValue) {
                    try {
                        execSync(`ping -c 1 ${val}`);
                        console.log(`PASS ${domain} ${recordType} ${val}`);
                        fs.appendFileSync("ping_results.txt", `PASS ${domain} ${recordType} ${val}\n`);
                    } catch (err) {
                        console.log(`FAIL ${domain} ${recordType} ${val}`);
                        console.log(err);
                        fs.appendFileSync("ping_results.txt", `FAIL ${domain} ${recordType} ${val}\n`);
                    }
                }
            } else if (recordType === "CNAME") {
                try {
                    execSync(`ping -c 1 ${recordValue}`);
                    console.log(`PASS ${domain} ${recordType} ${recordValue}`);
                    fs.appendFileSync("ping_results.txt", `PASS ${domain} ${recordType} ${recordValue}\n`);
                } catch(err) {
                    console.log(`FAIL ${domain} ${recordType} ${recordValue}`);
                    console.log(err);
                    fs.appendFileSync("ping_results.txt", `FAIL ${domain} ${recordType} ${recordValue}\n`);
                }
            }
        }
    }
});
