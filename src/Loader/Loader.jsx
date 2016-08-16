import React, { Component, PropTypes } from 'react'
import {
  isAnimationSupported,
  ensureStyleSheet,
  ensureStyleSheetRule,
} from '../utils/css-utils'

const getStyles = (color, size, radius) => {
  const circumference = 2 * radius * Math.PI
  return {
    svg: {
      display: 'block',
      width: size,
      height: size,
    },
    path: {
      stroke: color,
      strokeLinecap: 'round',
      strokeDasharray: `${circumference * 0.9}`,
    },
  }
}

class Loader extends Component {
  constructor(props) {
    super(props)

    this.animation = isAnimationSupported()
    this.styleSheetId = 'reactloaderstyles'
    this.keyframesId = 'reactloaderstyleskeyframes'

    this.state = {
      rotationDegrees: 0,
    }
  }

  componentDidMount() {
    if (this.animation.supported) {
      this.ensureKeyframesAnimation(
        this.styleSheetId,
        this.keyframesId,
        this.animation.keyframePrefix)
      return
    }

    this.rotate(0)
  }

  componentWillUnmount() {
    if (this.animation.supported) {
      return
    }

    clearTimeout(this.rotateTimer)
  }

  getLoadingElement(size, thickness, color, text, textStyle) {
    const radius = (size - thickness) / 2
    const styles = getStyles(color, size, radius)

    const textBaseStyle = {
      margin: '0.2rem 0',
      textAlign: 'center',
    }

    const rotationStyle = {
      width: `${size}px`,
      height: `${size}px`,
      margin: '0 auto',
      transformOrigin: 'center center',
    }

    if (this.animation.supported) {
      rotationStyle[this.animation.animationString]
        = `${this.keyframesId} 1s linear infinite`
    } else {
      const prefixes = 'ms Webkit'.split(' ')
      for (const prefix of prefixes) {
        rotationStyle[`${prefix}Transform`] = `rotateZ(${this.state.rotationDegrees}deg)`
      }
      rotationStyle.transform = `rotateZ(${this.state.rotationDegrees}deg)`
    }

    return (
      <div>
        <div style={rotationStyle}>
          <svg style={styles.svg}>
            <circle
              ref="path"
              style={styles.path}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              strokeWidth={thickness}
              strokeMiterlimit="20"
            />
          </svg>
        </div>
        {text ? <p style={Object.assign(textBaseStyle, textStyle)}>{text}</p> : null}
      </div>
    )
  }

  ensureKeyframesAnimation(styleSheetId, keyframesId, keyframePrefix) {
    const keyframesSelector = `@${keyframePrefix}keyframes ${keyframesId}`
    const keyframesRules =
      `from { ${keyframePrefix} transform: rotateZ(0deg) }
       to { ${keyframePrefix} transform: rotateZ(360deg) }`

    const stylesheet = ensureStyleSheet(styleSheetId)
    ensureStyleSheetRule(stylesheet, keyframesSelector, keyframesRules, 0)
  }

  rotate(degrees) {
    const nextDegrees = (degrees + 10 > 360) ? 0 : degrees + 10
    this.setState({
      rotationDegrees: nextDegrees,
    })
    this.rotateTimer = setTimeout(() => this.rotate(nextDegrees), 50)
  }

  render() {
    const {
      color,
      size,
      thickness,
      text,
      textStyle,
      loading,
      children,
      overlay,
      overlayColor,
      overlayOpacity,
      height,
    } = this.props

    if (!loading) {
      return children || null
    }

    const loadingElement =
      this.getLoadingElement(size, thickness, color, text, textStyle)

    if (children) {
      const stretchStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }

      const overlayStyle = {
        backgroundColor: overlayColor,
        opacity: overlayOpacity,
        zIndex: 10,
      }

      const loadingElementStyle = {
        display: 'table-cell',
        verticalAlign: 'middle',
        width: '100%',
        height: '100%',
      }

      return (
        <div style={{ position: 'relative' }}>
          {overlay ? React.cloneElement(children, { style: { opacity: 0.3 } }) : null}
          {overlay ? <div style={Object.assign({}, stretchStyle, overlayStyle)}></div> : null}
          <div style={Object.assign({}, stretchStyle, { display: 'table', height, zIndex: 11 })}>
            <div style={Object.assign({}, loadingElementStyle)}>
              {loadingElement}
            </div>
          </div>
        </div>
      )
    }

    return loadingElement
  }
}

Loader.propTypes = {
  height: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  thickness: PropTypes.number,
  loading: PropTypes.bool,
  text: PropTypes.string,
  textStyle: PropTypes.object,
  children: PropTypes.element,
  overlay: PropTypes.bool,
  overlayColor: PropTypes.string,
  overlayOpacity: PropTypes.number,
}

Loader.defaultProps = {
  height: 0,
  color: '#000',
  size: 20,
  thickness: 2,
  loading: false,
  text: null,
  overlay: true,
  overlayColor: '#000',
  overlayOpacity: 0.5,
}

export default Loader
