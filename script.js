/**
 * SoundDeck - Windows App Volume Control
 * Vanilla JavaScript Implementation
 */

// =========================================================================
// 1. DATA & TRANSLATIONS
// =========================================================================
const INITIAL_APPS = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    volume: 32,
    isMuted: false,
    color: '#25D366',
  },
  {
    id: 'chrome',
    name: 'Google Chrome',
    volume: 81,
    isMuted: false,
    color: '#EA4335',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    volume: 40,
    isMuted: false,
    color: '#1DB954',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    volume: 40,
    isMuted: false,
    color: '#FF0000',
  },
];

const translations = {
  pt: {
    heroTitle1: 'Controle o áudio dos seus aplicativos',
    heroTitle2: 'em um só lugar.',
    downloadBtn: 'Download',
    version: 'Version 1.4',
    forWindows: 'For Windows',
    downloadToast: 'Download do SoundDeck-Setup-v1.4.exe iniciado!',
    tooltipText: 'Arraste para girar, role o mouse ou clique para mutar',
    muteText: 'Mudo',
    appDescription:
      'Controle o áudio dos seus aplicativos em um só lugar. O Soundeck organiza os controles em uma barra lateral que pode ser movida e configurada. Instale a extensão do seu navegador para ajustar o volume de cada aba com mídia compatível.',
    howToInstallTitle: 'Como instalar',
    step1: 'Baixe e abra o Soundeck para Windows.',
    step2: 'Baixe a extensão correspondente ao seu navegador. Use a extensão e o app da mesma versão.',
    step3Title: 'Instale a extensão:',
    firefoxLabel: 'Firefox:',
    firefoxStep: 'abra',
    firefoxAction: ', clique em Carregar extensão temporária… e selecione o arquivo',
    firefoxNote: '. A instalação temporária precisa ser repetida após fechar o Firefox.',
    chromiumLabel: 'Chrome, Edge e outros navegadores Chromium:',
    chromiumExtract: 'extraia o arquivo',
    chromiumOpen: ', abra a página de extensões (',
    chromiumOr: 'ou',
    chromiumDevMode: '), ative o Modo do desenvolvedor e clique em',
    chromiumLoadUnpacked: 'Carregar sem compactação',
    chromiumSelect: '. Selecione a pasta extraída.',
    step4: 'Deixe o Soundeck aberto e recarregue a aba que está reproduzindo áudio.',
    disclaimer:
      'Sem a extensão, o Soundeck controla o volume por aplicativo do Windows. Com ela, também pode controlar individualmente mídias compatíveis em abas do navegador. Algumas páginas que usam áudio especial, como Web Audio, podem não permitir o ajuste individual.',
  },
  en: {
    heroTitle1: 'Control the audio of your applications',
    heroTitle2: 'all in one place.',
    downloadBtn: 'Download',
    version: 'Version 1.4',
    forWindows: 'For Windows',
    downloadToast: 'SoundDeck-Setup-v1.4.exe download started!',
    tooltipText: 'Drag to adjust, scroll mouse wheel or click to mute',
    muteText: 'Muted',
    appDescription:
      'Control the audio of your applications in one place. Soundeck organizes controls into a movable and customizable sidebar. Install your browser extension to adjust the volume of each tab with supported media.',
    howToInstallTitle: 'How to install',
    step1: 'Download and open Soundeck for Windows.',
    step2: 'Download the extension corresponding to your browser. Use the extension and app of the same version.',
    step3Title: 'Install the extension:',
    firefoxLabel: 'Firefox:',
    firefoxStep: 'open',
    firefoxAction: ', click Load Temporary Add-on… and select the',
    firefoxNote: ' file. Temporary installation must be repeated after closing Firefox.',
    chromiumLabel: 'Chrome, Edge and other Chromium browsers:',
    chromiumExtract: 'extract the',
    chromiumOpen: ' file, open the extensions page (',
    chromiumOr: 'or',
    chromiumDevMode: '), enable Developer mode and click',
    chromiumLoadUnpacked: 'Load unpacked',
    chromiumSelect: '. Select the extracted folder.',
    step4: 'Keep Soundeck open and reload the tab playing audio.',
    disclaimer:
      'Without the extension, Soundeck controls volume per Windows application. With it, you can also individually control compatible media across browser tabs. Certain pages using specialized audio engines, like Web Audio, may not permit individual control.',
  },
  es: {
    heroTitle1: 'Controla el audio de tus aplicaciones',
    heroTitle2: 'en un solo lugar.',
    downloadBtn: 'Descargar',
    version: 'Versión 1.4',
    forWindows: 'Para Windows',
    downloadToast: '¡Descarga de SoundDeck-Setup-v1.4.exe iniciada!',
    tooltipText: 'Arrastra para ajustar, gira la rueda o haz clic para silenciar',
    muteText: 'Silenciado',
    appDescription:
      'Controla el audio de tus aplicaciones en un solo lugar. Soundeck organiza los controles en una barra lateral que se puede mover y configurar. Instala la extensión de tu navegador para ajustar el volumen de cada pestaña con medios compatibles.',
    howToInstallTitle: 'Cómo instalar',
    step1: 'Descarga y abre Soundeck para Windows.',
    step2: 'Descarga la extensión correspondiente a tu navegador. Usa la extensión y la app de la misma versión.',
    step3Title: 'Instala la extensión:',
    firefoxLabel: 'Firefox:',
    firefoxStep: 'abre',
    firefoxAction: ', haz clic en Cargar complemento temporal… y selecciona el archivo',
    firefoxNote: '. La instalación temporal debe repetirse después de cerrar Firefox.',
    chromiumLabel: 'Chrome, Edge y otros navegadores Chromium:',
    chromiumExtract: 'extrae el archivo',
    chromiumOpen: ', abre la página de extensiones (',
    chromiumOr: 'o',
    chromiumDevMode: '), activa el Modo de desarrollador y haz clic en',
    chromiumLoadUnpacked: 'Cargar descomprimida',
    chromiumSelect: '. Selecciona la carpeta extraída.',
    step4: 'Deja Soundeck abierto y recarga la pestaña que esté reproduciendo audio.',
    disclaimer:
      'Sin la extensión, Soundeck controla el volumen por aplicación de Windows. Con ella, también puede controlar individualmente los medios compatibles en las pestañas del navegador. Algunas páginas que utilizan audio especial, como Web Audio, pueden no permitir el ajuste individual.',
  },
};

