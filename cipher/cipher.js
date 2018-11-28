var alphabet = "abcdefghijklmnopqrstuvwxyzüöäß,.!?- 1234567890";

function cipher() {
    var textInput = document.getElementById('textInput').value;
    var keyInput = document.getElementById('keyInput').value;

    var text = textInput.toLowerCase();
    var key = keyInput.toLowerCase();

    key = expandKey(key, text.length);

    // Test Eingabe
    console.log(text);
    console.log(key);

    var textAlsZahl = [];
    var keyAlsZahl = [];

    // text und key in Zahlenarrays umwandeln
    for(var i = 0; i < text.length; i++) {
      for (var j = 0; j < alphabet.length; j++) {
        if (text.charAt(i) == alphabet.charAt(j)) {
          textAlsZahl[i] = j;
        }
      }
    }
    for(var i = 0; i < key.length; i++) {
      for (var j = 0; j < alphabet.length; j++) {
        if (key.charAt(i) == alphabet.charAt(j)) {
          keyAlsZahl[i] = j;
        }
      }
    }

    // Test Zahlenworte
    console.log(textAlsZahl);
    console.log(keyAlsZahl);

    // text und key verschlüsseln
    var index = 0;
    var codedText = "";
      // console.log("Alphabet-Länge: " + alphabet.length);

    for(var i = 0; i < text.length; i++) {
        index = (textAlsZahl[i] + keyAlsZahl[i]) % alphabet.length;
        codedText = codedText.concat(alphabet.charAt(index));
    }

    // Test verschlüsseltes Wort
    console.log(codedText);

    var outputPar = document.getElementById('output');
    outputPar.innerHTML = "Dein verschlüsseltes Wort lautet: " + codedText;
}

function decipher() {
    var codeInput = document.getElementById('codeInput').value;
    var deKeyInput = document.getElementById('deKeyInput').value;

    var code = codeInput.toLowerCase();
    var key = deKeyInput.toLowerCase();

    key = expandKey(key, code.length);

    // Test Eingaben
    console.log(codeInput);
    console.log(key);

    var codeAlsZahl = [];
    var keyAlsZahl = [];

    // text und key in Zahlenarrays umwandeln
    for(var i = 0; i < code.length; i++) {
      for (var j = 0; j < alphabet.length; j++) {
        if (code.charAt(i) == alphabet.charAt(j)) {
          codeAlsZahl[i] = j;
        }
      }
    }
    for(var i = 0; i < key.length; i++) {
      for (var j = 0; j < alphabet.length; j++) {
        if (key.charAt(i) == alphabet.charAt(j)) {
          keyAlsZahl[i] = j;
        }
      }
    }

    // Test Zahlenworte
    console.log(codeAlsZahl);
    console.log(keyAlsZahl);

    var klartext = "";
    var index = 0;

    // Code entziffern
    for(var i = 0; i < code.length; i++) {
      index = (codeAlsZahl[i] - keyAlsZahl[i] + alphabet.length)
              % alphabet.length;
      klartext = klartext.concat(alphabet.charAt(index));
    }

    // Test entschlüsseltes Wort
    console.log(klartext);

    var outputPar = document.getElementById('output');
    outputPar.innerHTML = "Dein entschlüsseltes Wort lautet: " + klartext;
}

// key auf Länge des text strecken
function expandKey(key, textLength) {

    var keyFull = "";
    var keyIndex = 0;

    for(var i = 0; i < textLength; i++) {
        keyFull = keyFull + key.charAt(keyIndex);
        keyIndex++;

        if (keyIndex >= key.length) {
        keyIndex = 0;
      }
    }
    return keyFull;
}
