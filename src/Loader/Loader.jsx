import React, { Component, PropTypes } from 'react'

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
    this.state = {
      rotationDegrees: 0,
    }
  }

  componentDidMount() {
    this.rotate(0)
  }

  componentWillUnmount() {
    clearTimeout(this.rotateTimer)
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
    const baseStyle = {
      display: 'inline-block',
      width: `${size}px`,
      height: `${size}px`,
      transformOrigin: 'center center',
      transform: `rotateZ(${this.state.rotationDegrees}deg)`,
    }
    return (
      <div style={baseStyle}>
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