// Application state
let currentLang = 'pt';
let appsState = JSON.parse(JSON.stringify(INITIAL_APPS));
let downloadToastTimeout = null;

// =========================================================================
// 2. WEB AUDIO ENGINE (Interactive Audio Feedback)
// =========================================================================
class SoundDeckAudioEngine {
  constructor() {
    this.ctx = null;
    this.appGainNodes = new Map();
  }

  initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playDialTick() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // AudioContext might require user gesture
    }
  }

  updateVolume(appId, volume, isMuted) {
    if (!this.ctx) return;
    const gainNode = this.appGainNodes.get(appId);
    if (gainNode) {
      const targetVal = isMuted ? 0 : Math.max(0, Math.min(1, volume / 100));
      gainNode.gain.setTargetAtTime(targetVal, this.ctx.currentTime, 0.05);
    }
  }
}

const audioEngine = new SoundDeckAudioEngine();

// =========================================================================
// 3. DIAL GEOMETRY & CIRCULAR LOGIC
// =========================================================================
const DIAL_SIZE = 68;
const STROKE_WIDTH = 4.5;
const RADIUS = (DIAL_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getDashOffset(volume, isMuted) {
  const effectiveVol = isMuted ? 0 : volume;
  return CIRCUMFERENCE - (effectiveVol / 100) * CIRCUMFERENCE;
}

// Update DOM elements for a single knob
function updateKnobUI(app) {
  const knobEl = document.getElementById(`knob-${app.id}`);
  if (!knobEl) return;

  const circleProgress = knobEl.querySelector('.progress-arc');
  const percentLabel = knobEl.querySelector('.knob-percent-label');
  const centerBtn = knobEl.querySelector('.center-icon-btn');
  const activeLang = translations[currentLang];

  // Update SVG Arc
  const dashOffset = getDashOffset(app.volume, app.isMuted);
  if (circleProgress) {
    circleProgress.style.strokeDashoffset = dashOffset;
  }

  // Update Percentage / Muted text
  if (percentLabel) {
    if (app.isMuted) {
      percentLabel.textContent = activeLang.muteText;
      percentLabel.classList.add('is-muted');
    } else {
      percentLabel.textContent = `${app.volume}%`;
      percentLabel.classList.remove('is-muted');
    }
  }

  // Update Muted visual icon
  if (centerBtn) {
    const iconWrapper = centerBtn.querySelector('.icon-wrapper');
    if (iconWrapper) {
      if (app.isMuted) {
        iconWrapper.classList.add('icon-wrapper-muted');
        if (!iconWrapper.querySelector('.mute-cross-icon')) {
          const cross = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          cross.setAttribute('class', 'mute-cross-icon');
          cross.setAttribute('viewBox', '0 0 24 24');
          cross.setAttribute('fill', 'none');
          cross.setAttribute('stroke', 'currentColor');
          cross.setAttribute('stroke-width', '2.5');
          cross.setAttribute('stroke-linecap', 'round');
          cross.setAttribute('stroke-linejoin', 'round');
          cross.innerHTML = `
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="22" y1="9" x2="16" y2="15"></line>
            <line x1="16" y1="9" x2="22" y2="15"></line>
          `;
          iconWrapper.appendChild(cross);
        }
      } else {
        iconWrapper.classList.remove('icon-wrapper-muted');
        const cross = iconWrapper.querySelector('.mute-cross-icon');
        if (cross) cross.remove();
      }
    }
    centerBtn.setAttribute('aria-label', `${activeLang.muteText} ${app.name}`);
  }

  // Update knob title
  knobEl.setAttribute(
    'title',
    `${app.name}: ${app.volume}% (${activeLang.tooltipText})`
  );
}

// Set volume programmatically
function setAppVolume(id, newVolume) {
  const clamped = Math.max(0, Math.min(100, Math.round(newVolume)));
  const app = appsState.find((a) => a.id === id);
  if (app) {
    app.volume = clamped;
    app.isMuted = false;
    audioEngine.updateVolume(id, clamped, false);
    updateKnobUI(app);
  }
}

// Toggle mute state
function toggleAppMute(id) {
  const app = appsState.find((a) => a.id === id);
  if (app) {
    app.isMuted = !app.isMuted;
    audioEngine.updateVolume(id, app.volume, app.isMuted);
    audioEngine.playDialTick();
    updateKnobUI(app);
  }
}

// Reset all volumes to initial mockup
function resetAllVolumes() {
  appsState = JSON.parse(JSON.stringify(INITIAL_APPS));
  appsState.forEach((app) => {
    audioEngine.updateVolume(app.id, app.volume, app.isMuted);
    updateKnobUI(app);
  });
  audioEngine.playDialTick();
}

// Setup Pointer/Drag & Wheel listeners for a knob
function setupKnobInteractions(app) {
  const knobEl = document.getElementById(`knob-${app.id}`);
  if (!knobEl) return;

  const dialContainer = knobEl.querySelector('.dial-container');
  const centerBtn = knobEl.querySelector('.center-icon-btn');

  let isDragging = false;

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const rect = dialContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    // Angle calculation: 0 to 360 deg starting from top (12 o'clock)
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;

    const newVol = Math.round((angle / 360) * 100);
    setAppVolume(app.id, newVol);
  };

  const onPointerUp = () => {
    if (isDragging) {
      isDragging = false;
      dialContainer.classList.remove('dragging');
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    }
  };

  dialContainer.addEventListener('pointerdown', (e) => {
    // Avoid starting drag if clicking directly on center mute button
    if (e.target.closest('.center-icon-btn')) return;
    isDragging = true;
    dialContainer.classList.add('dragging');
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    audioEngine.playDialTick();
  });

  // Mouse wheel adjust
  knobEl.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      const current = appsState.find((a) => a.id === app.id);
      if (!current) return;
      const delta = e.deltaY < 0 ? 3 : -3;
      setAppVolume(app.id, current.volume + delta);
      audioEngine.playDialTick();
    },
    { passive: false }
  );

  // Mute button click
  if (centerBtn) {
    centerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAppMute(app.id);
    });
  }
}

