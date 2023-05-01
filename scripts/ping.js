const { exec } = require("child_process");
const fs = require("fs");

const ping = (host) => {
    return new Promise((resolve, reject) => {
        exec(`ping -c 1 ${host}`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
};

fs.readdirSync("domains").forEach(file => {
    if (file.endsWith(".json")) {
        const domain = file.slice(0, -5);

        const data = JSON.parse(fs.readFileSync(`domains/${file}`));

        for (const [recordType, recordValue] of Object.entries(data.records)) {
            if (recordType === "A" || recordType === "AAAA") {
                for (const value of recordValue) {
                    const info = `${domain} ${recordType} ${value}`;

                    ping(value)
                        .then(({ stdout, stderr }) => {
                            console.log(`PASS ${info}`);
                            fs.appendFileSync("ping_results.txt", `PASS ${info}\n`);
                        })
                        .catch((error) => {
                            console.log(`FAIL ${info}`);
                            fs.appendFileSync("ping_results.txt", `FAIL ${info}\n`);
                        });
                }
            } else if (recordType === "CNAME") {
                const info = `${domain} ${recordType} ${recordValue}`;

                ping(recordValue)
                    .then(({ stdout, stderr }) => {
                        console.log(`PASS ${info}`);
                        fs.appendFileSync("ping_results.txt", `PASS ${info}\n`);
                    })
                    .catch((error) => {
                        console.log(`FAIL ${info}`);
                        fs.appendFileSync("ping_results.txt", `FAIL ${info}\n`);
                    });
            }
        }
    }
});
