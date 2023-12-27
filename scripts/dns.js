const regNone = NewRegistrar("none");
const providerCf = DnsProvider(NewDnsProvider("cloudflare"));

const proxy = {
    off: { cloudflare_proxy: "off" },
    on: { cloudflare_proxy: "on" }
};

function getDomainsList(filesPath) {
    const result = [];
    const files = glob.apply(null, [filesPath, true, ".json"]);

    for (const i = 0; i < files.length; i++) {
        const basename = files[i].split("/").reverse()[0];
        const name = basename.split(".")[0];

        result.push({ name: name, data: require(files[i]) });
    }

    return result;
}

const domains = getDomainsList("../domains");

let commit = {};

for (const idx in domains) {
    const domainData = domains[idx].data;
    const proxyState = domainData.proxied;

    if (!commit[domainData.domain]) commit[domainData.domain] = [];

    if (domainData.records.A) {
        for (const a in domainData.records.A) {
            commit[domainData.domain].push(A(domainData.subdomain, IP(domainData.records.A[a]), proxyState));
        }
    }

    if (domainData.records.AAAA) {
        for (const aaaa in domainData.records.AAAA) {
            commit[domainData.domain].push(AAAA(domainData.subdomain, domainData.records.AAAA[aaaa], proxyState));
        }
    }

    if (domainData.records.CNAME) {
        commit[domainData.domain].push(CNAME(domainData.subdomain, domainData.records.CNAME + ".", proxyState));
    }

    if (domainData.records.MX) {
        for (const mx in domainData.records.MX) {
            commit[domainData.domain].push(MX(domainData.subdomain, domainData.records.MX[mx].priority, domainData.records.MX[mx].value + "."));
        }
    }

    // if (domainData.records.NS) {
        // for (const ns in domainData.records.NS) {
            // commit[domainData.domain].push(NS(domainData.subdomain, domainData.records.NS[ns] + "."));
        // }
    // }

    if (domainData.records.TXT) {
        for (const txt in domainData.records.TXT) {
            if (domainData.records.TXT[txt].name === "@") {
                commit[domainData.domain].push(TXT(domainData.subdomain, domainData.records.TXT[txt].value));
            } else if (domainData.subdomain === "@") {
                commit[domainData.domain].push(TXT(domainData.records.TXT[txt].name, domainData.records.TXT[txt].value));
            } else {
                commit[domainData.domain].push(TXT(domainData.records.TXT[txt].name + "." + domainData.subdomain, domainData.records.TXT[txt].value));
            }
        }
    }
}

for (const domainName in commit) {
    D(domainName, regNone, providerCf, commit[domainName]);
}
