function logMsg(msg, level = "log") {
  const overlay = document.getElementById("debug-overlay");
  console[level](msg);

  if (overlay) {
    const div = document.createElement('div');
    div.textContent = msg;
    div.style.color = (
      level === "warn" ? "yellow" :
      level === "error" ? "red" : "lime"
    );
    overlay.appendChild(div);
    overlay.scrollTop = overlay.scrollHeight;
  }
}

AFRAME.registerComponent('marker-events', {
  init: function () {
    const marker = this.el;

    this.el.sceneEl.addEventListener("arReady", () => {
      logMsg("📸 AR Ready");
    });

    marker.addEventListener("targetFound", () => {
      logMsg("✅ Marker Found");
    });

    marker.addEventListener("targetLost", () => {
      logMsg("❌ Marker Lost", "warn");
    });
  }
});

window.addEventListener('DOMContentLoaded', () => {
  logMsg("🟡 DOM Loaded - Waiting for MindAR to init...", "warn");
  if (AFRAME) {
    logMsg("📦 A-Frame version: " + AFRAME.version);
  } else {
    logMsg("❌ A-Frame not loaded", "error");
  }

  if (AFRAME.components['mindar-image-target']) {
    logMsg("🧠 MindAR component registered ✅");
  } else {
    logMsg("❌ MindAR image-target component missing", "error");
  }
});
