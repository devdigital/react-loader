// Adapted from
// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Detecting_CSS_animation_support
// and https://davidwalsh.name/add-rules-stylesheets
export const isAnimationSupported = () => {
  let animationString = 'animation'
  let keyframePrefix = ''
  let pfx = ''
  let animationSupported = false
  const domPrefixes = 'Webkit Moz O ms Khtml'.split(' ')
  const element = document.createElement('div')

  if (element.style.animationName !== undefined) {
    animationSupported = true
  }

  if (!animationSupported) {
    for (let i = 0; i < domPrefixes.length; i++) {
      if (element.style[`${domPrefixes[i]}AnimationName`] !== undefined) {
        pfx = domPrefixes[i]
        animationString = `${pfx}Animation`
        keyframePrefix = `-${pfx.toLowerCase()}-`
        animationSupported = true
        break
      }
    }
  }

  return {
    supported: animationSupported,
    animationString,
    keyframePrefix,
  }
}

export const addStyleSheet = id => {
  let stylesheet = document.getElementById(id)
  if (stylesheet && stylesheet.sheet) {
    throw new Error(`Style sheet with identifier ${id} already exists.`)
  }

  stylesheet = document.createElement('style')
  stylesheet.appendChild(document.createTextNode(''))
  document.getElementsByTagName('head')[0].appendChild(stylesheet)
  return stylesheet.sheet
}

export const getStyleSheet = id => {
  const stylesheet = document.getElementById(id)
  if (!stylesheet) {
    return null
  }

  return stylesheet.sheet || null
}

export const ensureStyleSheet = id => {
  const stylesheet = getStyleSheet(id)
  if (stylesheet) {
    return stylesheet
  }

  return addStyleSheet(id)
}

export const getStyleSheetRule = (sheet, index) =>
  sheet.cssRules[index]

export const getStyleSheetRuleById = (id, index) => {
  const stylesheet = getStyleSheet(id)
  if (!stylesheet) {
    throw new Error(`Style sheet with identifier ${id} not found.`)
  }

  return getStyleSheetRule(stylesheet, index)
}

export const addStyleSheetRule = (sheet, selector, rules, index) => {
  if ('insertRule' in sheet) {
    sheet.insertRule(`${selector} { ${rules} }`, index)
    return
  }

  if ('addRule' in sheet) {
    sheet.addRule(selector, rules, index)
  }
}

export const addStyleSheetRuleById = (id, selector, rules, index) => {
  const stylesheet = getStyleSheet(id)
  if (!stylesheet) {
    throw new Error(`Style sheet with identifier ${id} not found.`)
  }

  addStyleSheetRule(stylesheet, selector, rules, index)
}

export const removeStyleSheetRule = (sheet, index) => {
  if ('deleteRule' in sheet) {
    sheet.deleteRule(index)
    return
  }

  if ('removeRule' in sheet) {
    sheet.removeRule(index)
  }
}

export const removeStyleSheetRuleById = (id, index) => {
  const stylesheet = getStyleSheet(id)
  if (!stylesheet) {
    throw new Error(`Style sheet with identifier ${id} not found.`)
  }

  removeStyleSheetRule(stylesheet, index)
}

export const ensureStyleSheetRule = (sheet, selector, rules, index) => {
  const rule = getStyleSheetRule(sheet, index)
  if (rule) {
    removeStyleSheetRule(sheet, index)
  }

  addStyleSheetRule(sheet, selector, rules, index)
}

export const ensureStyleSheetRuleById = (id, selector, rules, index) => {
  const stylesheet = getStyleSheet(id)
  if (!stylesheet) {
    throw new Error(`Style sheet with identifier ${id} not found.`)
  }

  ensureStyleSheetRule(stylesheet, selector, rules, index)
}
