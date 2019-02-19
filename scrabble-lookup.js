function charFrequency(word) {
  return Array.from(word.toLowerCase()).reduce(function (freq, char) {
    freq[char] = (freq[char] || 0) + 1;
    return freq;
  }, {});
}

function lookup(letters, minLength = 3) {
  var freq = charFrequency(letters);
  var re = new RegExp('^[' + Object.keys(freq).join('') + ']{' + minLength + ',}$');
  return Object.keys(words)
    .filter(function (key) {
      var frq = words[key].freq;
      return re.test(key) && Object.keys(frq).every(function (c) {
        return frq[c] <= freq[c];
      });
    })
    .reduce(function (wrds, key) {
      return wrds.concat(words[key].words);
    }, []);
}

function byLengthFirst(a, b) {
  if (a.length < b.length) return -1;
  if (a.length > b.length) return  1;
  if (a < b) return -1;
  if (a > b) return  1;
  return 0;
}

function lookupWord(letters) {
  let words = lookup(letters).sort(byLengthFirst);
  let w3 = words.filter(w => w.length === 3);
  let w4 = words.filter(w => w.length === 4);
  let w = words.filter(w => w.length > 4);
  words3Div.innerText = w3.join('\n');
  words4Div.innerText = w4.join('\n');
  wordsDiv.innerText = w.join('\n');
}

function toggleWords3(isHide) {
  //words3Div.style.display = isHide ? 'none' : 'block';
  words3Div.style.color = isHide ? 'white' : 'black';
}
