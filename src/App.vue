<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef } from 'vue';
import type { PlayerPort, PlayerSnapshot } from './application/player-port';
import { createYouTubePlayer } from './infrastructure/youtube-player';
const container = ref<HTMLElement>();
const snapshot = shallowRef<PlayerSnapshot>();
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
.controls { display: flex; gap: 12px; margin: 16px 0; }
.player { margin-top: 24px; min-width: 200px; }
.player iframe { display: block; width: min(100%, 640px); min-height: 270px; border: 0; }
dl { display: grid; grid-template-columns: 160px 1fr; gap: 12px; }
dd { margin: 0; font-variant-numeric: tabular-nums; }
.note { font-size: .85rem; color: #c1c8ba; }
[role=alert] { border-left: 3px solid #ffcd76; padding-left: 16px; }
</style>
