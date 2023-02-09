var regNone = NewRegistrar("none");
var providerCf = DnsProvider(NewDnsProvider("cloudflare"));

var proxy = {
    off: { cloudflare_proxy: "off" },
    on: { cloudflare_proxy: "on" }
};

function getDomainsList(filesPath) {
    var result = [];
    var files = glob.apply(null, [filesPath, true, ".json"]);

    files.forEach(function (file) {
        var basename = file.split("/").reverse()[0];
        var name = basename.split(".")[0];

        result.push({ name: name, data: require(file) });
    });

    return result;
}

var domains = getDomainsList("./domains");

var commit = {};

function setProxyState(domainData) {
    return domainData.proxied === true ? proxy.on : proxy.off;
}

domains.forEach(function (domain) {
    var domainData = domain.data;
    var proxyState = setProxyState(domainData);

    if (!commit[domainData.domain]) {
        commit[domainData.domain] = [];
    }

    Object.entries(domainData.records).forEach(function ([key, value]) {
        switch (key) {
            case "A":
                value.forEach(function (ip) {
                    commit[domainData.domain].push(
                        A(domainData.subdomain, IP(ip), proxyState)
                    );
                });
                break;
            case "AAAA":
                value.forEach(function (ip) {
                    commit[domainData.domain].push(
                        AAAA(domainData.subdomain, ip, proxyState)
                    );
                });
                break;
            case "CNAME":
                commit[domainData.domain].push(
                    CNAME(domainData.subdomain, `${value}.`, proxyState)
                );
                break;
            case "MX":
                value.forEach(function (mx) {
                    commit[domainData.domain].push(
                        MX(domainData.subdomain, mx.priority, `${mx.value}.`)
                    );
                });
                break;
            case "NS":
                value.forEach(function (ns) {
                    commit[domainData.domain].push(
                        NS(domainData.subdomain, `${ns}.`)
                    );
                });
                break;
            case "TXT":
                value.forEach(function (txt) {
                    commit[domainData.domain].push(
                        TXT(domainData.subdomain, txt)
                    );
                });
                break;
        }
    });
});

D(commit);
