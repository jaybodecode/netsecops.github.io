# Pickle in the Middle: Critical RCE Flaw in Google Vertex AI Enables ML Model Hijacking

**Severity:** high | **Category:** Vulnerability,Cloud Security,Threat Intelligence | **Updated:** 2026-06-16 | **Reading time:** 11 min

Palo Alto Networks' Unit 42 has discovered and disclosed a high-severity vulnerability in Google Cloud's Vertex AI Python SDK that could allow an attacker to achieve remote code execution (RCE) across different customer tenants. The attack, named 'Pickle in the Middle,' exploits a predictable default bucket naming convention in the SDK, allowing for a 'bucket squatting' attack. By preemptively creating a bucket with a known name, an attacker can intercept a victim's machine learning model upload, replace it with a malicious version, and execute arbitrary code within the victim's Vertex AI infrastructure. The flaw resided in the `google-cloud-aiplatform` SDK versions 1.139.0 and 1.140.0 and was fixed by Google in version 1.148.0.

## Executive Summary

Palo Alto Networks' **[Unit 42](https://unit42.paloaltonetworks.com/)** discovered a critical vulnerability in the **[Google Cloud](https://cloud.google.com/)** **[Vertex AI](https://cloud.google.com/vertex-ai)** Python SDK (`google-cloud-aiplatform`) that permitted cross-tenant remote code execution (RCE). The vulnerability, present in SDK versions `1.139.0` and `1.140.0`, allowed an attacker with no initial access to a victim's environment to hijack and poison machine learning (ML) models during the upload process. The core of the issue was a predictable default naming pattern for staging buckets combined with a lack of ownership verification in the SDK.

