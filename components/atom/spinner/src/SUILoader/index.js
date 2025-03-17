import PropTypes from 'prop-types'

const SUILoader = () => (
  <div>
    <span 
      className="sui-AtomSpinner-loader" 
      role="status" 
      aria-live="polite" 
    />
    <span className="sui-AtomSpinner-visuallyHidden">Loading content</span>
  </div>
)

SUILoader.displayName = 'SUILoader'

export default SUILoader
