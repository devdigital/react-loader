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
    const { color, size, thickness } = this.props
    const radius = (size - thickness) / 2
    const styles = getStyles(color, size, radius)

    const rotationStyle = {
      display: 'inline-block',
      width: `${size}px`,
      height: `${size}px`,
      transformOrigin: 'center center',
    }

    if (this.animation.supported) {
      rotationStyle[this.animation.animationString]
        = `${this.keyframesId} 1s linear infinite`
    } else {
      rotationStyle.transform = `rotateZ(${this.state.rotationDegrees}deg)`
    }

    return (
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
    )
  }
}

Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  thickness: PropTypes.number,
}

Loader.defaultProps = {
  color: '#000',
  size: 20,
  thickness: 2,
}

export default Loader
