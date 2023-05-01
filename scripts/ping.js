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
                        exec(`ping -c 1 ${value}`);
                        console.log(`PASS ${info}`);
                        fs.appendFileSync("ping_results.txt", `PASS ${info}\n`);
                    } catch {
                        console.log(`FAIL ${info}`);
                        fs.appendFileSync("ping_results.txt", `FAIL ${info}\n`);
                    }
                }
            } else if (recordType === "CNAME") {
                const info = `${domain} ${recordType} ${recordValue}`;

                try {
                    exec(`ping -c 1 ${recordValue}`);
                    console.log(`PASS ${info}`);
                    fs.appendFileSync("ping_results.txt", `PASS ${info}\n`);
                } catch {
                    console.log(`FAIL ${info}`);
                    fs.appendFileSync("ping_results.txt", `FAIL ${info}\n`);
                }
            }
        }
    }
});
