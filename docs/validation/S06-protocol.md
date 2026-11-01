# S06 — Proposed evaluation protocol

Date: 2026-10-31
Status: **T01 documentary proposal complete under D014; DRAFT musical protocol, material/reference gate T07 blocked, no analysis results or acceptance thresholds.**
Authorization: T01 research is complete and T02 contracts/CLI were separately authorized and completed. The user approved a bounded T07 evidence review on 2026-11-01; its [gate record](S06-reference.md) remains BLOCKED. No installation, analyzer execution, third-party contact, material acceptance or advancement to T03 follows from this review.

## Purpose and gates

Evaluate full-song usefulness for simplified rhythm guitar, not exact transcription of all instruments. Keep original engine output separate from reference and derived arrangement. The material review in [S06-material.md](S06-material.md) is a prerequisite. Missing permission, reference or recording identity blocks execution; a completed process or well-formed JSON is not acceptance.

1. T01 closes as documented research/proposed protocol only (explicit user-approved D014 split). T02 contracts/diagnostics are separately completed and verified, using labelled test doubles and rejecting unapproved material; no analysis or acceptance of candidates.
2. Complete mandatory T07 before T03: clear material, rights, independent reference, edition, concrete calibration/holdout intervals and review actual protocol/tool proposal. Then authorize T03 independently and pin approved artifacts before installation. Order: T01 → T02 → T07 → T03 → T04 → T05 → T06. Missing reference still blocks analysis; no integrated S06 criterion is waived.
3. T03/T04 pilot only on calibration intervals; disclose the full-song engine output but do not score or tune on reserved holdout.
4. Agree thresholds, matching tolerances, required reference coverage and resource limits after pilot and before T05/T06 holdout verdict. If full output/reference has already influenced choices, disclose leakage and reserve new independently annotated intervals/material rather than claiming blind validation.
5. Run frozen configuration over complete song, score reserved intervals and report all errors and excluded regions. This single-song experiment does not prove genre-wide quality or URL-only product readiness.

## Candidate tools: evidence and minimum proposal

Primary pages retrieved 2026-10-31; documentation claims are not local compatibility tests.

