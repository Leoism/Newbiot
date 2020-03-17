const fetch = require("node-fetch");

async function ud(word, num = 1) {
  if (num < 1) {
    num = 1;
  }

  const url = `http://api.urbandictionary.com/v0/define?term=${
      encodeURIComponent(word)}`;
  const definition = await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then(async (json) => {
      const option = num > json.list.length ?
        json.list.length - 1 :
        num - 1;
      let text = json.list[option].definition;
      let words = text.match(/(\[(.*?)\])/g);
      for (let word of words) {
        let link = await convertToHyperlink(word);
        text = text.replace(word, link);
      }
      // get the last possible definition if over amount of
      // results
      return text;
    });
  return definition;
}
// @param term should be in [<word>] format in order to properly work.
async function convertToHyperlink(term) {
  if (!(term.startsWith("[") && term.endsWith("]")))
    return;

  let regex = /\[(.*)\]/
  let word = encodeURIComponent(term.match(regex)[1]);
  let hyperLink =
    term + `(https://www.urbandictionary.com/define.php?term=${word})`;
  return hyperLink;
}
module.exports = {
  lookUp: ud,
}