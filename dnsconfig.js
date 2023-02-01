var regNone = NewRegistrar("none");
var providerCf = DnsProvider(NewDnsProvider("cloudflare"));

var proxy = {
    // https://stackexchange.github.io/dnscontrol/providers/cloudflare
    off: { cloudflare_proxy: "off" },
    on: { cloudflare_proxy: "on" }
};

/**
 * Note: glob() is only an internal undocumented helper function (maybe risky).
 *
 * @param {String} filesPath
 * @returns {{
 *  name: string,
 *  data: {
 *    domain: string,
 *    subdomain: string,
 *    owner?: { email?: string },
 *    records: { A?: string[], AAAA?: string[], CNAME?: string, MX?: object[{ priority: number, value: string }], NS?: string[], TXT?: string[] },
 *    proxied: boolean
 *  }}[]}
 */

function getDomainsList(filesPath) {
    var result = [];
    var files = glob.apply(null, [filesPath, true, ".json"]);

    for (var i = 0; i < files.length; i++) {
        var basename = files[i].split("/").reverse()[0];
        var name = basename.split(".")[0];

        result.push({ name: name, data: require(files[i]) });
    }

    return result;
}

var domains = getDomainsList("./domains");

/**
 * @type {{}}
 */

var commit = {};

for (var idx in domains) {
    var domainData = domains[idx].data;
    var proxyState = proxy.off; // Disabled by default

    if (!commit[domainData.domain]) commit[domainData.domain] = [];
    if (domainData.proxied === true) proxyState = proxy.on;

    if (domainData.records.A) {
        for (var a in domainData.records.A) {
            commit[domainData.domain].push(
                A(domainData.subdomain, IP(domainData.records.A[a]), proxyState) // https://stackexchange.github.io/dnscontrol/js#A
            );
        }
    }

    if (domainData.records.AAAA) {
        for (var aaaa in domainData.records.AAAA) {
            commit[domainData.domain].push(
                AAAA(
                    domainData.subdomain,
                    domainData.records.AAAA[aaaa],
                    proxyState
                ) // https://stackexchange.github.io/dnscontrol/js#AAAA
            );
        }
    }

    if (domainData.records.CNAME) {
        commit[domainData.domain].push(
            CNAME(domainData.subdomain, domainData.records.CNAME, proxyState) // https://stackexchange.github.io/dnscontrol/js#CNAME
        );
    }

    if (domainData.records.MX) {
        for (var mx in domainData.records.MX) {
            commit[domainData.domain].push(
                MX(domainData.subdomain, domainData.records.MX[mx.priority], domainData.records.MX[mx.value]) // https://stackexchange.github.io/dnscontrol/js#CNAME
            );
        }
    }

    if (domainData.records.NS) {
        for (var ns in domainData.records.NS) {
            commit[domainData.domain].push(
                NS(domainData.subdomain, domainData.records.NS[ns]) // https://stackexchange.github.io/dnscontrol/js#NS
            );
        }
    }

    if (domainData.records.TXT) {
        for (var txt in domainData.records.TXT) {
            commit[domainData.domain].push(
                TXT(domainData.subdomain, domainData.records.TXT[txt]) // https://stackexchange.github.io/dnscontrol/js#TXT
            );
        }
    }
}

for (var domainName in commit) {
    D(domainName, regNone, providerCf, commit[domainName]);
}
