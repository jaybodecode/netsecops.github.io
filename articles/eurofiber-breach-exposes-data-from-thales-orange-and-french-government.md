# Eurofiber Breach Exposes Thales, Orange, and French Government Data in Major Supply Chain Incident

**Severity:** critical | **Category:** Data Breach,Vulnerability,Supply Chain Attack | **Updated:** 2025-11-17 | **Reading time:** 5 min

European digital infrastructure provider Eurofiber has confirmed a major data breach in its French division, potentially exposing sensitive data from over 3,600 clients, including major corporations like Thales and Orange, and several French government ministries. A threat actor known as 'ByteToBreach' claims to have exploited vulnerabilities (CVE-2024-29889, CVE-2025-24799) in Eurofiber's GLPI IT asset management software via SQL injection. The stolen data, now for sale on the dark web, allegedly includes highly sensitive information such as SSH private keys, VPN configurations, and API keys, posing a severe supply chain risk.

## Executive Summary
**[Eurofiber](https://eurofiber.com/)**, a major European provider of fiber optic networks and digital infrastructure, has suffered a severe data breach within its French operations. The incident has potentially exposed sensitive operational data belonging to over 3,600 clients, including critical national entities such as defense contractor **[Thales](https://www.thalesgroup.com/)**, telecom giant **[Orange](https://www.orange.com/)**, and various French government ministries. A threat actor calling themselves 'ByteToBreach' has taken responsibility, claiming to have exploited SQL injection vulnerabilities in Eurofiber France's GLPI IT asset management portal. The stolen database, which is being offered for sale online, reportedly contains extremely sensitive credentials like SSH keys and VPN configurations, creating a massive downstream risk for all affected clients.

---

## Vulnerability Details
- **CVE IDs:** `CVE-2024-29889`, `CVE-2025-24799`
- **Affected Software:** **[GLPI](https://glpi-project.org/)** (IT Asset Management software)
- **Vulnerability Type:** SQL Injection

The attacker claims to have used a slow, time-based SQL injection attack to exploit vulnerabilities in outdated versions of the GLPI software used by Eurofiber France for its ticket management and customer portal. SQL injection is a well-known web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database. Successful exploitation can lead to the unauthorized viewing, modification, or deletion of data.

## Affected Systems
The breach originated from Eurofiber France's customer portal, which was running a vulnerable version of GLPI. The direct victim is Eurofiber, but the primary impact is on its extensive client base, which includes:
- **Defense:** Thales
- **Telecommunications:** Orange
- **Energy:** TotalEnergies
- **Transportation:** SNCF (French national railways)
- **Government:** Several French ministries

## Exploitation Status
**The vulnerabilities have been actively exploited.** The threat actor 'ByteToBreach' discovered the flaw on November 13 and successfully exfiltrated the entire GLPI database. The data was subsequently put up for sale on a dark web forum after alleged ransom negotiations with Eurofiber and GLPI's maintainer failed, indicating a clear intent to monetize the stolen information. All organizations using outdated versions of GLPI are at high risk of similar attacks.

## Impact Assessment
This is a critical supply chain incident with potentially catastrophic consequences for the affected clients. The impact goes far beyond a typical PII breach. The stolen data allegedly includes:
- **Privileged Credentials:** SSH private keys, VPN configurations, API keys.
- **Infrastructure Blueprints:** IT asset management data, which provides a detailed map of a client's infrastructure.
- **Operational Data:** Internal support tickets, ID scans, and SQL backups.

With this information, an attacker could potentially gain direct, privileged access to the internal networks of some of Europe's most critical organizations. This could facilitate espionage, sabotage, or further ransomware attacks. The sale of this data on the dark web means multiple threat actors could acquire it, amplifying the risk exponentially.

## Cyber Observables for Detection
- **Log Source:** Web Application Firewall (WAF) logs, web server access logs, database query logs.
- **URL Pattern:** Look for suspicious patterns in URL requests to the GLPI portal, such as encoded SQL commands (`' OR 1=1`, `UNION SELECT`, `SLEEP()`).
- **Database Activity:** Unusually slow database queries or a high volume of queries from the web application could indicate a time-based SQL injection attack.
- **Network Traffic Pattern:** Any large data export from the GLPI database server to an unknown destination.

## Detection Methods
- **Web Application Firewall (WAF):** A properly configured WAF should be able to detect and block common SQL injection attack patterns. Reviewing WAF logs is the primary method for detecting exploitation attempts. This is a form of **[D3-ITF: Inbound Traffic Filtering](https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering)**.
- **Vulnerability Scanning:** Regularly scan public-facing applications for known vulnerabilities like those in GLPI. This would have identified the outdated software as a high-risk issue.
- **Database Activity Monitoring (DAM):** DAM tools can monitor database queries in real-time and alert on anomalous activity, such as a web user account attempting to dump entire tables.

## Remediation Steps
1.  **Patch GLPI:** All organizations using GLPI must ensure they are running the latest patched version to protect against these specific vulnerabilities.
2.  **Mass Credential Rotation:** All Eurofiber clients affected by this breach must assume their secrets are compromised. This requires an immediate and comprehensive rotation of all SSH keys, VPN certificates, API keys, and any other credentials that may have been stored in the GLPI system.
3.  **Enhanced Monitoring:** Affected clients should place their infrastructure under heightened monitoring, looking for any anomalous access attempts using the potentially compromised credentials.
4.  **Input Validation:** Developers of web applications must implement parameterized queries (prepared statements) to prevent SQL injection vulnerabilities. All user-supplied input must be validated and sanitized.

## CVEs
- CVE-2024-29889
- CVE-2025-24799

**Tags:** data breach, supply chain attack, SQL injection, vulnerability, Eurofiber, GLPI, France, CVE-2025-24799

## Sources
- [Eurofiber reports data breach in France, major customers affected](https://www.techzine.eu/news/security/126071/eurofiber-reports-data-breach-in-france-major-customers-affected/) — Techzine Europe (2025-11-17)
- [Eurofiber Data Breach Exposes 3,600+ Clients and Critical Infrastructure in Massive Supply Chain Attack](https://botcrawl.com/eurofiber-data-breach-exposes-3600-clients-and-critical-infrastructure-in-massive-supply-chain-attack/) — Botcrawl (2025-11-16)
- [Eurofiber Breach Exposes Critical Infrastructure Data Across Europe – What You Need to Know](https://socradar.io/eurofiber-breach-exposes-critical-infrastructure-data-across-europe-what-you-need-to-know/) — SOCRadar (2025-11-17)
- [Eurofiber meldt datalek in Frankrijk, grote klanten getroffen](https://www.techzine.nl/nieuws/security/539343/eurofiber-meldt-datalek-in-frankrijk-grote-klanten-getroffen/) — Techzine Netherlands (2025-11-17)

---
Source: https://cyber.netsecops.io/articles/eurofiber-breach-exposes-data-from-thales-orange-and-french-government/
