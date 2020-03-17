const fetch = require("node-fetch");

async function ud(word, num = 1) {
  if (num < 1) {
    num = 1;
  }

  const url = `http://api.urbandictionary.com/v0/define?term=${
      encodeURIComponent(word)}`;
  const definition =
    await fetch(url).then((res) => {
      return res.json();
    }).then((json) => {
      // get the last possible definition if over amount of results
      const option = num > json.list.length ? json.list.length - 1 : num - 1;
      return json.list[option].definition
    });
  return definition;
}

module.exports = {
  lookUp: ud,
}