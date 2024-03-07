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
