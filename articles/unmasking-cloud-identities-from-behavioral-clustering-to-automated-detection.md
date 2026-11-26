# Unit 42 Develops Model to Map Cloud Identities via Behavioral Clustering

**Severity:** informational | **Category:** Cloud Security,Threat Intelligence,Security Operations | **Updated:** 2026-09-14 | **Reading time:** 12 min

Palo Alto Networks' Unit 42 has published research on a new behavioral clustering model that uses unsupervised machine learning to analyze cloud audit logs. By examining over 40,000 identities in AWS environments, the model, which leverages UMAP and HDBSCAN algorithms, successfully maps entities to their functional roles, such as administrators or DevOps tools. A key outcome of this research is the ability to translate these complex behavioral patterns into lightweight, portable SQL queries. This allows organizations to implement continuous, scalable threat detection to identify anomalous activities and masquerading threats without the overhead of a persistent machine learning pipeline.

## Executive Summary

Palo Alto Networks' **[Unit 42](https://unit42.paloaltonetworks.com/)** has developed a novel methodology for enhancing cloud threat detection by mapping cloud identities to their functional roles through behavioral analysis. The research introduces a model that uses unsupervised machine learning on cloud audit logs, specifically **[AWS CloudTrail](https://aws.amazon.com/cloudtrail/)**, to cluster identities based on their activity patterns. This approach provides critical context for distinguishing between normal operational behavior and potential threats, such as an attacker masquerading as a legitimate service.

