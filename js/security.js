// security.js
// Note: Browser ke dev tools ko 100% block karna IMPOSSIBLE hai.
// Ye script normal users ko daraane / rokne ke liye hai, hackers ko nahi.

// Wrap everything in an IIFE
(function() {
    "use strict";

    // --------- CONFIG Options (tune karna ho toh idhar se kar) ---------
    const DEVTOOLS_CHECK_INTERVAL = 500; // ms
    const RESIZE_THRESHOLD = 160; // px difference between outer & inner

    function nukePage() {
        try {
            // Try to navigate away
            window.location.href = "about:blank";
            // Try to close (may not work always, browser dependent)
            window.close();
        } catch (e) {
            // As a fallback, blank out the document
            document.body.innerHTML = "";
        }
    }

    // --------- Right-click disable ---------
    document.addEventListener("contextmenu", function(event) {
        event.preventDefault();
    });

    // --------- Disable common dev shortcuts ---------
    document.addEventListener("keydown", function(event) {
        let key = "";

        if (event.key) {
            key = event.key.toLowerCase();
        }

        if (
            key === "f12" ||
            (event.ctrlKey && event.shiftKey && (key === "i" || key === "j" || key === "c")) ||
            (event.ctrlKey && key === "u")
        ) {
            event.preventDefault();
            window.location.href = "about:blank";
            window.close();
        }
    });

    // --------- Mobile: Disable long-press context / gesture ---------
    document.addEventListener(
        "touchstart",
        function(event) {
            // multiple touches / long-press prevention-ish
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        }, { passive: false }
    );

    document.addEventListener("gesturestart", function(event) {
        event.preventDefault();
    });

    // --------- DevTools detection: resize trick ---------
    function checkDevtoolsBySize() {
        try {
            const widthDiff = window.outerWidth - window.innerWidth;
            const heightDiff = window.outerHeight - window.innerHeight;

            if (widthDiff > RESIZE_THRESHOLD || heightDiff > RESIZE_THRESHOLD) {
                nukePage();
            }
        } catch (e) {
            // Ignore
        }
    }

    setInterval(checkDevtoolsBySize, DEVTOOLS_CHECK_INTERVAL);

    // --------- DevTools detection: debugger lag trap ---------
    function debuggerTrap() {
        const start = performance.now();
        // This 'debugger' statement will cause lag if devtools is open & paused
        const end = performance.now();

        if (end - start > 50) {
            nukePage();
        }
    }

    setInterval(debuggerTrap, DEVTOOLS_CHECK_INTERVAL);

    // --------- DevTools detection: console access via getter ---------
    (function() {
        const element = new Image();
        Object.defineProperty(element, "id", {
            get: function() {
                // If console tries to inspect this image, getter fires
                nukePage();
                return "";
            },
        });

        // This logs element; inspecting this in console can trigger the getter
        console.log("%c", element);
    })();

    // (Optional) Disable drag
    document.addEventListener("dragstart", function(event) {
        event.preventDefault();
    });

})();