| Candidate | Evidence / suitability | Version, licensing and Windows gate |
| --- | --- | --- |
| Chordino / NNLS Chroma | [Isophonics](https://www.isophonics.net/nnls-chroma) names version 1.1, chord/chroma plugins and a Windows binary. First proposed harmony baseline, not a full rhythm/notational engine. | Advertised Windows binary is win32: verify host/plugin architecture match and availability before adoption. Exact release hash, license text, host license and dependencies remain unverified; no installation approved. |
| Sonic Annotator (host candidate) | [Official host page](https://www.vamp-plugins.org/sonic-annotator/) documents CLI batch Vamp extraction and CSV/RDF output, under GNU GPL. [Release 1.7](https://github.com/sonic-visualiser/sonic-annotator/releases/tag/sonic-annotator-1.7), commit `7465f2b7838964f42103ac254709532e9b6624e6`, advertises `sonic-annotator-1.7-win64.zip`. | **Do not combine this win64 host with the advertised Chordino 1.1 win32 plugin as if validated.** A compatible host/plugin pair and exact artifact/license inspection are still required before adoption; no binary downloaded or executed. A 64-bit OS alone does not establish plugin compatibility. |
| QM Vamp plugins | [Official documentation](https://vamp-plugins.org/plugin-doc/qm-vamp-plugins.html) lists beat, bar/beat, onset and segmentation tools and source/binaries for Windows. Consider bar/beat only if required to test the temporal dimension. | Concrete release/license/host compatibility not verified. Do not install entire collection merely because it exists. Non-causal onset processing may return results only at end: no incremental musical output is not proof of a hang. |
| Basic Pitch | [Official README](https://raw.githubusercontent.com/spotify/basic-pitch/main/README.md) documents polyphonic note/MIDI output, works best one instrument at a time, Windows and Python 3.7–3.11, ONNX default on Windows (runtime conditions vary with Python). Candidate only for a justified note experiment, not primary mixed-audio chord solution. | README links Apache-2.0; verify pinned code, model and dependency license files individually. Exact release not selected. Do not infer compatibility with a newer Python from documentation of older versions. |

Minimum proposal: Chordino with one compatible command-line Vamp host for harmony; add only the temporal tool justified by reference coverage. Do not choose an engine until licenses/binaries are verified. Basic Pitch, source separation and preprocessing are deferred unless a specific measured baseline error motivates one isolated comparison. No custom detector, renderer, cloud upload or service purchase.

## Reproducibility record (T02 foundation; musical run still pending)

T02 implements manifest/output validation, streaming source checksum, run ID, timestamps, runtime/hash diagnostics and safe local reports; see [S06-evaluator.md](S06-evaluator.md). It has no production adapter, musical metrics or resource benchmark. T07's [gate record](S06-reference.md) remains blocked. The following full experiment record is still required for later authorized runs; do not confuse it with current CLI capabilities.

Each run needs run ID, source/reference checksums, permission record, exact engine/host/model/dependency versions and hashes, configuration/hash, audio conversion details including channel policy and delay, OS/CPU/RAM, runtime/peak memory/disk use, phase timestamps and exit status. Record seeds where relevant and nondeterminism. Preserve original output locally, not overwritten by arrangement generation. Do not silently substitute another decoder/model/configuration after a failure.

Reference schema must distinguish seconds from musical positions, sounding pitch from written guitar pitch, and known rest from unknown. Use half-open intervals and explicit recording identity. Review transcription uncertainty before inspecting engine output; retain provenance and revisions. A correction motivated by an engine disagreement requires independent justification and must be disclosed.

## Calibration / evaluation split

Candidate: Code Monkey (189.3093877 s reported by Windows), with an artist-hosted untimed chord chart. It is not yet accepted material; neither concrete musical timestamps nor the full-song occurrence/reference map are established. Do not manufacture these by assuming constant BPM or uniformly spacing chord labels. Before running: map full structure and reserve nonoverlapping, section-aware intervals covering beginning/middle/end, harmonic transitions, sustained events and actual rests if present. Avoid treating repeated copies of the same phrase as independent evidence. Record interval list and rationale with reference hash; calibration and holdout must both contain meaningful musical variation. No arbitrary percentage can compensate for missing coverage. Unknown regions remain excluded with explicit coverage; do not exclude difficult regions merely to improve scores.

## Metrics (reported separately; no aggregate success score)

| Dimension | Proposed measurement and diagnostic |
| --- | --- |
| Harmony | Duration-weighted root accuracy over independently known intervals; separately report major/minor/extended/slash compatibility and full supported-label agreement. Publish vocabulary/reduction policy and confusion counts. Correct root for power-chord reduction is not proof of correct original chord. Denominator, covered seconds, unsupported labels and unknown predictions explicit. |
| Harmonic transitions | One-to-one boundary matching at an agreed tolerance: precision/recall/F1, signed and absolute timing error median/p95, missing/spurious changes. Fix tolerance on calibration, not holdout. |
| Rhythm notes/attacks | Only with independently annotated performed guitar events: pitch/onset precision/recall and duration/offset errors, matching policy for simultaneous notes and octaves explicit. Mixed-audio chord changes do not establish strum attacks. |
| Beat/downbeat/meter | Separate beat and downbeat matches/errors; report half/double-tempo and phase errors; meter and bar-boundary correctness against reference. Do not infer correct bars from steady BPM alone. |
| Rests | Precision/recall and interval overlap for known guitar rests, plus false sounding events and unknown coverage. Chordino N.C. is neither rest nor evidence of silence. |
| Sections | Boundary precision/recall and timing error against independent structure; report structural coverage/unknowns. Repeated sections retain occurrence identity. |
| Recording alignment | Independent landmarks at start/middle/end and changes; signed/absolute residual median/p95/max and drift, missing landmarks, edits. Fit anchors on calibration landmarks; evaluate on different landmarks. Checking residual at anchors used to fit the map is not independent validation. |
| Notational feasibility | Full coverage or explicit missing intervals; bar-duration sums, ties across bars, sounding/written pitch convention, same events in staff/TAB, provisional string/fret validity and monotonic mapping by occurrence. A valid JSON/MIDI is not a demonstrated score or global fingering optimizer. |

Reference absence yields **not measurable**, not zero error, perfect score or invented music. Report uncertain intervals, musical consequences and coverage alongside every metric. Arrangement quality is evaluated separately from original transcription: label derived rhythmic patterns, harmonic simplification and provisional positions.

## Controlled comparison and resources

Baseline first. Propose at most one change with a falsifiable hypothesis (for example, preprocessing improves root errors in a documented region). Same input/reference/hardware/evaluation policy; log transformation delay and compare all dimensions, not just the improved one. Keep baseline if tradeoff is worse or no useful hypothesis exists. Do not treat source-separated artifacts as guaranteed improvement.

Read-only native hardware inventory on 2026-10-31: Windows 11 Home `10.0.26300`, 64-bit; AMD Ryzen AI 7 350 with Radeon 860M, 16 logical processors; **31.29 GiB RAM**, snapshot **16.25 GiB free RAM**, **488.81 GiB free local disk**. Free values are transient inventory, not a benchmark or reserved capacity. No analyzer runtime, peak-memory measurement or resource ceiling has been established. Recheck free resources before T03 and propose operational limits for review based on the actual approved host/plugin and pilot measurements, not total hardware alone. Record elapsed time, peak memory and output growth; quality outranks speed, with no deadline tied to song duration. Network timeout, child-process liveness and musical progress are separate. An active non-causal tool can be healthy without emitting events. Cancellation, resource exhaustion or unknown remote result must persist a safe error; no automatic unlimited retry or partial acceptance.

## Failure verification for future tasks

Reject missing/unreadable file, checksum mismatch, absent/expired permission, invalid reference units, incompatible recording, missing binary/model, invalid/nonfinite output and nonzero exit. Report phase/code/safe detail and no accepted result. Test both valid full-song run and a controlled real failure in later authorized units. Never log personal paths, protected audio, credentials or signed URLs. No functional tests/analyzer command are executed for this documentation-only unit.

## Review outcome required

Approve or amend source/reference, concrete segments, metric policies and minimum compatible tool proposal in T07 before T03 analysis. Thresholds remain pending pilot evidence and explicit agreement before holdout verdict. T01 is complete only as documentary research under the explicit D014 scope split, and T02 only as verified contracts/CLI, not as accepted material or evidence of musical quality. The bounded T07 review remains blocked; the source README documents Sonic Annotator 1.7 as GPL-2.0-or-later, but exact plugin/binary licensing and a compatible pair are still unverified. No essential gate is waived. T03 and later units require separate authorization after the T07 gate is accepted; no S06 closure or S07 advancement. Third-party contact remains explicitly disallowed.
