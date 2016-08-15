import React, { Component, PropTypes } from 'react'

const getStyles = (color, size) => ({
  svg: {
    width: size,
    height: size,
  },
  path: {
    stroke: color,
    strokeLinecap: 'round',
  },
})

class Loader extends Component {
  render() {
    const { color, size, thickness } = this.props
    const styles = getStyles(color, size)
    return (
      <svg style={styles.svg}>
        <circle
          ref="path"
          style={styles.path}
          cx={size / 2}
          cy={size / 2}
          r={(size - thickness) / 2}
          fill="none"
          strokeWidth={2}
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
