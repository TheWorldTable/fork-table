const chalk = require("chalk")
const stripAnsi = require("strip-ansi")

module.exports.style = (str, ...colors) => {
  const out = colors.reduce(function (input, color) {
    return chalk[color](input)
  }, str)
  return out
}

module.exports.styleEachChar = (str, ...colors) => {
  // strip existing ansi chars so we dont loop them
  // @ TODO create a really clever workaround so that you can accrete styles
  const chars = [...stripAnsi(str)]

  // style each character
  const out = chars.reduce((prev, current) => {
    const coded = colors.reduce((input, color) => {
      return chalk[color](input)
    }, current)
    return prev + coded
  }, "")

  return out
}

module.exports.resetStyle = (str) => {
  return stripAnsi(str)
}

module.exports.colorizeCell = (str, cellOptions, rowType) => {
  let color = false // false will keep terminal default

  switch (true) {
    case (rowType === "body"):
      color = cellOptions.color || color
      break

    case (rowType === "header"):
      color = cellOptions.headerColor || color
      break

    default:
      color = cellOptions.footerColor || color
  }

  if (color) {
    str = exports.style(str, color)
  }

  return str
}
