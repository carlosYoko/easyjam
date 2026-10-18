<script setup lang="ts">
import { computed, onBeforeUnmount, ref, shallowRef } from 'vue';
import { requestSectionNavigation, selectGuideFrame, type GuideCue, type GuideNavigation } from './application/guide-session';
import { minimalGuide, technicalGuideNotice } from './fixtures/minimal-guide';
import type { PlayerPort, PlayerSnapshot } from './application/player-port';
import { createYouTubePlayer } from './infrastructure/youtube-player';
const container = ref<HTMLElement>();
const snapshot = shallowRef<PlayerSnapshot>();
const navigation = shallowRef<GuideNavigation>();
const guideEndSeconds = Math.max(...minimalGuide.sourceTiming.sections.map(section => section.endSeconds));
const guideFrame = computed(() => selectGuideFrame(minimalGuide,
  snapshot.value?.ready && !snapshot.value.error && snapshot.value.state !== 'disposed' ? snapshot.value.seconds : null));
const canNavigate = computed(() => guideFrame.value.status === 'ready'
  && (snapshot.value?.state === 'playing' || snapshot.value?.state === 'paused'));
function cueLabel(cue: GuideCue | null): string {
  return cue?.kind === 'chord' ? cue.symbol : cue?.kind === 'rest' ? 'Silencio · no rasguear' : 'Sin evento preparado · no rasguear';
}
function navigate(sectionId: string) {
  if (player) navigation.value = requestSectionNavigation(minimalGuide, sectionId, player);
}
// Fixed-video metadata reviewed via Data API on 2026-10-18; see docs/validation/S01-material.md.
// This review applies only to M7lc1UVf-VE, not arbitrary videos or a public deployment.
const reviewedMadeForKids = ref<boolean | null>(false);
let player: PlayerPort | undefined;
let unsubscribe: (() => void) | undefined;
function load() {
  if (reviewedMadeForKids.value === null || !container.value || player) return;
  const mount = document.createElement('div');
  container.value.append(mount);
  player = createYouTubePlayer(mount, location.origin);
  unsubscribe = player.subscribe(value => { snapshot.value = value; });
}
onBeforeUnmount(() => { unsubscribe?.(); player?.dispose(); });
</script>

