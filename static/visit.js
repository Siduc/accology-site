/* Same visit note the public site already sent: path, referrer and host.
   No cookie is set by this script. */
(function () {
  try {
    var payload = JSON.stringify({
      path: location.pathname || "/",
      referrer: document.referrer || "",
      host: location.host || ""
    });
    var url = "https://accology-enquiry.accology.workers.dev/visit";
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([payload], { type: "application/json" }));
    } else {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true
      });
    }
  } catch (e) {}
})();
