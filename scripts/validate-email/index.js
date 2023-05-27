const dns = require("dns");
const minimist = require("minimist");
const util = require("util");

const argv = minimist(process.argv.slice(2));

async function validate() {
    try {
        const email = argv.email;

        if(!email) return console.log({
            "success": false,
            "message": "No email provided!"
        })

        const domain = email.split("@").pop();

        const validEmail = validateEmail(email);

        if(!validEmail) return console.log({
            "success": false,
            "task": "matches_format",
            "message": "The email address does not match the correct format!"
        })

        const getMXRecords = util.promisify(dns.resolveMx);
        let mxRecords = [];

        try {
            mxRecords = await getMXRecords(domain);
        } catch {}

        if(!mxRecords.length) return console.log({
            "success": false,
            "task": "mx_exists",
            "message": `No MX records exist for the domain ${domain}!`
        })

        const result = {
            "success": true,
            "email": email,
            "test_results": {
                "matches_format": true,
                "mx_exists": true
            },
            "results": {
                "domain": domain,
                "mx_records": mxRecords
            }
        }

        console.log(result);
    } catch(err) {
        console.log({
            "success": false,
            "message": err.message
        })
    }
}

validate()

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(email.match(regex)) return true;

    return false;
}
