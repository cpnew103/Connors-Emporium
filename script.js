// ============================================================
// Connors Emporium — shared behavior
// ============================================================

const DESTINATION_EMAIL = "cdawg4252@gmail.com";

/**
 * Builds a mailto link from a set of {label, value} fields and opens it.
 * Shows an inline status message so the user knows what happened,
 * since mailto: can fail silently if no email client is configured.
 */
function sendEmail(event, subjectPrefix, fields, statusElId) {
    event.preventDefault();

    const name = fields.find(f => f.label === "Name")?.value || "";
    const subject = `Connors Emporium: ${subjectPrefix}${name ? " - " + name : ""}`;
    const body = fields
        .map(f => `${f.label}: ${f.value}`)
        .join("\n\n");

    const mailtoUrl = `mailto:${DESTINATION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const statusEl = statusElId ? document.getElementById(statusElId) : null;
    if (statusEl) {
        statusEl.textContent = "Opening your email app to send this request… if nothing opens, email " + DESTINATION_EMAIL + " directly.";
        statusEl.classList.remove("error");
        statusEl.classList.add("visible", "success");
    }

    try {
        window.location.href = mailtoUrl;
    } catch (err) {
        if (statusEl) {
            statusEl.textContent = "Couldn't open your email app automatically. Please email " + DESTINATION_EMAIL + " directly.";
            statusEl.classList.remove("success");
            statusEl.classList.add("visible", "error");
        }
    }
}

// Back-to-top button
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".back-to-top");
    if (!btn) return;
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            btn.classList.add("visible");
        } else {
            btn.classList.remove("visible");
        }
    });
});
