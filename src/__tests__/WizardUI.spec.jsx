import React from 'react'
import { cleanup, render, fireEvent } from 'react-testing-library'
import WizardUI from '../WizardUI'
import Wizard from '../index'

afterEach(cleanup)

/* eslint-disable */
const mockComponent = props => (
  <div>
    <button type="button" onClick={e => props.goToPrevStep(e)}>back</button>
    <h2>{props.title}</h2>
    {
      props.options.map(option => (
        <button type="button" key={option} onClick={() => props.goToNextStep(option.step)}>{option.text}</button>
      ))
    }
  </div>
)

const test_title = 'this is a title'
const test_button = 'option'
const test_next_title = 'this is a usage title'
const mockWizard = new Wizard()
  .setDefaultComponent(mockComponent)
  .createSteps()
  .addStep(
    'start',
    {
      title: test_title
    }
  )
    .withOption(test_button, 'usage')
  .addStep(
    'usage',
    {
      title: test_next_title
    }
  )
    .withLink('link', '//google.ca')

it('WizardUI -> should render initial step on page load', () => {
  const { getByText } = render(<WizardUI steps={mockWizard.steps} initialStep="start" lang="en" />)

  expect(() => getByText(test_title)).not.toThrow()
})

it('WizardUI -> should navigate history', () => {
  const { getByText } = render(<WizardUI steps={mockWizard.steps} initialStep="start" lang="en" />)

  // Go to next slide
  const button = getByText(test_button)
  fireEvent.click(button)

  expect(() => getByText(test_next_title)).not.toThrow()

  // Go to prev slide
  const back_button = getByText('back')
  fireEvent.click(back_button)

  expect(() => getByText(test_title)).not.toThrow()
})