// =========================================================================
// 4. LANGUAGE SWITCHER
// =========================================================================
function switchLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;

  // Update active state in buttons
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update translated strings
  const t = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Update knobs tooltips and mute labels
  appsState.forEach(updateKnobUI);
}

// =========================================================================
// 5. DOWNLOAD ACTION & TOAST
// =========================================================================
function showDownloadToast(message) {
  const toast = document.getElementById('download-toast');
  const toastText = document.getElementById('toast-text');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.style.display = 'flex';
  toast.classList.remove('hide');

  if (downloadToastTimeout) {
    clearTimeout(downloadToastTimeout);
  }

  downloadToastTimeout = setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => {
      toast.style.display = 'none';
    }, 250);
  }, 3500);
}

function triggerDownload() {
  const t = translations[currentLang];
  showDownloadToast(t.downloadToast);
  audioEngine.playDialTick();

  try {
    const downloadUrl = 'https://github.com/skaralysk/soundeck/releases/download/App/Soundeck.exe';

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'Soundeck.exe'; // nome do arquivo salvo, NÃO a URL
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Download error:', err);
    // Fallback: abre direto no navegador
    window.location.href = 'https://github.com/skaralysk/soundeck/releases/download/App/Soundeck.exe';
  }
}

// =========================================================================
// 6. INITIALIZATION
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize knobs
  appsState.forEach((app) => {
    setupKnobInteractions(app);
    updateKnobUI(app);
  });

  // Language buttons
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });

  // Reset buttons (Grip and Gear)
  const btnResetGrip = document.getElementById('btn-reset-grip');
  const btnResetGear = document.getElementById('btn-reset-gear');

  if (btnResetGrip) btnResetGrip.addEventListener('click', resetAllVolumes);
  if (btnResetGear) btnResetGear.addEventListener('click', resetAllVolumes);

  // Download buttons
  const btnDownloadMain = document.getElementById('btn-download-main');
  const btnDownloadWin = document.getElementById('btn-download-windows');

  if (btnDownloadMain) btnDownloadMain.addEventListener('click', triggerDownload);
  if (btnDownloadWin) btnDownloadWin.addEventListener('click', triggerDownload);

  // =========================================================================
  // Modal Fullscreen para Screenshots (Abre ao clicar, fecha ao clicar fora)
  // =========================================================================
  const imageModal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  const thumbButtons = document.querySelectorAll('.screenshot-thumb-btn');

  function openImageModal(src, alt) {
    if (!imageModal || !modalImg) return;
    modalImg.src = src;
    modalImg.alt = alt || 'SoundDeck Screenshot';
    imageModal.classList.add('active');
    imageModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    audioEngine.playDialTick();
  }

  function closeImageModal() {
    if (!imageModal || !modalImg) return;
    imageModal.classList.remove('active');
    imageModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!imageModal.classList.contains('active')) {
        modalImg.src = '';
      }
    }, 250);
  }

  thumbButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-full-src');
      const img = btn.querySelector('img');
      const alt = img ? img.alt : '';
      openImageModal(src, alt);
    });
  });

  // Fecha clicando fora (no backdrop ou fora do conteúdo)
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeImageModal);
  }

  if (imageModal) {
    imageModal.addEventListener('click', (e) => {
      // Se clicou no container externo (fora da imagem)
      if (e.target === imageModal) {
        closeImageModal();
      }
    });
  }

  // Fecha clicando no botão X
  if (modalClose) {
    modalClose.addEventListener('click', closeImageModal);
  }

  // Fecha com a tecla Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal && imageModal.classList.contains('active')) {
      closeImageModal();
    }
  });
});

