# 🌐 Free Domains
Free subdomains for personal sites, open-source projects, and more.

[![Domains](https://img.shields.io/github/directory-file-count/free-domains/register/domains?label=domains&style=for-the-badge&type=file)](https://github.com/free-domains/register/tree/main/domains)

# ❗ Notice
We do not support the following services due to SSL limitations.

- [Netlify](https://www.netlify.com)
- [Vercel](https://vercel.com)

# 📝 Register
1. Check if your desired domain is available using our [domain checker](https://freesubdomains.org/check).
2. Select a method below to show instructions on how to register a domain.

<details>
  <summary>⌨️ CLI (recommended)</summary>
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
  <summary>📝 Manual</summary>
  <br>

  1. **Star** and **[fork](https://github.com/free-domains/register/fork)** this repository.
  2. Add a new file called `example.domain.dev.json` in the `/domains` folder to register the `example` subdomain on the `domain.dev`.
    - An list of available domains can be found [here](#domains).
  3. Edit it to meet your needs.
    - The file listed below is just an **example**, provide a **valid** JSON file with your needs.
    - Make sure to remove any records that aren't needed.

  ```json
  {
      "domain": "is-a-fullstack.dev",
      "subdomain": "example",

      "owner": {
          "email": "hello@example.com"
      },

      "records": {
          "A": ["1.1.1.1", "1.0.0.1"],
          "AAAA": ["2606:4700:4700::1111", "2606:4700:4700::1001"],
          "CNAME": "example.com",
          "MX": [
              {
                  "priority": 10,
                  "value": "mx.example.com"
              }
          ],
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

## 🌐 Domains
| Domains |
|:-:|
| [`is-a-backend.dev`](https://is-a-backend.dev) |
| [`is-a-frontend.dev`](https://is-a-frontend.dev) |
| [`is-a-fullstack.dev`](https://is-a-fullstack.dev) |

### ⚙️ Settings
> All domains use the same settings.

| Setting                               | Option                |
|---------------------------------------|-----------------------|
| DNSSEC                                | ✅ |
| Email                                 | ✅ |
| SSL/TLS*                              | Full |
| Always Use HTTPS*                     | ✅ |
| HTTP Strict Transport Security (HSTS) | ✅ |
| Minimum TLS Version*                  | 1.0 |
| Opportunistic Encryption, TLS 1.3*    | ✅ |
| WAF (Web Application Firewall)*       | Medium Security Level |
| Browser Integrity Check*              | ✅ |
| Caching Level, Browser Cache TTL*     | Standard, 4 hours |

\*Only available when your domain has `proxied` set to `true`.

### ✅ Supported [Records](https://en.wikipedia.org/wiki/List_of_DNS_record_types)
- A
  - e.g: `1.1.1.1`
- AAAA
  - e.g: `2606:4700:4700::1111`
- CNAME
  - e.g: `example.com`
  - CNAME records cannot be used in conjunction with any other record type.
- MX
  - e.g: `mx.example.com`
- TXT
  - e.g: `hello world`
