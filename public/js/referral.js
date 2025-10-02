// public/js/referral.js
(function trackReferral() {
  try {
    const url = new URL(window.location.href);
    const ref = url.searchParams.get('ref');
    if (ref) {
      const payload = { ref, savedAt: Date.now() };
      localStorage.setItem('retorno_referral', JSON.stringify(payload));
    }
  } catch (_) {}
})();

window.getSavedReferral = function() {
  try {
    const raw = localStorage.getItem('retorno_referral');
    if (!raw) return null;
    const data = JSON.parse(raw);
    const maxAge = 90 * 24 * 60 * 60 * 1000; // 90 dias
    if (Date.now() - (data.savedAt||0) > maxAge) { localStorage.removeItem('retorno_referral'); return null; }
    return data.ref || null;
  } catch (_) { return null; }
};
