# S06 — Independent reference and pre-analysis gate

Review date: 2026-11-01  
Status: **BLOCKED — T07 review performed; task not completed, material not accepted, T03 prohibited.**

## Authorized scope and outcome

The user approved reviewing T07 against existing evidence and primary sources after T02. This review does not authorize installation, analyzer execution, third-party contact, paid services, YouTube extraction, a scope reduction or advancement to T03. D014 and all integrated S06 criteria remain intact. T01 documentary closure and T02 contract tests are not musical acceptance evidence.

This is the required explicit gate record, not a completed timed reference. No accepted manifest, reference hash, musical annotations, alignment anchors or calibration/holdout timestamps were invented. No task/slice/milestone completion is claimed.

## Evidence rechecked

Local read-only checks used installed Node and streamed SHA-256 over the existing OS-temporary-directory artifacts. No download, decode, playback, conversion or analysis was run in this review. Personal absolute paths are intentionally omitted.

| Existing artifact | Bytes | SHA-256 on 2026-11-01 | Result |
| --- | --- | --- | --- |
| CodeMonkey.mp3 | 4,319,316 | `3866a8aa2fba54bdc278e8b55b278d73f51c6cf0ad06bf1e9835c409c824d586` | Matches T01 acquired official-player file |
| CodeMonkey-chords.html | 33,583 | `4972b06188247e41d511580b31c3c3c83502ddea3d5ce72f8fc547717160e4de` | Matches retained T01 chart snapshot |
| Coulton-FAQ.html | 49,497 | `539982c1bb2ebd34910b16f8b2224b334eb6047ca4c9b5f5c50f60c0aac7ed6d` | Matches retained T01 permission-source snapshot |

Matching hashes establish artifact identity/availability, not musical coverage, rights to all components, accurate labels or recording correspondence. Temporary storage remains non-durable. Duration 189.3093877 s, format metadata and complete muted local decode are historical T01 observations, not newly measured facts. Official iframe playback for `AEBld6I_AKs` is likewise historical session evidence, not reverified today or proof of the same edition.

Primary sources reread on 2026-11-01:

- [Artist FAQ](https://www.jonathancoulton.com/faq/): explicitly permits noncommercial reuse of the artist's own music under CC BY-NC 3.0, with credit/link, excluding material he does not own such as covers/mashups/remixes. It also says guitar tabs may include user-submitted content; do not infer a chart's authorship/license solely from site hosting.
- [CC BY-NC 3.0 deed](https://creativecommons.org/licenses/by-nc/3.0/): sharing/adaptation with attribution, license link, indication of changes and noncommercial restriction. This supports the proposed local noncommercial experiment under applicable conditions, not commercial product clearance or a warranty of all rights. A separate byline/license for this chart remains unverified.
- [Artist-hosted Code Monkey chart](https://www.jonathancoulton.com/chords/code-monkey/): contains chord/lyric material, riff and bridge, but no performed timestamps, full occurrence sequence, bar/beat map, guitar onset/offset or rest annotations. It is a harmonic seed, not the timed reference required by S06.

## Acceptance matrix

| T07 obligation | Evidence available | Remaining requirement | Gate |
| --- | --- | --- | --- |
| Complete independent permitted source | Official-player file and matching SHA-256; prior local metadata/decode | Full-song musical coverage and reviewed composition/recording/reference permission record for intended operations | Pending, not accepted |
| Legitimate independent timed musical reference | Artist-hosted untimed harmonic seed only | Reviewed performed occurrences, time/beat/bar/sections and relevant guitar attacks/durations/rests, provenance/license, uncertainty and sufficient coverage | **Blocked** |
| Same audio/YouTube recording and edition | Candidate ID/album and prior official playback | Independent landmarks at beginning/middle/end/transitions, edits/speed/delay assessment and measured error | **Blocked** |
| Frozen calibration and holdout | Draft selection policy | Concrete section-aware intervals and independent held-out landmarks tied to a real reference version/hash | **Blocked** |
| Compatible licensed minimum tool pair | Documentary candidates below | Compatible architecture/artifact pair, exact artifact hashes and applicable license/dependency inspection | **Blocked** |
| Explicit protocol/material review | Draft protocol plus this record | Evidence sufficient for review and explicit acceptance before separately authorizing T03 | **Not approved** |

No absent dimension receives a perfect score, a zero-error assumption or an inferred rest. The T02 schema's explicit unmeasured fields do not waive T07/S06 requirements.

## Minimum-tool proposal: still not adopted

- [Chordino / NNLS Chroma official page](https://www.isophonics.net/nnls-chroma) still advertises **1.1** and `nnls-chroma-win32-v1.1.zip`. It describes an audio-feature/chord plugin, not an independent performed reference.
- [Sonic Annotator 1.7 release](https://github.com/sonic-visualiser/sonic-annotator/releases/tag/sonic-annotator-1.7), commit `7465f2b7838964f42103ac254709532e9b6624e6`, lists `sonic-annotator-1.7-win64.zip` (2025-05-28). Asset listing is not a verified binary download or local compatibility test.
- The [tagged README](https://raw.githubusercontent.com/sonic-visualiser/sonic-annotator/sonic-annotator-1.7/README.md) identifies the host as **GPL-2.0-or-later**, describes Vamp batch extraction and MP3 input, and lists libraries with additional licenses. The tagged COPYING starts with GPL version 2. This is source-document inspection, not a complete inspection of a binary distribution and bundled components.
- An advertised **win64 host + win32 plugin is not an accredited compatible pair**. Do not install them based on a 64-bit OS or assume an unverified bridge. A matching released pair or separately approved build route must be established first.
- Retrieval of the host website and the linked plugin file index failed through the page-retrieval tool. That is a retrieval diagnostic, not proof that upstream artifacts do not exist. No alternate binary mirror, source build, package installation or execution was attempted.

The minimal proposal remains one compatible command-line Vamp host plus Chordino for a harmony baseline, subject to the outstanding checks. A temporal tool needs reference-based justification. No engine output may be used to create its own independent gold standard.

## Concrete route to unblock

1. Retain Code Monkey only if a legitimate timed reference can be acquired or independently authored/reviewed from the permitted recording, with actual evidence for the required dimensions. This agent has no verified listening/annotation observations to supply those labels; inventing them or copying a detector is not an option.
2. Establish permitted official-playback correspondence through independent musical landmarks and record uncertainty. Do not extract the YouTube stream or fit/test on the same landmarks.
3. Freeze the reviewed reference and concrete calibration/holdout intervals before candidate analysis; review permissions, protocol and minimum compatible tool artifacts together.
4. If a suitable reference cannot be established under the current no-contact restriction, propose a bounded search for another complete guitar/audio/reference/video pair with clear provenance. Candidate substitution requires review, not automatic adoption. Do not silently substitute short excerpts, synthetic music or piano-only material.

Third-party contact remains disallowed. No new reference was discovered or acquired in this bounded review; this is not an exhaustive search or a claim that none exists. T07 stays unchecked. T03 remains prohibited until the essential missing evidence is resolved and the gate is explicitly accepted.

## Verification and handoff

- All three existing local artifacts are present and match their recorded T01 checksums.
- The three validation documents exist and are nonempty; Markdown whitespace checks pass. These checks validate the documentary record only, not acceptance.
- No application code, dependencies, lockfile, player selection, protected media or generated SDD runtime/journal state changed. No new application tests or browser checks are claimed for this review.
- Related records: [material](S06-material.md), [protocol](S06-protocol.md), [T02 evaluator](S06-evaluator.md); canonical T07 plan remains incomplete.
