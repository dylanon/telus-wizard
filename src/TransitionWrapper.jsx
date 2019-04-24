import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { DIRECTION } from './constants'

const animationClass = 'animation'
const duration = 600
const slideDistance = 45

const TransitionWrapper = ({ id, children, direction }) => (
  <StyledDiv direction={direction}>
    <TransitionGroup>
      <CSSTransition
        key={id}
        classNames={`card ${animationClass}`}
        timeout={duration}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  </StyledDiv>
)

const StyledDiv = styled.div`
  position: relative;

  .card {
    &.${animationClass}-enter {
      opacity: 0;
      transform: ${props =>
        props.direction === DIRECTION.FORWARD
        ? `translateX(${slideDistance}px)`
        : `translateX(-${slideDistance}px)`};
    }

    &.${animationClass}-enter-active,
    &.${animationClass}-enter-done {
      opacity: 1;
      transform: translateX(0);
      transition: all ${duration}ms cubic-bezier(0.175, 0.885, 0.32, 1);
      transition-delay: ${duration / 2}ms;
    }

    &.${animationClass}-exit {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      opacity: 1;
    }

    &.${animationClass}-exit-active {
      opacity: 0;
      transform: ${props =>
        props.direction === DIRECTION.FORWARD
        ? `translateX(-${slideDistance}px)`
        : `translateX(${slideDistance}px)`};
      transition: all ${duration}ms cubic-bezier(0.175, 0.885, 0.32, 1);
    }
  }
`

TransitionWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  direction: PropTypes.string,
  children: PropTypes.node.isRequired
}

TransitionWrapper.defaultProps = {
  direction: DIRECTION.FORWARD
}

export default TransitionWrapper
