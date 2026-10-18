import type { TechnicalGuide } from '../application/guide-session';

export const technicalGuideNotice = 'Secuencia ficticia de prueba técnica; no transcripción del vídeo';

// Invented musical references and a separately prepared source-time correspondence.
// Neither the chord symbols nor the bar/beat references describe the video's audio.
export const minimalGuide = {
  sections: [
    { id: 'a', name: 'Sección A · prueba' },
    { id: 'b', name: 'Sección B · prueba' },
  ],
  cues: [
    { id: 'c', sectionId: 'a', kind: 'chord', symbol: 'C', musical: { bar: 1, beat: 1, durationBeats: 3 } },
    { id: 'rest-a', sectionId: 'a', kind: 'rest', musical: { bar: 1, beat: 4, durationBeats: 1 } },
    { id: 'g', sectionId: 'a', kind: 'chord', symbol: 'G', musical: { bar: 2, beat: 1, durationBeats: 2 } },
    { id: 'am', sectionId: 'b', kind: 'chord', symbol: 'Am', musical: { bar: 4, beat: 1, durationBeats: 3 } },
    { id: 'rest-b', sectionId: 'b', kind: 'rest', musical: { bar: 4, beat: 4, durationBeats: 2 } },
    { id: 'f', sectionId: 'b', kind: 'chord', symbol: 'F', musical: { bar: 5, beat: 2, durationBeats: 3 } },
  ],
  sourceTiming: {
    sections: [
      { id: 'a', startSeconds: 0, endSeconds: 16 },
      { id: 'b', startSeconds: 20, endSeconds: 36 },
    ],
    cues: [
      { id: 'c', startSeconds: 0, endSeconds: 6 },
      { id: 'rest-a', startSeconds: 6, endSeconds: 8 },
      { id: 'g', startSeconds: 8, endSeconds: 12 },
      { id: 'am', startSeconds: 20, endSeconds: 26 },
      { id: 'rest-b', startSeconds: 26, endSeconds: 30 },
      { id: 'f', startSeconds: 30, endSeconds: 36 },
    ],
  },
} as const satisfies TechnicalGuide;