An attacker could exploit this by predicting and pre-creating a Google Cloud Storage (GCS) bucket (a technique known as 'bucket squatting'). When a victim using a vulnerable SDK version uploaded a model without specifying a custom staging location, the SDK would inadvertently send the model artifacts to the attacker-controlled bucket. The attacker could then replace the legitimate model with a malicious one, leveraging **[Python](https://www.python.org/)**'s `pickle` deserialization to achieve RCE when the victim deployed the compromised model. **[Google](https://www.google.com)** has addressed this vulnerability in SDK version `1.148.0` following responsible disclosure from Unit 42.

---

## Vulnerability Details

The vulnerability, dubbed 'Pickle in the Middle,' is a multi-stage attack that hinges on three key components:

1.  **Predictable GCS Bucket Name:** When a user uploads a model via the `VertexAI.Model.upload()` function without specifying a `staging_bucket`, the SDK generates a default bucket name using a deterministic pattern: `[project-id]-[region]-vertex-ai-staging`. An attacker only needs the victim's project ID and region to predict this name.

2.  **Bucket Squatting and Missing Ownership Check:** GCS bucket names are globally unique. An attacker can preemptively create a bucket with the predicted name in their own Google Cloud project. The vulnerable SDK versions checked for the bucket's existence but failed to verify that it belonged to the user's project. Consequently, the SDK would proceed to upload the victim's model artifacts to the attacker's bucket, assuming it was a legitimate staging area.

3.  **Malicious Model Replacement and Deserialization RCE:** The attacker can then, within a narrow time window, replace the victim's uploaded model files (e.g., `model.joblib`) with a malicious version. Since many Python ML models are serialized using `pickle` or its wrapper **[joblib](https://joblib.readthedocs.io/en/latest/)**, the attacker can craft a malicious model file. This file, when deserialized by the Vertex AI serving infrastructure using `pickle.load()` or `joblib.load()`, executes arbitrary code via the `__reduce__` method. This provides the RCE payload delivery mechanism.

The attack flow is as follows:
1.  Attacker identifies a target's Google Cloud project ID.
2.  Attacker creates a GCS bucket in their own project named `[victim-project-id]-[region]-vertex-ai-staging`.
3.  Victim, using a vulnerable SDK, uploads an ML model without specifying a staging bucket.
4.  The SDK silently uploads the model artifacts to the attacker's bucket.
5.  Attacker replaces the legitimate model file with a malicious pickled object designed for RCE.
6.  Victim deploys the now-compromised model to a Vertex AI endpoint.
7.  The Vertex AI service loads the malicious model, deserializes the pickle file, and executes the attacker's code within the victim's serving infrastructure.

## Affected Systems

-   **Product:** Google Cloud Vertex AI Python SDK (`google-cloud-aiplatform`)
-   **Vulnerable Versions:** `1.139.0` and `1.140.0`
-   **Patched Version:** `1.148.0` and later

Organizations using Vertex AI for MLOps pipelines are urged to check their dependencies and ensure they are not running the affected versions.

## Exploitation Status

The vulnerability was discovered and demonstrated through a proof-of-concept by Unit 42 researchers. There is no public evidence of this specific technique being exploited in the wild. However, 'bucket squatting' is a known attack class, and with the public disclosure, threat actors may attempt to find and exploit unpatched systems.

## Impact Assessment

A successful exploit of this vulnerability has severe security implications, leading to a complete compromise of the targeted ML model's serving environment. The business impact includes:

-   **Cross-Tenant Remote Code Execution:** The primary impact is gaining a foothold within the victim's cloud infrastructure, running with the permissions of the Vertex AI service account. This bypasses tenant isolation, a fundamental security promise of cloud platforms.
-   **Data Exfiltration:** Once RCE is achieved, the attacker can use the service account's permissions to access and exfiltrate sensitive data from GCS buckets, BigQuery datasets, or other resources accessible to the Vertex AI service.
-   **Lateral Movement:** The attacker can leverage the compromised environment as a pivot point to move laterally within the victim's Google Cloud project and potentially across the broader network.
-   **Model Poisoning and Inference Hijacking:** The attacker can manipulate the model to produce incorrect outputs, sabotage business processes relying on AI, or steal inference data sent to the model endpoint.
-   **Supply Chain Risk:** This vulnerability introduces a critical supply chain risk into the MLOps lifecycle, compromising models before they are even deployed.

## IOCs — Directly from Articles

No specific Indicators of Compromise (IOCs) were provided in the source article, as it details a vulnerability rather than a specific active campaign.

## Cyber Observables — Hunting Hints

Security teams may want to hunt for the following patterns to identify potential misuse or vulnerable configurations:

| Type | Value | Description |
|---|---|---|
| Log Source | Google Cloud Audit Logs | Monitor for `storage.buckets.create` and `storage.objects.create` events. |
| Log Pattern | `principalEmail` does not match project | Alert when a GCS bucket is accessed or written to by a service account or user from a different project, especially for buckets with predictable names. |
| GCS Bucket Name | `*-vertex-ai-staging` | Proactively search for public or externally-owned buckets in your organization that match the default Vertex AI staging pattern. |
| Network Traffic | Egress from Vertex AI Endpoints | Monitor for unexpected outbound network connections from Vertex AI serving containers to unknown IP addresses or domains. |

## Detection & Response

Detecting and responding to this threat requires a focus on both preventative and detective controls.

**Detection Strategies:**
1.  **Dependency Scanning:** Regularly scan Python environments and `requirements.txt` files to identify vulnerable versions of the `google-cloud-aiplatform` SDK (`1.139.0`, `1.140.0`).
2.  **Cloud Audit Logging:** In Google Cloud Logging, create alerts based on queries that detect cross-project access to GCS buckets. Look for `storage.objects.create` events where the `principalEmail` (the actor) belongs to a different project than the bucket's parent project.
3.  **GCS Bucket Inventory:** Regularly audit GCS buckets to ensure no buckets with the pattern `[your-project-id]-[region]-vertex-ai-staging` are owned by an external project.
4.  **D3FEND Techniques:** Implement defensive measures like [D3-NTA: Network Traffic Analysis](https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis) to monitor for anomalous egress from Vertex AI serving environments and [D3-FA: File Analysis](https://d3fend.mitre.org/technique/d3f:FileAnalysis) on model artifacts before deployment.

## Mitigation

**Immediate Actions:**
1.  **Patch Immediately:** The most critical mitigation is to upgrade the `google-cloud-aiplatform` SDK to version `1.148.0` or newer. This can be done by running: `pip install --upgrade google-cloud-aiplatform`.

2.  **Explicitly Define Staging Buckets:** As a defense-in-depth measure, always specify a known, company-owned GCS bucket when uploading models. This overrides the vulnerable default behavior. Example:
    ```python
    from google.cloud import aiplatform

    aiplatform.init(project='your-project', staging_bucket='gs://your-secure-staging-bucket')
    # ... model upload code
    ```

**Strategic Recommendations:**
-   **Principle of Least Privilege:** Ensure the Vertex AI service account (`service-[PROJECT_NUMBER]@gcp-sa-aiplatform.iam.gserviceaccount.com`) has the minimum necessary permissions and does not have overly broad access to unrelated projects or data stores.
-   **Secure MLOps Pipeline:** Integrate security checks into your CI/CD pipeline for ML, including vulnerability scanning of dependencies, static analysis of code, and integrity checks of model artifacts.
-   **D3FEND Hardening:** Apply countermeasures such as [D3-ACH: Application Configuration Hardening](https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening) by enforcing the use of explicit staging buckets in all model upload scripts and CI/CD pipelines.

**Tags:** Vertex AI, Google Cloud, GCP, RCE, Bucket Squatting, Model Poisoning, MLSecOps, AI Security, Python SDK, Unit 42

## Sources
- [Pickle in the Middle – Hijacking Vertex AI Model Uploads for Cross-Tenant RCE](https://unit42.paloaltonetworks.com/hijacking-vertex-ai-model/) — Unit 42 (2026-06-15)

---
Source: https://cyber.netsecops.io/articles/pickle-in-the-middle-hijacking-vertex-ai-model-uploads-for-cross-tenant-rce/
