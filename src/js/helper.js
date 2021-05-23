/**
 * @param {string} input 
 * @returns {string}
 * A trick to prevent XSS from user input
 */
function s(input) {
  const div = document.createElement("div");
  div.innerText = input;
  return div.innerHTML;
}
