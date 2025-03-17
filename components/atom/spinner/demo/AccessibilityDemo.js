import React, {useState} from 'react'

import {Article, Cell, Code, Grid, H2, Label, Paragraph, RadioButton, Switch, Text} from '@s-ui/documentation-library'

import AtomSpinner from '../src/index.js'

const AccessibilityDemo = () => {
  const [ariaLabel, setAriaLabel] = useState('Loading content')
  const [respectReducedMotion, setRespectReducedMotion] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(null)
  
  return (
    <Article>
      <H2>Accessibility Features</H2>
      <Paragraph>This spinner component follows WCAG 2.1 accessibility guidelines:</Paragraph>
      
      <Grid cols={2} gutter={[8, 8]}>
        <Cell>
          <Label>Screen reader announcement:</Label>
          <div style={{marginTop: '8px'}}>
            <RadioButton
              value="Loading content"
              label="Default: 'Loading content'"
              checked={ariaLabel === 'Loading content'}
              onChange={() => setAriaLabel('Loading content')}
            />
            <RadioButton
              value="Searching for results"
              label="Custom: 'Searching for results'"
              checked={ariaLabel === 'Searching for results'}
              onChange={() => setAriaLabel('Searching for results')}
            />
            <RadioButton
              value="Please wait while we process your request"
              label="Long: 'Please wait while we process your request'"
              checked={ariaLabel === 'Please wait while we process your request'}
              onChange={() => setAriaLabel('Please wait while we process your request')}
            />
          </div>
        </Cell>
        
        <Cell>
          <Label>Motion preferences:</Label>
          <div style={{marginTop: '8px'}}>
            <Switch
              label="Respect reduced motion"
              checked={respectReducedMotion}
              onChange={() => setRespectReducedMotion(!respectReducedMotion)}
            />
            <Text>
              When enabled, spinner respects the user's <Code>prefers-reduced-motion</Code> setting
            </Text>
          </div>
        </Cell>
        
        <Cell>
          <Label>Animation speed:</Label>
          <div style={{marginTop: '8px'}}>
            <RadioButton
              label="Default speed"
              checked={animationSpeed === null}
              onChange={() => setAnimationSpeed(null)}
            />
            <RadioButton
              label="Slow (3000ms)"
              checked={animationSpeed === 3000}
              onChange={() => setAnimationSpeed(3000)}
            />
            <RadioButton
              label="Fast (500ms)"
              checked={animationSpeed === 500}
              onChange={() => setAnimationSpeed(500)}
            />
          </div>
        </Cell>
        
        <Cell style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{width: '150px', height: '150px', position: 'relative', border: '1px solid #ddd'}}>
            <AtomSpinner 
              ariaLabel={ariaLabel}
              respectReducedMotion={respectReducedMotion}
              animationSpeed={animationSpeed}
            />
          </div>
        </Cell>
      </Grid>
      
      <Paragraph style={{marginTop: '20px'}}>
        <strong>ARIA attributes:</strong> The spinner uses <Code>role="status"</Code> and <Code>aria-live="polite"</Code> 
        to announce its state to screen readers without interrupting the user.
      </Paragraph>
      
      <Paragraph>
        <strong>Keyboard navigation:</strong> The spinner does not interrupt keyboard navigation 
        or trap focus, allowing users to continue navigating while content loads.
      </Paragraph>
    </Article>
  )
}

export default AccessibilityDemo 