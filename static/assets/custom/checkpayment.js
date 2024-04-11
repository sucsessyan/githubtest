
checkpayment();


async function checkpayment(){
  var data =  location.search;
  var urlParams = new URLSearchParams(data);
  var paymentid = urlParams.get('payment_intent');


if (paymentid !== null) {
  var ft = "https://my.yanchenko.me/api/v3/payments/stripe/check_payment/" + paymentid;
  const response = await fetch(ft, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  var  jsonresp  = await response.json();

  if (response.status == 200) {
          // status ok
          var status = jsonresp.data.payment_status;
          $('#msgresponse').addClass("alert-success");
            $('#msgresponse').attr("hidden", false);
            $('#msgresponse').text(status);

      } else {

        var status = jsonresp.data.message;
        $('#msgresponse').addClass("alert-danger");
          $('#msgresponse').attr("hidden", false);
          $('#msgresponse').text(status);
      }


} else {
document.location.href = '/';
}


}
