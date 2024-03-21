$("#requestlifehacks").click(async function(event){
      event.preventDefault();
      console.log("I clicked");
      name  = $("#name").val();
      surname = $("#surname").val();
      token  = "ldsfhasdnflak";
      email = $("#email").val();


      var args =
       {
         name: name,
         surname: surname,
         mtoken: token,
         email: email,
       };

       requestfile(args).done(function(resp){
         $('#filesform').attr("hidden", true);
         $('#msg').attr("hidden", false);
         }).fail()
  /*
       addmail(args, lang, token).done(function(resp){
         var mailid = resp.data.mailid;


    $('#incomemailfiles').attr("mailid", mailid);
    $('#incomemailfiles').attr("hidden", false);

       }).fail(function(resp){failedanswer(resp)})

*/
    });

$("#paybutton").click(async function(event){
          event.preventDefault();


          name  = $("#paymentname").val();
          reference = $("#paymentreference").val();
          activityid  = "q3adsgerysdfv";
          email = $("#paymntemail").val();
          paymentamount = $("#paymentamount").val();

          if (paymentamount == "" || reference == "" || name == "" || email == "") {

          $('#ermodalmsg').attr("hidden", false);


        } else {

          //get key
          const response = await fetch("https://my.yanchenko.me/api/v3/payments/stripe/getkey", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          var  jsonresp  = await response.json();
          var key = jsonresp.data.key;

          var items =
           {
             name: name,
             reference: reference,
             activityid: activityid,
             email: email,
             amount: paymentamount,
           };

           $('#prepayment').attr("hidden", true);
           $('#stripecard').attr("hidden", false);
          startstripe(items, key);
        }

      });

function requestfile(args) {
      var jsonreq = JSON.stringify(args);
       console.log("jsonreq: ", jsonreq)

       return $.ajax({
        url: 'https://my.yanchenko.me/api/v3/site/marketingfiles',
        type: "POST",
        data: jsonreq,
        headers: {
               'content-type': 'application/json',

           }
      });

    }

function message(args) {
          var jsonreq = JSON.stringify(args);
           console.log("jsonreq: ", jsonreq)

           return $.ajax({
            url: 'https://my.yanchenko.me/api/v3/site/message',
            type: "POST",
            data: jsonreq,
            headers: {
                   'content-type': 'application/json',

               }
          });

        }

$("#modalbutton").click(async function(event){
          event.preventDefault();
          console.log("I clicked");
          $('#wmodalmsg').attr("hidden", true);
          $('#ermodalmsg').attr("hidden", true);
          name  = $("#modalname").val();
          phone = $("#phone").val();
          question  = $("#modalqueations").val();
          email = $("#modalemail").val();

          if (email == "" || question == "" || name == "") {
          $('#ermodalmsg').attr("hidden", false);
          } else {


          var args =
           {
             name: name,
             phone: phone,
             message: question,
             email: email,
           };

           message(args).done(function(resp){
             $('#modal-body').attr("hidden", true);
             $('#smodalmsg').attr("hidden", false);
             }).fail(
               function(resp){$('#wmodalmsg').attr("hidden", false);}
             )
           };
      /*
           addmail(args, lang, token).done(function(resp){
             var mailid = resp.data.mailid;


        $('#incomemailfiles').attr("mailid", mailid);
        $('#incomemailfiles').attr("hidden", false);

           }).fail(function(resp){failedanswer(resp)})

    */
        });
