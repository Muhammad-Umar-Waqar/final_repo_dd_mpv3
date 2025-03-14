// components/loadPaypalScript.js
export function loadPaypalScript(clientId) {
    return new Promise((resolve, reject) => {
      if (window.paypal) {
        return resolve(window.paypal);
      }
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
      script.async = true;
      script.onload = () => resolve(window.paypal);
      script.onerror = () => reject(new Error("Failed to load PayPal SDK"));
      document.body.appendChild(script);
    });
  }
  