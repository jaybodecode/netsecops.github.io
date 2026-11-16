# Cloudflare Fixes Cross-Tenant Data Leak in Container Service

**Severity:** medium | **Category:** Vulnerability,Cloud Security | **Updated:** 2026-10-05 | **Reading time:** 4 min

Cloudflare has patched a significant cross-tenant data exposure vulnerability in its Containers platform. The flaw, discovered by a security researcher, could have allowed a paying customer to read residual data, including database pages and directory structures, from other tenants' containers on the same physical host. The vulnerability was caused by a misconfiguration in the Linux device mapper thin provisioning layer. Cloudflare found no evidence of malicious exploitation and has removed the misconfiguration, which involved the 'skip_block_zeroing' option, to remediate the issue.

## Executive Summary
**[Cloudflare](https://www.cloudflare.com/)** has remediated a significant data exposure vulnerability in its **Cloudflare Containers** and **Sandboxes** services. The flaw, reported on September 4, 2026, by a security researcher, could have allowed a malicious tenant to read residual data left on disk by other tenants' containers that previously ran on the same physical host. This type of vulnerability is known as a cross-tenant data exposure. The root cause was a performance-optimization setting in the underlying storage system that disabled the zeroing of deallocated data blocks. Cloudflare conducted a thorough analysis of historical data and found no evidence that this vulnerability was maliciously exploited. The issue has been fixed by reverting to the default, more secure storage configuration.

## Vulnerability Details
The vulnerability was not a traditional virtual machine escape but a subtle information leak at the storage layer. Cloudflare's container platform uses Linux device mapper thin provisioning (`dm-thin`) for storage allocation. For performance reasons on certain storage pools, the `skip_block_zeroing` option was enabled. This option instructs the kernel not to wipe a `64 KiB` storage block with zeros before reallocating it to a new container.

The researcher, Oren Yomtov, discovered that by writing a small amount of data (e.g., `4 KiB`) to a newly allocated block, they could then read the entire `64 KiB` block. This block could contain up to `60 KiB` of stale data from a previous container that had used that same physical storage block. This allowed the researcher to recover fragments of data from other tenants, including file system structures, database pages, and even complete SQLite databases. An attacker could not target a specific victim, as the data they could access depended entirely on the unpredictable workload placement and block reallocation by the hypervisor.

## Affected Systems
- **Cloudflare Containers**: Customers on the Workers Paid plan using this service.
- **Cloudflare Sandboxes**: This service is built on the same underlying platform and was also affected.

The vulnerability only affected paying customers, as they had the necessary permissions to provision storage in the affected manner. Free-tier users were not impacted.

## Exploitation Status
Cloudflare has stated that there is **no evidence of malicious exploitation** of this vulnerability in the wild. Their incident response team developed signatures to detect the specific exploitation pattern and scanned historical disk I/O telemetry. The only activity found matched the benign research conducted by the reporting security researcher. Cloudflare awarded a bug bounty for the responsible disclosure.

## Impact Assessment
Had this vulnerability been exploited, it could have led to a serious breach of customer data confidentiality. In a multi-tenant cloud environment, strict separation between tenants is a fundamental security requirement. This flaw broke that isolation at the storage layer. An attacker could have potentially recovered sensitive information such as API keys, passwords, private source code, or customer data that was written to disk by another tenant's container. While an attacker could not specifically target another customer, a large-scale, persistent effort could have yielded a significant amount of sensitive data over time. The fact that it was discovered and fixed without evidence of abuse prevented a potentially major security incident.

## Cyber Observables — Hunting Hints
For cloud providers or large-scale container platform operators, detecting this type of issue requires deep introspection of the storage layer:
| Type | Value | Description | Context |
|---|---|---|---|
| `other` | `dm-thin` with `skip_block_zeroing` enabled | This kernel-level configuration is the root cause. Auditing hypervisor and storage node configurations for this setting is key. | Host configuration files, kernel parameters |
| `log_source` | `Disk I/O telemetry` | Analyzing patterns where a process reads more data from a block than it has written could indicate reading of residual data. | Low-level system monitoring, custom kernel modules |
| `file_path` | `/sys/module/dm_thin_pool/parameters/` | Kernel parameter directory for device mapper thin provisioning. Check for non-default settings. | Host-level configuration audit |

## Detection Methods
Detecting exploitation of this specific vulnerability is extremely difficult without access to the cloud provider's low-level infrastructure telemetry. Cloudflare's detection method involved:

1.  **Pattern Signature**: Building a signature based on the researcher's proof-of-concept, which involved a specific sequence of small writes followed by large reads to the same block offset.
2.  **Historical Telemetry Analysis**: Applying this signature retroactively to terabytes of historical disk I/O logs from the container platform to search for matching patterns. [`D3-SFA: System File Analysis`](https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis) at a massive scale.

For tenants of a cloud provider, this type of flaw is generally undetectable from within their container or VM.

## Remediation Steps
The remediation was straightforward and implemented by Cloudflare's engineering team:

1.  **Configuration Change**: Cloudflare removed the `skip_block_zeroing` option from their `dm-thin` storage pool configurations. This reverted the system to its default, secure behavior of always zeroing out a block before it is re-provisioned to a new tenant.
2.  **Verification**: The fix was verified by the reporting researcher, who confirmed that they could no longer read residual data after the change was deployed.

This incident serves as a crucial reminder that performance optimizations in complex systems can sometimes have unintended and severe security consequences. [`D3-PH: Platform Hardening`](https://d3fend.mitre.org/technique/d3f:PlatformHardening)

**Tags:** Cloud Security, Vulnerability, Cloudflare, Containers, Multi-tenancy, Data Exposure

## Sources
- [Cloudflare Fixes Cross-Tenant Data Exposure in Containers](https://www.infoq.com/news/2026/10/cloudflare-cross-tenant-exposure/) — InfoQ (2026-10-05)
- [Cloudflare Containers Flaw Could Expose Data From Other Customers' Workloads](https://cybersecuritynews.com/cloudflare-containers-vulnerability/) — Cybersecurity News (2026-10-05)

---
Source: https://cyber.netsecops.io/articles/cloudflare-fixes-cross-tenant-data-exposure-in-container-service/
