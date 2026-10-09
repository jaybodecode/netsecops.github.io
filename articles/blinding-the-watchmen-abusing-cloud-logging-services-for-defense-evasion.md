# Hackers Can Blind Your SOC: New Research Reveals How Attackers Abuse Cloud Logging for Stealth

**Severity:** medium | **Category:** Cloud Security,Threat Intelligence,Security Operations | **Updated:** 2026-06-10 | **Reading time:** 12 min

New research from Unit 42 demonstrates how threat actors can target and abuse fundamental cloud logging services in AWS and Google Cloud to cover their tracks and evade detection. The report details several defense evasion techniques, including disabling logging mechanisms like AWS CloudTrail, deleting log storage buckets, altering log routing configurations, and manipulating encryption keys to render logs unreadable. By blinding these critical visibility tools, attackers can operate undetected within a compromised environment. The research provides defensive strategies and configurations to help organizations protect their cloud logging infrastructure from such attacks.

## Executive Summary
**[Unit 42](https://unit42.paloaltonetworks.com/)** has published new research detailing how threat actors can systematically dismantle an organization's security visibility by targeting the cloud logging services themselves. The report focuses on attack scenarios against **[Amazon Web Services (AWS)](https://aws.amazon.com/)** CloudTrail and **[Google Cloud](https://cloud.google.com/)** Logging, which serve as the system of record for all actions within a cloud environment. By disabling, altering, or deleting logs, attackers can effectively achieve defense evasion, blinding Security Information and Event Management (SIEM) systems, Cloud Security Posture Management (CSPM) tools, and security analysts. This research highlights the critical need for organizations to not only consume logs but also to secure the logging pipeline itself against tampering and disruption. The findings provide defenders with the knowledge to anticipate these attacks and implement robust protective measures.

---

## Threat Overview
Cloud logging services like **[AWS CloudTrail](https://aws.amazon.com/cloudtrail/)** and **[Google Cloud Logging](https://cloud.google.com/logging)** are the cornerstones of modern cloud security operations. They provide the necessary data for threat detection, incident response, and compliance auditing. This dependency makes them a high-value target for sophisticated attackers. An attacker who gains sufficient permissions within a cloud account can manipulate these services to hide their malicious activities, prolong their dwell time, and exfiltrate data without triggering alerts.

The attack techniques fall into two primary categories:
1.  **Disruption of Log Flow:** Preventing new logs from being generated or delivered.
2.  **Manipulation of Existing Logs:** Deleting or encrypting stored logs to prevent analysis.

Understanding these techniques is essential for building a resilient cloud security monitoring strategy.

## Technical Analysis
Unit 42 demonstrated several specific techniques that attackers can use to compromise cloud logging integrity. These methods often require an attacker to have already obtained a certain level of privileged access within the cloud environment.

### 1. Disabling the Logging Mechanism
The most direct approach is to stop the logging service itself. In AWS, this can be done using the `StopLogging` API call against a CloudTrail trail. This action immediately ceases the recording of API events, creating a complete visibility gap for the duration it is disabled. This maps directly to **[`T1562.008 - Impair Defenses: Disable Cloud Logs`](https://attack.mitre.org/techniques/T1562/008/)**.

### 2. Deleting the Log Storage
Cloud logs are typically stored in object storage, such as an **[Amazon S3](https://aws.amazon.com/s3/)** bucket. If an attacker gains permissions to this bucket (e.g., `s3:DeleteBucket`), they can delete it entirely. While the logging service may still be running, it will have no destination to write to, causing log delivery to fail. This aligns with **[`T1070.004 - Indicator Removal: File Deletion`](https://attack.mitre.org/techniques/T1070/004/)**.

### 3. Deleting the Log Router
Attackers can also target the configuration that routes logs to their destination. In AWS, this is the `Trail` object; in Google Cloud, it is the `Sink`. By deleting the trail (via `DeleteTrail` API) or the sink (via `DeleteSink` method), the attacker breaks the connection between event generation and log storage. This is a form of **[`T1562.001 - Impair Defenses: Disable or Modify Tools`](https://attack.mitre.org/techniques/T1562/001/)**.

### 4. Modifying Encryption Keys
A more subtle technique involves rendering logs unreadable. Cloud logs are often encrypted at rest using services like AWS Key Management Service (KMS) or Google Cloud KMS. An attacker could:
1.  Change the log encryption key to one they control.
2.  Encrypt new logs with the malicious key.
3.  Revoke the victim's access to that key.

The result is that the victim has log files they cannot decrypt or read, effectively blinding them to the activities recorded during that period. This can be considered a form of data manipulation for defense evasion.

## Impact Assessment
The impact of successfully blinding cloud logging services is severe and multifaceted:
- **Delayed or Failed Threat Detection:** Security tools (SIEM, CSPM, XDR) are starved of data, preventing them from generating alerts on malicious activity.
- **Impeded Incident Response:** Without logs, responders cannot determine the scope of a breach, the attacker's actions, or the root cause, making eviction and recovery extremely difficult.
- **Compliance Violations:** Many regulatory frameworks (PCI-DSS, HIPAA, GDPR) have strict requirements for audit logging. The loss of logs can lead to significant fines and legal penalties.
- **Increased Attacker Dwell Time:** Attackers can operate for extended periods without fear of discovery, allowing them to achieve their objectives, whether it be data theft, espionage, or destruction.

## IOCs — Directly from Articles
No specific indicators of compromise (IOCs) were provided in this research article, as it focuses on attack techniques rather than a specific campaign.

## Cyber Observables — Hunting Hints
The following patterns can help security teams hunt for attempts to tamper with cloud logging infrastructure:

| Type | Value | Description |
|---|---|---|
| api_endpoint | `cloudtrail.amazonaws.com` | Monitor for sensitive API calls such as `StopLogging`, `DeleteTrail`, `UpdateTrail`. |
| api_endpoint | `logging.googleapis.com` | Monitor for sensitive API calls such as `DeleteSink` or `UpdateSink`. |
| event_id | `DeleteBucket` | An alert on the deletion of a bucket known to store security logs is a high-fidelity indicator of tampering. |
| registry_key | `kms:ScheduleKeyDeletion` | Monitor for attempts to delete KMS keys, especially those used for encrypting logs. |
| log_source | `AWS CloudTrail` / `GCP Audit Logs` | These logs (metaphorically, the logs about logging) are the primary source for detecting tampering. Ensure they are protected. |

## Detection & Response
Defenders should focus on protecting the logging pipeline itself:
1.  **Monitor Critical API Calls:** Configure high-priority alerts for any API calls that can modify or disable logging, such as `StopLogging`, `DeleteTrail`, `UpdateTrail`, `DeleteSink`, and `DeleteBucket` on log archives. Use **[User Behavior Analysis](https://d3fend.mitre.org/technique/d3f:UserBehaviorAnalysis)** to detect when these actions are taken by users or roles that normally do not perform them.
2.  **Log Integrity Monitoring:** Use features like AWS CloudTrail Log File Integrity Validation to ensure that log files have not been tampered with after delivery.
3.  **Immutable Storage:** Store critical logs in immutable storage, such as an S3 bucket with Object Lock in Compliance mode, to prevent deletion or modification.
4.  **Cross-Account Log Shipping:** Send logs to a dedicated, highly secured logging account. Access to this account should be severely restricted, separate from production environments, making it much harder for an attacker to compromise both.

## Mitigation
Implement a defense-in-depth strategy to secure cloud logging services:
- **Least Privilege IAM:** Enforce strict, least-privilege IAM policies. No user or service role should have permission to alter logging configurations as part of their normal duties. These permissions should be reserved for break-glass administrator roles protected by **[Multi-factor Authentication](https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication)** (D3-MFA).
- **Service Control Policies (SCPs):** In AWS Organizations, use SCPs to create guardrails that deny actions like `cloudtrail:StopLogging` or `s3:DeleteBucket` on the logging bucket for all principals except a specific administrative role.
- **Resource Protection:** Enable termination protection on CloudTrail trails and S3 buckets. In Google Cloud, use resource liens to prevent the deletion of projects containing log sinks.
- **Regular Audits:** Regularly audit IAM permissions and logging configurations to ensure they have not been weakened over time. This aligns with the principles of **[Application Configuration Hardening](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening)** (D3-ACH).

**Tags:** Cloud Security, AWS, GCP, Defense Evasion, Log Manipulation, CloudTrail, Threat Research, SIEM

## Sources
- [Blinding the Watchmen: Abusing Cloud Logging Services for Defense Evasion and Visibility](https://unit42.paloaltonetworks.com/cloud-logging-defense-evasion/) — Unit 42 (2026-06-09)

---
Source: https://cyber.netsecops.io/articles/blinding-the-watchmen-abusing-cloud-logging-services-for-defense-evasion/
