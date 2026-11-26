# Puerto Rico Agency Denies Data Leak After Exposing 1 Million Social Security Numbers

**Severity:** critical | **Category:** Data Breach,Regulatory,Vulnerability | **Updated:** 2026-07-09 | **Reading time:** 5 min

An investigation by ProPublica and Centro de Periodismo Investigativo has revealed that Puerto Rico's Municipal Revenue Collection Center (CRIM) inadvertently exposed the Social Security numbers of approximately 1 million people. The data was accessible via a vulnerability in the agency's online property map service, 'Catastro Digital'. Despite being notified by the journalists with specific details on how to access the unprotected data, CRIM has publicly denied that any breach occurred, claiming its database is secure. This incident highlights a severe security failure and a concerning lack of transparency from the government agency.

## Executive Summary

An investigation by **[ProPublica](https://www.propublica.org)** and the Center for Investigative Journalism has uncovered a massive data exposure at Puerto Rico's Municipal Revenue Collection Center, known as **CRIM**. A significant security flaw in the agency's 'Catastro Digital' online property map service left the Social Security numbers (SSNs) of approximately 1 million people unprotected and easily accessible. The journalists responsibly disclosed the vulnerability to **CRIM** in mid-June, providing details of the exposed server and data. However, the agency has publicly and repeatedly denied that any breach or data exposure occurred, contradicting the investigation's findings. This incident represents a critical failure in securing sensitive citizen data and a troubling refusal to acknowledge and address a verified security risk.

## Vulnerability Details

The vulnerability was not on the public-facing website itself but in its backend service. The 'Catastro Digital' map is a public tool for viewing property information. The investigation found that while the public website did not display SSNs, the backend API that feeds data to the map was insecure. Anyone with a basic understanding of how web browsers request data could directly query this backend service and download sensitive personal information, including SSNs, without requiring any authentication like a username or password. This is a classic example of an Insecure Direct Object Reference (IDOR) or a broken access control vulnerability ([`T1087 - Account Discovery`](https://attack.mitre.org/techniques/T1087/) is related, though this is more about lack of access control). The data was essentially public to anyone who knew where to look.

## Affected Systems

- **Affected Service**: The backend data service for the 'Catastro Digital' interactive property map.
- **Affected Organization**: **Municipal Revenue Collection Center (CRIM)** of Puerto Rico.
- **Exposed Data**: Approximately 1 million Social Security numbers and other personal information linked to property records.

## Exploitation Status

This was not a sophisticated hack but an inadvertent exposure due to poor security design. The data was left unprotected. The journalists who discovered the flaw did not maliciously exploit it but verified its existence as part of their investigation. It is unknown if any malicious actors discovered and exploited this vulnerability before the journalists reported it. CRIM's denial of the issue is particularly concerning, as it suggests the vulnerability may not have been properly remediated, potentially leaving the data still exposed.

## Impact Assessment

The exposure of 1 million Social Security numbers is a catastrophic privacy failure. The SSN is a key piece of information used for identity verification in the United States. In the hands of criminals, this data can be used for widespread identity theft, to open fraudulent lines of credit, file fake tax returns, and commit other forms of financial fraud. The impact on the affected citizens of Puerto Rico could be devastating and long-lasting. CRIM's denial of the breach exacerbates the problem by preventing citizens from taking proactive steps to protect themselves, such as placing credit freezes or monitoring their accounts. It also severely undermines public trust in the government's ability to protect its citizens' most sensitive data.

## Cyber Observables — Hunting Hints

For similar API vulnerabilities, hunting should focus on API and web server logs:

| Type | Value | Description |
|---|---|---|
| API Endpoint | `/api/v1/property_data/{id}` | Monitor for sequential scanning of numeric IDs in API endpoints, which can indicate an IDOR enumeration attempt. |
| Log Source | API Gateway / Web Server Logs | Look for a single IP address making an unusually large number of requests to a data-retrieval API endpoint over a short period. |
| Network Traffic Pattern | Anomalous data egress | A large, unexpected download of data from a backend server could indicate that an exposed dataset is being exfiltrated. |

## Detection Methods

- **API Security Scanning**: Regularly use dynamic application security testing (DAST) and API security scanning tools to test for access control vulnerabilities like IDOR. These tools can automatically check if an unauthenticated user can access resources that should be protected.
- **Log Analysis**: Analyze API gateway and web server logs for signs of enumeration. A user or IP address requesting `record=1`, `record=2`, `record=3`, etc., is a classic sign of an IDOR scanning attempt. This is a form of [`D3-RAPA: Resource Access Pattern Analysis`](https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis).
- **Code Review**: Implement secure coding practices and perform regular manual and automated code reviews to identify and fix access control flaws before they reach production. Developers should never trust client-side input for authorization checks.

## Remediation Steps

- **Implement Proper Access Control**: The fundamental fix is to implement proper, server-side authentication and authorization checks for all API endpoints that handle sensitive data. Before returning any data, the server must verify that the user is authenticated and has the right to access the specific record they are requesting. This is a core part of [`D3-UAP: User Account Permissions`](https://d3fend.mitre.org/technique/d3f:UserAccountPermissions).
- **Acknowledge and Remediate**: The first step for CRIM should be to acknowledge the vulnerability, take the affected service offline immediately, and conduct a thorough investigation to remediate the flaw. Denying the problem is not a security strategy.
- **Notify Victims**: Once the breach is confirmed, the agency has an ethical and often legal obligation to notify the 1 million affected individuals so they can take steps to protect their identities.
- **Principle of Data Minimization**: Government agencies should review what data they are collecting and making accessible via online services. SSNs should almost never be stored in a system that is connected to a public-facing web application.

**Tags:** Data Breach, Data Leak, Government, Puerto Rico, CRIM, ProPublica, IDOR, Vulnerability

## Sources
- [A Puerto Rico Government Agency Exposed 1 Million Social Security Numbers](https://www.propublica.org/article/puerto-rico-crim-data-breach) — ProPublica (2026-07-09)

---
Source: https://cyber.netsecops.io/articles/puerto-rico-agency-denies-data-leak-of-1-million-ssns/
