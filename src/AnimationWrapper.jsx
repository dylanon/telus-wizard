import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { DIRECTION } from './constants'

const animationClass = 'animation'
const duration = 300
const slideDistance = 45

const AnimationWrapper = ({ id, children, direction }) => (
  <StyledDiv direction={direction}>
    <TransitionGroup>
      <CSSTransition key={id} classNames={`card ${animationClass}`} timeout={duration}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  </StyledDiv>
)

const StyledDiv = styled.div`
  position: relative;

  .card {
    transition: all ${duration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &.${animationClass}-enter {
      transform: ${props => (props.direction === DIRECTION.FORWARD ? `translateX(${slideDistance}px)` : `translateX(-${slideDistance}px)`)};
      opacity: 0;
    }

    &.${animationClass}-enter-done {
      transition-delay: 50ms;
      transform: translateX(0);
      opacity: 1;
    }

    &.${animationClass}-exit-active {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      opacity: 0;
      transform: ${props => (props.direction === DIRECTION.FORWARD ? `translateX(-${slideDistance}px)` : `translateX(${slideDistance}px)`)};
    }
  }
`

AnimationWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  direction: PropTypes.string,
  children: PropTypes.node.isRequired
}

AnimationWrapper.defaultProps = {
  direction: DIRECTION.FORWARD
}

export default AnimationWrapper
