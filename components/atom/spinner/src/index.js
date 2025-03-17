import {forwardRef, useEffect, useRef, useState} from 'react'

import PropTypes from 'prop-types'

import Injector from '@s-ui/react-primitive-injector'

import SUILoader from './SUILoader/index.js'
import DefaultSpinner from './DefaultSpinner.js'
import {addParentClass, DELAY, getParentClassName, OVERLAY_TYPES, removeParentClass, SIZES, TYPES} from './settings.js'

const AtomSpinner = forwardRef(
  (
    {
      children = <DefaultSpinner />,
      isDelayed: isDelayedFromProps = false,
      loader = <SUILoader />,
      overlayType = OVERLAY_TYPES.LIGHT,
      size = SIZES.MEDIUM,
      type = TYPES.SECTION,
      ariaLabel = 'Loading content',
      animationSpeed,
      respectReducedMotion = true
    },
    forwardedRef
  ) => {
    const [isDelayed, setIsDelayed] = useState(isDelayedFromProps)
    const refSpinner = useRef()

    useEffect(() => {
      const parentClassName = getParentClassName({
        overlayType,
        size,
        type
      })
      const parentNodeClassList = refSpinner.current.parentNode.classList

      if (!isDelayed) addParentClass(parentNodeClassList)(parentClassName)

      const timer = setTimeout(() => {
        setIsDelayed(false)
        addParentClass(parentNodeClassList)(parentClassName)
      }, DELAY)

      return () => {
        clearTimeout(timer)
        removeParentClass(parentNodeClassList)(parentClassName)
      }
    }, [isDelayed, overlayType, size, type])

    // Apply animation speed and reduced motion preferences
    useEffect(() => {
      if (refSpinner.current) {
        if (animationSpeed) {
          refSpinner.current.style.setProperty('--animation-duration', `${animationSpeed}ms`)
        } else {
          refSpinner.current.style.removeProperty('--animation-duration')
        }

        if (!respectReducedMotion) {
          refSpinner.current.classList.add('sui-AtomSpinner--ignoreReducedMotion')
        } else {
          refSpinner.current.classList.remove('sui-AtomSpinner--ignoreReducedMotion')
        }
      }
    }, [animationSpeed, respectReducedMotion])

    // Create accessible loader with the correct aria-label
    const accessibleLoader = 
      loader && loader.type === SUILoader 
        ? {...loader, props: {...loader.props, ariaLabel}} 
        : <SUILoader ariaLabel={ariaLabel} />

    return (
      <div ref={refSpinner} className="sui-AtomSpinner-content">
        <Injector
          isDelayed={isDelayed}
          loader={accessibleLoader}
          overlayType={overlayType}
          ref={forwardedRef}
          size={size}
          type={type}
        >
          {children}
        </Injector>
      </div>
    )
  }
)

AtomSpinner.displayName = 'AtomSpinner'

AtomSpinner.propTypes = {
  /** Children with injected props */
  children: PropTypes.elementType,

  /** Makes the spinner appear after 500 ms */
  isDelayed: PropTypes.bool,

  /** Loader to be shown in the middle of the container */
  loader: PropTypes.elementType,

  /**
   * Possible options:
   * 'ACCENT'
   * 'DARK'
   * 'LIGHT'
   * 'PRIMARY'
   * 'TRANSPARENT'
   */
  overlayType: PropTypes.oneOf(Object.values(OVERLAY_TYPES)),

  /**
   * Possible options:
   * 'SMALL' and 'MEDIUM'
   */
  size: PropTypes.oneOf(Object.values(SIZES)),

  /**
   * Possible options:
   * 'FULL': The spinner fits the whole page container
   * 'SECTION': The spinner fits a specific site component
   */
  type: PropTypes.oneOf(Object.values(TYPES)),
  
  /**
   * Text to be announced to screen readers
   */
  ariaLabel: PropTypes.string,
  
  /**
   * Animation speed in milliseconds
   */
  animationSpeed: PropTypes.number,
  
  /**
   * Whether to respect user's prefers-reduced-motion setting
   */
  respectReducedMotion: PropTypes.bool
}

export {OVERLAY_TYPES as atomSpinnerOverlayTypes, TYPES as atomSpinnerTypes, SIZES as atomSpinnerSizes}

export default AtomSpinner
