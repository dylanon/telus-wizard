import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AnimationWrapper from './AnimationWrapper'
import { DIRECTION } from './constants'

class WizardUI extends PureComponent {
  constructor () {
    super()

    this.state = {
      history: [],
      currentStep: null,
      direction: DIRECTION.FORWARD
    }

    this.setInitialStep = this.setInitialStep.bind(this)
    this.goToNextStep = this.goToNextStep.bind(this)
    this.goToPrevStep = this.goToPrevStep.bind(this)
  }

  componentDidMount () {
    this.setInitialStep()
  }

  componentDidUpdate () {
    const { currentStep } = this.state

    // Set first initial step if it doesn't already exist
    if (!currentStep) this.setInitialStep()
  }

  setInitialStep () {
    const { steps, initialStep } = this.props

    if (steps) {
      const currentStep = steps.find(step => step.id === initialStep)

      this.setState({ currentStep })
    }
  }

  goToPrevStep (e) {
    if (e) e.preventDefault()

    const { history } = this.state

    const newHistory = history
    const newCurrentStep = newHistory.pop()

    this.setState({
      currentStep: newCurrentStep,
      history: newHistory,
      direction: DIRECTION.BACK
    })
  }

  goToNextStep (id) {
    const { steps } = this.props
    const { currentStep, history } = this.state

    const newCurrentStep = steps.find(step => step.id === id)
    const newHistory = history
    newHistory.push(currentStep)

    this.setState({
      currentStep: newCurrentStep,
      history: newHistory,
      direction: DIRECTION.FORWARD
    })
  }

  render () {
    const { animation } = this.props
    const { currentStep, direction } = this.state

    return (
      <section>
        {currentStep && (
          <>
            {
              animation ? (
                <AnimationWrapper id={currentStep.id} direction={direction}>
                  {currentStep.buildComponent(this.goToNextStep, this.goToPrevStep)}
                </AnimationWrapper>
              ) : (
                currentStep.buildComponent(this.goToNextStep, this.goToPrevStep)
              )
            }
          </>
        )}
      </section>
    )
  }
}

WizardUI.propTypes = {
  steps: PropTypes.array.isRequired,
  initialStep: PropTypes.string.isRequired,
  animation: PropTypes.bool
}

WizardUI.defaultProps = {
  animation: true
}

export default WizardUI
