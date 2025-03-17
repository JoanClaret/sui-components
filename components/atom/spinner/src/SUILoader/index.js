import PropTypes from 'prop-types'

const SUILoader = ({ariaLabel = 'Loading content'}) => (
  <div className="sui-AtomSpinner-loaderContainer">
    <span 
      className="sui-AtomSpinner-loader" 
      role="status" 
      aria-live="polite" 
    />
    <span className="sui-AtomSpinner-visuallyHidden">{ariaLabel}</span>
  </div>
)

SUILoader.propTypes = {
  /**
   * Text to be announced to screen readers
   */
  ariaLabel: PropTypes.string
}

SUILoader.displayName = 'SUILoader'

export default SUILoader