<template>
  <main>
    <header><p class="eyebrow">EASYJAM / LABORATORIO 01</p><h1>Primero, escuchar.</h1>
      <p>Prueba técnica de YouTube. Sin arreglo musical ni transcripción del vídeo.</p></header>
    <section aria-labelledby="source-title">
      <h2 id="source-title">Un vídeo, su reloj real.</h2>
      <p>Al cargar se conecta con YouTube y Google, que reciben tu dirección IP y datos del navegador y pueden usar cookies.
        No se extrae ni se almacena audio o vídeo.</p>
      <p><a href="https://www.youtube.com/t/terms">Condiciones de YouTube</a> ·
        <a href="https://policies.google.com/privacy">Privacidad de Google</a></p>
      <p v-if="reviewedMadeForKids === null" role="status">Carga bloqueada: falta comprobar Made for Kids mediante la API oficial. La reproducción técnica se probó, pero la revisión de cumplimiento sigue pendiente.</p>
      <button :disabled="reviewedMadeForKids === null || !!snapshot" @click="load">Cargar vídeo de YouTube</button>
      <div ref="container" class="player" aria-label="Reproductor oficial de YouTube"></div>
      <div class="controls">
        <button :disabled="!snapshot?.ready || !!snapshot.error" @click="player?.play()">Reproducir</button>
        <button :disabled="!snapshot?.ready || !!snapshot.error" @click="player?.pause()">Pausar</button>
      </div>
    </section>
    <section aria-labelledby="guide-title">
      <p class="eyebrow">GUÍA / PRUEBA DE RELOJ</p>
      <h2 id="guide-title">Ahora y después.</h2>
      <p class="fixture-notice">{{ technicalGuideNotice }}</p>
      <p v-if="guideFrame.status === 'invalid-guide'" role="alert">Guía técnica inválida: no se seleccionan eventos ni se permite navegar.</p>
      <p v-else-if="guideFrame.status === 'invalid-time'" data-testid="guide-unavailable">Sin tiempo observado utilizable. Carga el vídeo; si hay un error, la guía no inventa una selección.</p>
      <div v-else class="guide-cards">
        <article aria-live="polite" aria-atomic="true">
          <p class="eyebrow">AHORA</p>
          <h3 data-testid="current-section">{{ guideFrame.currentSection?.name ?? 'Fuera de las secciones preparadas' }}</h3>
          <p class="cue-name" data-testid="current-cue" :data-kind="guideFrame.currentCue?.kind ?? 'gap'">{{ cueLabel(guideFrame.currentCue) }}</p>
          <p v-if="guideFrame.currentCue" class="note">Referencia ficticia: compás {{ guideFrame.currentCue.musical.bar }}, pulso {{ guideFrame.currentCue.musical.beat }} · {{ guideFrame.currentCue.musical.durationBeats }} pulsos.</p>
        </article>
        <article>
          <p class="eyebrow">DESPUÉS</p>
          <p class="note">Próxima sección</p>
          <h3 data-testid="next-section">{{ guideFrame.nextSection?.name ?? 'Sin sección posterior' }}</h3>
          <p class="note">Próximo evento · puede seguir en la sección actual</p>
          <p class="cue-name next-cue" data-testid="next-cue">{{ guideFrame.nextCue ? cueLabel(guideFrame.nextCue) : 'Sin evento posterior' }}</p>
        </article>
      </div>
      <p v-if="guideFrame.status === 'ready' && snapshot && snapshot.seconds >= guideEndSeconds" class="note">Fin de la secuencia técnica; el vídeo continúa. No hay más eventos preparados.</p>
      <nav aria-label="Navegar por secciones de prueba" class="controls section-navigation">
        <button v-for="section in minimalGuide.sections" :key="section.id" :disabled="!canNavigate"
          :aria-current="guideFrame.currentSection?.id === section.id ? 'location' : undefined" @click="navigate(section.id)">Ir a {{ section.name }}</button>
      </nav>
      <p class="note">Navegación disponible al observar reproducción o pausa. Desde cued/idle, reproduce y pausa primero: un salto puede iniciar reproducción. Durante buffering no se emiten nuevos saltos.</p>
      <p v-if="navigation?.status === 'requested'" data-testid="navigation-request" class="note">Último destino solicitado: sección {{ navigation.sectionId.toUpperCase() }}, {{ navigation.targetSeconds }} s{{ navigation.preservePause ? ' · conservar pausa' : '' }}. La selección depende del tiempo observado, no del destino.</p>
      <p v-else-if="navigation" role="alert">Navegación no emitida: {{ navigation.reason }}. Comprueba los datos y el estado observado del reproductor.</p>
    </section>
    <section aria-labelledby="diagnostic-title">
      <h2 id="diagnostic-title">Diagnóstico observado</h2>
      <dl><dt>Estado</dt><dd data-testid="state">{{ snapshot?.state ?? 'Sin cargar' }}</dd>
        <dt>API lista</dt><dd>{{ snapshot?.ready ? 'Sí' : 'No' }}</dd>
        <dt>Tiempo (s)</dt><dd data-testid="seconds">{{ snapshot?.seconds.toFixed(2) ?? '—' }}</dd>
        <dt>Duración (s)</dt><dd>{{ snapshot?.durationSeconds ?? 'Desconocida' }}</dd></dl>
      <p v-if="snapshot?.error" role="alert">Error {{ snapshot.error.code }} · fase {{ snapshot.error.phase }} · {{ snapshot.error.elapsedMs }} ms.
        No se ha acreditado reproducción. Revisa la conexión y los controles oficiales; recarga para reabrir.</p>
      <p class="note">Una orden no confirma su resultado: estado y tiempo proceden del reproductor. Consulta cada 200 ms, no es una garantía de precisión musical.</p>
    </section>
  </main>
</template>

<style>
:root { font-family: Georgia, serif; color: #f3eee2; background: #181d1b; color-scheme: dark; }
body { margin: 0; }
main { max-width: 900px; margin: auto; padding: 40px 24px; }
.eyebrow, button, dt, .note { font-family: monospace; }
.eyebrow { letter-spacing: .14em; color: #c6d9a3; }
h1 { font-size: clamp(2.4rem, 6vw, 4rem); margin: 16px 0; font-weight: normal; }
h2 { font-size: 1.4rem; font-weight: normal; }
p { max-width: 75ch; line-height: 1.6; }
section { border-top: 1px solid #617064; padding: 20px 0; }
a { color: #d4e8ad; text-underline-offset: 4px; }
button { padding: 12px 18px; border: 1px solid #c6d9a3; background: #c6d9a3; color: #182016; cursor: pointer; }
button:disabled { background: transparent; color: #a2a89d; border-color: #646c61; cursor: default; }
button:focus-visible, a:focus-visible { outline: 3px solid #ffcd76; outline-offset: 5px; }
.controls { display: flex; flex-wrap: wrap; gap: 12px; margin: 16px 0; }
.fixture-notice { border-left: 3px solid #c6d9a3; padding-left: 16px; }
.guide-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 16px; margin: 24px 0; }
.guide-cards article { border: 1px solid #617064; padding: 20px; }
.guide-cards h3 { font-weight: normal; margin-bottom: 0; }
.cue-name { font-size: clamp(1.6rem, 4vw, 2.5rem); margin: 16px 0; line-height: 1.25; }
.next-cue { color: #c1c8ba; }
.section-navigation button[aria-current] { outline: 1px solid #f3eee2; outline-offset: 3px; }
.player { margin-top: 24px; min-width: 200px; }
.player iframe { display: block; width: min(100%, 640px); min-height: 270px; border: 0; }
dl { display: grid; grid-template-columns: 160px 1fr; gap: 12px; }
dd { margin: 0; font-variant-numeric: tabular-nums; }
.note { font-size: .85rem; color: #c1c8ba; }
[role=alert] { border-left: 3px solid #ffcd76; padding-left: 16px; }
</style>
