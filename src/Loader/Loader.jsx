import React, { Component, PropTypes } from 'react'

const getStyles = (color, size, radius) => {
  const circumference = 2 * radius * Math.PI
  return {
    svg: {
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
  render() {
    const { color, size, thickness } = this.props
    const radius = (size - thickness) / 2
    const styles = getStyles(color, size, radius)
    return (
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