The key innovation is the ability to distill the findings from the complex clustering model into simple, lightweight heuristic logic that can be implemented using standard **[SQL](https://en.wikipedia.org/wiki/SQL)**. This enables organizations to achieve continuous, scalable visibility and automated threat detection within their cloud environments without the significant resource cost associated with running a persistent machine learning pipeline. The methodology is designed to be adaptable to other cloud providers and environments like **[Kubernetes](https://kubernetes.io/)**.

---

## Research Methodology

The primary challenge addressed by this research is the difficulty of understanding the true function of an identity in a large, complex cloud environment. With thousands of human, machine, and autonomous identities, relying solely on assigned **[IAM](https://en.wikipedia.org/wiki/Identity_and_access_management)** policies or naming conventions is insufficient. Attackers exploit this ambiguity by using masquerading techniques to blend in with normal activity, making their actions difficult to detect.

To overcome this, Unit 42 designed a behavioral clustering model. The process involved:
1.  **Data Collection**: Analyzing **AWS CloudTrail** audit logs from 125 different cloud environments, encompassing over 40,000 unique identities over a two-month period.
2.  **Behavioral Mapping**: Using unsupervised machine learning algorithms—specifically Uniform Manifold Approximation and Projection (**UMAP**) and Hierarchical Density-Based Spatial Clustering of Applications with Noise (**HDBSCAN**)—to process the data. These algorithms automatically group the vast collection of cloud identities into distinct clusters based on behavioral similarity.
3.  **Role Identification**: Decoding the functional role of each cluster by combining analytical methods, such as analyzing the most frequently invoked operations. For example, a cluster of administrative users was clearly identified by the prevalence of the `ConsoleLogin` event, which was rare in other clusters.

This approach moves security from a static, capability-based model (what an identity *can* do) to a dynamic, behavior-based model (what an identity *actually* does), providing richer context for threat detection.

---

## Technical Analysis

The core of the technical solution is a two-stage machine learning process. First, **UMAP** is used for dimensionality reduction, projecting the high-dimensional space of all possible cloud API calls into a lower-dimensional, manageable map. In this map, each identity is a point, and the distance between points reflects behavioral similarity. 

Second, **HDBSCAN** is applied to this map to identify dense regions of points, which represent behavioral clusters. This method is effective because it does not require the number of clusters to be predefined and can handle noise (identities that do not fit neatly into any group).

An in-depth analysis of the largest cluster, representing approximately 5,000 administrative users, showed that 94% of its members invoked the `ConsoleLogin` operation. This starkly contrasted with other clusters, where less than 1% of identities performed this action, confirming the cluster's role as human administrators accessing the **[AWS](https://aws.amazon.com/)** Management Console.

This model is effective at detecting threats that involve behavioral deviation, which maps to several MITRE ATT&CK techniques:
- **[`T1078.004 - Valid Accounts: Cloud Accounts`](https://attack.mitre.org/techniques/T1078/004/)**: The entire model is based on analyzing the behavior of valid accounts to spot misuse.
- **[`T1037 - Masquerading`](https://attack.mitre.org/techniques/T1037/)**: By establishing a behavioral baseline, the model can identify when an identity's actions are inconsistent with its established role, a key indicator of masquerading.
- **[`T1538 - Cloud Service Discovery`](https://attack.mitre.org/techniques/T1538/)**: The paper gives an example of an identity enumerating all resources. The model provides the context to determine if this is a benign security scanner or a compromised service account performing reconnaissance.

---

## Impact Assessment

The primary impact of this research is a significant improvement in the signal-to-noise ratio for cloud threat detection. In environments with thousands of identities, security teams are often overwhelmed with low-context alerts. By baselining normal behavior, this model allows for the creation of high-fidelity alerts that are tied to meaningful deviations from an identity's established role.

For example, an alert indicating that a backup service identity is attempting to create a new user account is far more actionable than a generic "unusual activity" alert. This allows security operations centers (SOCs) to prioritize investigations and respond more quickly to genuine threats.

The ability to translate the model's findings into simple SQL queries is a major benefit. It democratizes this advanced detection capability, allowing organizations without dedicated data science teams to implement sophisticated behavioral analytics using their existing SIEM or security data lake infrastructure.

---

## IOCs — Directly from Articles

No specific Indicators of Compromise (IOCs) were provided in the source article, as it is a research paper describing a defensive methodology rather than an analysis of a specific attack.

---

## Cyber Observables — Hunting Hints

Security teams can hunt for threats by looking for deviations from expected behavior. The following patterns, inspired by the research, could indicate malicious activity:

| Type | Value | Description |
|---|---|---|
| Log Source | `AWS CloudTrail` | Primary data source for behavioral analysis of AWS identities. |
| Log Source | `Azure Activity Logs` / `GCP Audit Logs` | Comparable data sources for applying the methodology in other clouds. |
| API Call | `ConsoleLogin` | A key indicator for human administrator activity. Its presence from a service account would be highly anomalous. |
| Behavioral Pattern | Deviation from established cluster | The core observable. An identity performing actions outside its normal, clustered behavior (e.g., a read-only service writing data). |
| API Call Pattern | `iam:CreateUser`, `iam:AttachRolePolicy` | High-risk IAM operations. Highly suspicious if invoked by identities not in a designated 'IAM-Admin' or 'DevOps-Provisioning' cluster. |
| API Call Pattern | `s3:GetObject` from unexpected identity | A service account for EC2 metrics suddenly accessing sensitive data in S3 buckets. |

---

## Detection & Response

### Detection

Organizations can implement this methodology by following these steps:
1.  **Ingest Data**: Ensure comprehensive cloud audit logs (like **AWS CloudTrail**) are enabled for all regions and services and are ingested into a centralized security data lake or SIEM.
2.  **Establish Baselines**: Use machine learning tools or simplified, manual analysis to cluster identities based on the API calls they make. This creates a behavioral baseline for different functional roles (e.g., 'Database Admins', 'CI/CD Pipelines', 'Security Scanners').
3.  **Implement Heuristics**: Convert the baseline patterns into detection rules. For example, create a rule that alerts when an identity from the 'Backup Service' cluster invokes any API call other than `s3:*` or `ec2:CreateSnapshot`.
4.  **Monitor for Deviations**: Continuously monitor for identities whose behavior deviates significantly from their cluster's norm. This is a strong signal for investigation.

This approach aligns with the D3FEND technique **User Behavior Analysis**, specifically **Job Function Access Pattern Analysis** and **Resource Access Pattern Analysis**.

### Response

An alert generated by this system should trigger an incident response playbook focused on account compromise. Key steps include:
1.  **Triage**: Immediately assess the privilege level of the identity and the sensitivity of the resources it is accessing.
2.  **Investigate**: Review the full activity log for the identity to understand the scope of the anomalous behavior. The behavioral context provided by the model is crucial here.
3.  **Contain**: If compromise is confirmed, disable the identity's credentials, rotate keys, and terminate any active sessions. 
4.  **Eradicate**: Identify the root cause of the compromise (e.g., leaked credentials, vulnerable application) and remediate it.

---

## Mitigation

While the model is primarily a detection mechanism, its insights can drive mitigation and hardening efforts. The core mitigation is to enforce the principle of least privilege, informed by actual usage data.

1.  **IAM Policy Hardening**: Use the behavioral clusters to refine IAM policies. If the model shows a service identity only ever uses three specific API calls, its IAM role should be restricted to only those three calls. This reduces the potential impact of a compromise.
2.  **Regular Policy Review**: Periodically re-run the clustering analysis and compare the results to existing IAM policies. This can highlight permissions that are granted but never used, which should be removed.
3.  **Adopt Behavioral Analytics**: Strategically, organizations should move beyond static configuration checks and incorporate behavioral analytics into their cloud security monitoring strategy.
4.  **Comprehensive Logging**: Ensure that audit logging is enabled and immutable. Without the raw data from **AWS CloudTrail** or similar services, this type of analysis is impossible.

These actions align with the D3FEND countermeasures of **Application Configuration Hardening** and **User Account Permissions**.

**Tags:** Cloud Security, Threat Detection, Machine Learning, Behavioral Analytics, AWS, IAM, CloudTrail, Threat Hunting

## Sources
- [Unmasking Cloud Identities: From Behavioral Clustering to Automated Detection](https://unit42.paloaltonetworks.com/behavioral-clustering-map-to-cloud-identities/) — Unit 42 (2026-09-14)

---
Source: https://cyber.netsecops.io/articles/unmasking-cloud-identities-from-behavioral-clustering-to-automated-detection/
