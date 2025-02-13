// Disable Right-Click
document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

// Disable Common Keyboard Shortcuts
document.addEventListener("keydown", function (event) {
    if (event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J" || event.key === "C")) ||
        (event.ctrlKey && event.key === "U")) {
        event.preventDefault();
    }
});

// Disable Long-Press Context Menu on Mobile
document.addEventListener("touchstart", function (event) {
    if (event.touches.length > 1) { // Detects multiple touches
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener("gesturestart", function (event) {
    event.preventDefault();
});

// Detect Developer Tools
(function () {
    var element = new Image();
    Object.defineProperty(element, 'id', {
        get: function () {
            alert("Developer tools detected! Closing...");
            window.location.href = "about:blank"; // Redirect if DevTools is open
        }
    });
    console.log('%c', element);
})();
