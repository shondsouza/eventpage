# Water Flow Transition Component

A reusable door transition animation component with water-flow effect for React applications.

## Features

- Smooth door opening/closing animations with sound effects
- Loading percentage display
- Customizable phases: idle, closing, waiting, opening
- Responsive design
- TypeScript support
- SCSS and CSS versions available

## Installation

Copy the entire `water-flow` folder to your project's components directory.

## Usage

```tsx
import { WaterFlowTransition, Phase } from './water-flow';

function App() {
  const [phase, setPhase] = useState<Phase>('idle');
  
  return (
    <div>
      <WaterFlowTransition 
        phase={phase}
        onClosed={() => console.log('Doors closed')}
        onOpened={() => console.log('Doors opened')}
        percentageLoaded={50}
      />
      
      <button onClick={() => setPhase('closing')}>
        Start Closing Animation
      </button>
    </div>
  );
}
```

For projects that don't use SCSS, you can use the CSS version:

```tsx
import { WaterFlowTransitionCSS as WaterFlowTransition, Phase } from './water-flow';
// Rest of the code remains the same
```

## Component Props

| Prop | Type | Description |
|------|------|-------------|
| phase | Phase | Current animation phase: 'idle', 'closing', 'waiting', 'opening' |
| onClosed | () => void | Callback when closing animation completes |
| onOpened | () => void | Callback when opening animation completes |
| percentageLoaded | number | Loading percentage to display (0-100) |

## Required Assets

The component requires the following assets in your public folder:
- `public/images/doors/Door1.png`
- `public/images/doors/Door2.png`
- `public/images/doors/Door3.png`
- `public/images/doors/Door4.png`
- `public/sounds/door-close.mp3`

## Dependencies

- framer-motion
- react
- sass/scss modules (for SCSS version only)

## Customization

You can customize the animation by modifying:
- SCSS variables in `WaterFlow.module.scss` (SCSS version)
- CSS classes in `WaterFlow.css` (CSS version)

## Package Structure

```
water-flow/
├── WaterFlowTransition.tsx      # Main component (SCSS version)
├── WaterFlowTransitionCSS.tsx   # Main component (CSS version)
├── WaterFlow.module.scss        # SCSS styles
├── WaterFlow.css                # CSS styles
├── index.ts                     # Export file
├── WaterFlowExample.tsx         # Usage example
├── package.json                 # Package metadata
└── README.md                    # This file
```