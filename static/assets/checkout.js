// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
var stripe;
var paymentid;

async function startstripe(items, key) {

console.log(key);
stripe = Stripe(key);

// The items the customer wants to buy


let elements;

initialize(items, stripe);
checkStatus();

document
  .querySelector("#payment-form")
  .addEventListener("submit", handleSubmit);
  }

// Fetches a payment intent and captures the client secret
async function initialize(items, stripe) {
setLoading(true);
  const response = await fetch("https://my.yanchenko.me/api/v3/payments/stripe/intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(items),
  });
  var  jsonresp  = await response.json();
  var clientSecret = jsonresp.data.client_secret;
  paymentid = jsonresp.data.paymentid;
  console.log("clientSecret", clientSecret)

  const appearance = {
    theme: 'stripe',
  };
  elements = stripe.elements({ appearance, clientSecret });

  const paymentElementOptions = {
    layout: "tabs",
  };

  const paymentElement = elements.create("payment", paymentElementOptions);
  paymentElement.mount("#payment-element");
  setLoading(false);
}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
var returl = "https://yanchenko.me/payment_status?type=stripe&paymentid=" + paymentid;
  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page

      return_url: returl,
    },
  });

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occurred.");
  }

  setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!");
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageContainer.textContent = "";
  }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (!isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spintr").classList.add("hidden");
    ocument.querySelector("#button-text").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("visible");
  }
}
