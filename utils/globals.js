// Shuffle array
export function shuffle(array) {
  array.sort(() => Math.random() - 0.5)
  return array
}

export function textVariant(text) {
  // &#x23f5;

  // to html entity
  return text.replace(/./g, (c) => `&#${c.codePointAt(0)};&#xfe0e;`)
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
