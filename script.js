/* global jQuery */
/* global $ */


jQuery(document).ready(function() {
    console.log("Document ready.");
    
    $( "#submitButton" ).click(function(e) {
        var value = $("#translate").val();
        var value2 = $("#language").val();
        console.log(value);
        e.preventDefault();
        var myurl= "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20181004T224629Z.f8631add42092d38.b19e24472124c0e96edbe38fa0debba3205bd437&text=";
        myurl += value;
        myurl += "&lang=en-";
        myurl += value2;
        console.log(myurl);
        $.ajax({
        url : myurl,
        dataType : "json",
        success : function(parsed_json) {
            var outCome = parsed_json['text'];
            $("#result").html(outCome);
            }
        });
    });
});



