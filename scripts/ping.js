const fs = require("fs");
const { exec } = require("child_process");

fs.readdirSync("domains").forEach(file => {
    if (file.endsWith(".json")) {
        const domain = file.slice(0, -5);

        const data = JSON.parse(fs.readFileSync(`domains/${file}`));

        for (const [recordType, recordValue] of Object.entries(data.records)) {
            if (recordType === "A" || recordType === "AAAA") {
                for (const value of recordValue) {
                    const info = `${domain} ${recordType} ${value}`;

                    try {
                        const { stdout, stderr, status } = exec(`ping -c 1 ${value}`);

                        if (status === 0) {
                            console.log(`PASS ${info}`);
                            fs.appendFileSync("ping_results.txt", `PASS ${info}\n`);
                        } else {
                            console.log(`FAIL ${info}`);
                            console.log(stderr);
                            fs.appendFileSync("ping_results.txt", `FAIL ${info}\n`);
                        }
                    } catch (error) {
                        console.log(`FAIL ${info}: ${error}`);
                        console.log(stderr);
                        fs.appendFileSync("ping_results.txt", `FAIL ${info}: ${error}\n`);
                    }
                }
            } else if (recordType === "CNAME") {
                const info = `${domain} ${recordType} ${recordValue}`;

                try {
                    const { stdout, stderr, status } = exec(`ping -c 1 ${recordValue}`);

                    if (status === 0) {
                        console.log(`PASS ${info}`);
                        fs.appendFileSync("ping_results.txt", `PASS ${info}\n`);
                    } else {
                        console.log(`FAIL ${info}`);
                        console.log(stderr);
                        fs.appendFileSync("ping_results.txt", `FAIL ${info}\n`);
                    }
                } catch (error) {
                    console.log(`FAIL ${info}: ${error}`);
                    console.log(stderr);
                    fs.appendFileSync("ping_results.txt", `FAIL ${info}: ${error}\n`);
                }
            }
        }
    }
});
