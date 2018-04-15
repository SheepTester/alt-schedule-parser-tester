// https://developers.google.com/web/fundamentals/primers/promises#promisifying_xmlhttprequest
function get(url) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open("GET", url);
    req.onload = () => req.status === 200 ? resolve(req.response) : reject(req.statusText);
    req.onerror = () => reject("Network Error");
    req.send();
  });
}
