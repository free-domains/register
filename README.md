<p align="center">
  <img src="https://media.freesubdomains.org/cover.png">
</p>

<h1 align="center">Free Domains</h1>

<p align="center">
  <a href="https://github.com/free-domains/register/tree/main/domains"><img src="https://img.shields.io/github/directory-file-count/free-domains/register/domains?label=domains&style=for-the-badge&type=file"></a>
  <a href="https://github.com/free-domains/register/issues"><img src="https://img.shields.io/github/issues-raw/free-domains/register?label=issues&style=for-the-badge"></a>
  <a href="https://github.com/free-domains/register/pulls"><img src="https://img.shields.io/github/issues-pr-raw/free-domains/register?label=pull%20requests&style=for-the-badge"></a>
</p>

<p align="center">Free subdomains for personal sites, open-source projects, and more.</p>

# Register

> Domains used for illegal purposes or being abused will be removed and permanently banned without notice.

Please select a method below to show instructions on how to register a domain.

<details>
  <summary>CLI (recommended)</summary>
  <br>

  > The CLI has 3 prefixes: `domains`, `fd` and `free-domains`.

  1. Install the CLI

  You can install the CLI by running the following command:

  ```bash
  npm install @free-domains/cli -g
  ```

  2. Login to the CLI

  Run the following command to login to the CLI and follow the steps.

  ```bash
  domains login
  ```

  3. Register a domain

  Run the following command and follow the steps to register a subdomain.

  ```bash
  domains register
  ```

</details>

<details>
  <summary>Manual</summary>
  <br>

  1. **Star** and **[Fork](https://github.com/free-domains/register/fork)** this repository
  2. Add a new file called `example.domain.com.json` in the `/domains` folder to register the `example` subdomain on the `domain.com`.
    - An list of available domains can be found [here](#domains).
  3. Edit it to meet your needs.
    - The file listed below is just an **example**, provide a **valid** JSON file with your needs.
    - Make sure to remove any records that aren't needed.

  ```json
  {
      "$schema": "../schemas/domain.json",

      "domain": "is-a-frontend.dev",
      "subdomain": "example",

      "owner": {
          "email": "hello@example.com"
      },

      "records": {
          "A": ["1.1.1.1", "1.0.0.1"],
          "AAAA": ["2606:4700:4700::1111", "2606:4700:4700::1001"],
          "CNAME": "example.com",
          "TXT": [
              {
                  "name": "@",
                  "value": "example_verification=1234567890"
              }
          ]
      },

      "proxied": false
  }
  ```

  4. Your pull request will be reviewed and merged.
    - **Do not** ignore the pull request checklist, this is _required_.
    - Make sure to keep an eye on your pull request in case we need you to make any changes!
  5. After the pull request is merged, please allow up to 24 hours for the changes to propagate _(in most cases it takes up to 5 minutes)_
  6. Enjoy your new domain!

</details>

## Domains

| Domains |
|:-:|
| [`is-a-backend.dev`](https://is-a-backend.dev) |
| [`is-a-frontend.dev`](https://is-a-frontend.dev) |

### Settings

> All domains use the same settings.

| Setting                                             | Option                |
|-----------------------------------------------------|-----------------------|
| [DNSSEC][dnssec]                                    | ✅                    |
| Email                                               | ❌                    |
| SSL/TLS*                                            | [Full][ssl-full]      |
| Always Use HTTPS*                                   | ✅                    |
| HTTP Strict Transport Security (HSTS)               | ✅                    |
| Minimum TLS Version*                                | 1.0                   |
| Opportunistic Encryption, TLS 1.3*                  | ✅                    |
| WAF (Web Application Firewall)*                     | Medium Security Level |
| Browser Integrity Check*                            | ✅                    |
| [Caching Level][caching-levels], Browser Cache TTL* | Standard, 4 hours     |

\*Only available when your domain has `proxied` mode set to `true`.

[dnssec]:https://developers.cloudflare.com/dns/additional-options/dnssec
[ssl-full]:https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full
[caching-levels]:https://developers.cloudflare.com/cache/how-to/set-caching-levels
[http2]:https://www.cloudflare.com/website-optimization/http2/what-is-http2
[http2-to-origin]:https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin
[0rtt]:https://developers.cloudflare.com/fundamentals/network/0-rtt-connection-resumption
[grpc]:https://support.cloudflare.com/hc/en-us/articles/360050483011
[pseudo-ipv4]:https://support.cloudflare.com/hc/en-us/articles/229666767
