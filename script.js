/* global jQuery */
/* global $ */



jQuery(document).ready(function() {
    console.log("Document ready.");
    
    // Messages for JSON requests
    var jsons = "getJSON successful! ";
    var jsonf = "getJSON failed. ";
    var jsone = "getJSON ended. ";
    
    // URL for Yandex.Translate
    var yurl = "https://translate.yandex.net/api/v1.5/tr.json/";
    var key = "key=trnsl.1.1.20181004T224629Z.f8631add42092d38.b19e24472124c0e96edbe38fa0debba3205bd437";


    var langList = [];
    var langListDict=[];
    var langIndex = {};
    var prevLang = "";
    var nextLang = "af";
    
    console.log("Requesting list of langauges");
    // Get the list of languages
    jQuery.getJSON( (yurl+"getLangs?"+key+"&ui=en"), function(data) {
        var dropdownText = "";
        var langListValues=[];
        
        // Check access to JSON languages
        console.log(data);
        langList = Object.keys(data.langs);
        langListValues = Object.values(data.langs);
        
        // Update the dropdown menu
        for (var i = 0; i < langList.length; ++i) {
            var lang = langListValues[i];
            var value = langList[i];
            var pair = { lang, value };
            langListDict.push(pair);
        }
        
        // Sort the list in ascending order from a- to z-
        langListDict.sort(function(a, b) { 
            var x = a.lang;
            var y = b.lang;
            var val = 0;
            if (x < y) {
                val = -1;
            }
            if (x > y) {
                val = 1;
            }
            return val;
        });
        
        for (var i = 0; i < langListDict.length; ++i) {
            langIndex[langListDict[i].lang] = i;
            dropdownText += "<option value="+langListDict[i].value+">"+langListDict[i].lang+"</option>";

        }
        langList = langListValues;
        CheckLangs();
        jQuery( "#dropdownMenu" ).html(dropdownText);
    })
    .done(function() {
        console.log(jsons + "(getLangs) ");
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log(jsonf + textStatus + "(getLangs)");
    })
    .always(function() {
        console.log(jsone + "(getLangs)");
    });
    
    var CheckLangs = function() {
        console.log(langListDict);
        
        // Set default language
        nextLang = langListDict[0].value;
        console.log(nextLang);
    }

    // User Selects from Dropdown menu
    jQuery( "#dropdownMenu" ).change(function(event) {
        event.preventDefault();
        var lang = document.getElementById( "dropdownMenu" );
        nextLang = lang.options[lang.selectedIndex].value;
        console.log(nextLang);
    })
    
    // User clicks the button to translate text
    jQuery( "#submitButton" ).click(function(event) {
        event.preventDefault();        
        var text = jQuery( "#translate" ).val();
        
        console.log(text);
        var turl = yurl+"translate?"+key+"&lang="+nextLang+"&";
        text ="text="+text;
        
        console.log(turl+text)
        jQuery.getJSON( (turl+text), function(data) {
            console.log(data);
            console.log(data.text);
            jQuery( "#result" ).text(data.text[0]);
        })
            .done(function() {
        console.log(jsons + "(translate)");
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log(jsonf + textStatus + "(translate)");
        })
        .always(function() {
            console.log(jsone + "(translate)");
        });
    });
});



