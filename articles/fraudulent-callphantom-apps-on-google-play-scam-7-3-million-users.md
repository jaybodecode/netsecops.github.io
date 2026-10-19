# Fraudulent 'CallPhantom' Apps on Google Play Scammed 7.3 Million Users

**Severity:** medium | **Category:** Mobile Security,Malware,Phishing | **Updated:** 2026-05-08 | **Reading time:** 5 min

ESET researchers have exposed a massive fraud operation on the Google Play Store named 'CallPhantom.' The campaign involved 28 fraudulent apps that were collectively downloaded over 7.3 million times, primarily targeting users in India and the Asia-Pacific region. The apps promised the ability to access anyone's call history, SMS records, and WhatsApp logs for a subscription fee. However, after payment, the apps only provided fake, randomly generated data. One app was even published under the deceptive developer name 'Indian gov.in' to appear legitimate. Google has since removed the fleeceware applications from the Play Store.

## Executive Summary
Security researchers at **[ESET](https://www.eset.com)** have uncovered a large-scale fleeceware campaign on the **[Google](https://www.google.com)** Play Store, which they have dubbed "CallPhantom." The operation involved 28 malicious applications that successfully duped over 7.3 million users into downloading them. These apps, primarily targeting users in India and the Asia-Pacific region, lured victims with the false promise of being able to retrieve the call history and messages of any phone number. To access this non-existent service, users were tricked into paying for a subscription. The apps would then display fake, randomly generated data. The apps have since been removed by Google, but the campaign's success highlights the ongoing threat of fraudulent apps on official marketplaces.

## Threat Overview
The CallPhantom campaign is a classic example of fleeceware—apps that are not technically malware (they don't steal data or damage the device) but use deceptive practices to trick users into paying for worthless or non-existent services. The apps' core deception was the claim that they could provide access to private call and message logs, a technically infeasible feature for a third-party app. To enhance their credibility, at least one app masqueraded as an official government application, using the developer name "Indian gov.in." This social engineering tactic, combined with the allure of the promised functionality, led to millions of downloads and subsequent fraudulent charges to users.

## Technical Analysis
The CallPhantom apps are not sophisticated from a malware perspective but are effective as a scam. Their operation can be broken down into a few key steps:
- **Initial Access:** The apps were distributed through the official Google Play Store, leveraging the trust users place in the platform ([`T1475 - Legitimate Software`](https://attack.mitre.org/techniques/T1475/)).
- **Execution:** The user willingly downloads and installs the application.
- **Defense Evasion:** By using a deceptive but seemingly legitimate developer name ("Indian gov.in"), the app creators engaged in masquerading ([`T1036 - Masquerading`](https://attack.mitre.org/techniques/T1036/)) to evade user suspicion.
- **Impact:** The primary impact is financial fraud. The apps trick users into subscribing to a service that does not work, causing financial loss ([`T1488 - Financial Theft`](https://attack.mitre.org/techniques/T1488/)). The apps generate random, fake data to maintain the illusion of functionality for a short period.

## Impact Assessment
The direct impact is financial loss for the 7.3 million users who downloaded and potentially paid for subscriptions to these fraudulent apps. While the individual financial loss may be small, the collective profit for the scammers is substantial. The incident also damages user trust in the Google Play Store's vetting process and highlights the difficulty in policing app marketplaces for scams that do not involve traditional malware. For Google, it represents a reputational challenge and reinforces the need for more stringent review processes to detect and remove fleeceware.

## IOCs — Directly from Articles
The source articles mentioned the names of some of the fraudulent apps, which can be considered IOCs:
| Type | Value | Description |
|---|---|---|
| `file_name` | `Call history : any number deta` | Name of one of the fraudulent Android applications. |
| `file_name` | `Call History of Any Number` | Name of another fraudulent Android application. |

## Cyber Observables — Hunting Hints
For mobile device management administrators and users, the following are red flags for fleeceware and other malicious apps:
| Type | Value | Description |
|---|---|---|
| `string_pattern` | App description making impossible claims | Be suspicious of any app that claims to be able to access private data from other users' phones, like call logs or WhatsApp messages. |
| `string_pattern` | Overwhelmingly negative reviews describing a scam | Check user reviews. While some can be fake, a large number of reviews complaining about fake functionality or unwanted charges is a major red flag. |
| `other` | Vague or no privacy policy | Legitimate applications will have a clear and accessible privacy policy. The absence of one is suspicious. |
| `other` | Excessive permission requests | Be wary of an app that requests permissions that are not related to its stated function. |

## Detection & Response
- **Detection:** For organizations, Mobile Device Management (MDM) or Mobile Threat Defense (MTD) solutions can be used to blacklist known fraudulent applications. These solutions can scan managed devices for the presence of these apps and alert administrators.
- **Response:** Instruct users who have installed these apps to uninstall them immediately. They should also check their Google Play subscription history for any active subscriptions from the app and cancel them. Users should be advised to report the app to Google and consider disputing the charges with their payment provider.

## Mitigation
- **Strategic:** User education is the most powerful mitigation against fleeceware ([`M1017 - User Training`](https://attack.mitre.org/mitigations/M1017/)). Teach users to be highly skeptical of apps that make claims that sound too good to be true. Train them to read reviews, check permissions, and verify the developer's reputation before installing.
- **Tactical:** For organizations, implement an MDM policy that only allows the installation of applications from an approved list (allowlisting). This prevents users from installing unvetted apps from the public store. Encourage users to regularly review their app subscriptions in the Google Play Store and cancel any they do not recognize or no longer use.

**Tags:** Fleeceware, Android, Google Play, Scam, Mobile Security, ESET, CallPhantom

## Sources
- [Fake Call History Apps Stole Payments From Users After 7.3 Million Play Store Downloads](https://thehackernews.com/2026/05/fake-call-history-apps-stole-payments.html) — The Hacker News (2026-05-08)

---
Source: https://cyber.netsecops.io/articles/fraudulent-callphantom-apps-on-google-play-scam-7-3-million-users/
