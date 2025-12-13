# Forces & Equilibrium (Project 4)

An interactive visualizer for Statics (Physics/Civil Engineering), determining if a system of forces is in equilibrium.

## Overview
This project simulates a Free Body Diagram (FBD) where users can add forces, adjust their magnitude and angle, and calculate the Resultant Force and Total Moment (Torque). It visually demonstrates the conditions for static equilibrium: $\Sigma F = 0$ and $\Sigma M = 0$.

## Features
- **Interactive Force Editor**: Add, remove, and modify forces using sliders or direct input.
- **Real-time Resultant**: Visualizes the Resultant Vector ($R$) in real-time.
- **Equilibrium Check**: Automatically checks if the system is stable or moving/rotating.
- **Math Traceability**: Displays explicit summation equations for Forces (x, y components) and Moments.
- **Internationalization**: Support for 8 languages.
- **Dark Mode**: High-contrast theme.

## Tech Stack
- **Core**: HTML5, CSS3, JavaScript.
- **Rendering**: HTML5 Canvas API.
- **Math**: `MathJax` for equation rendering.
- **Icons**: `Lucide`.

## Usage
1. **Add Force**: Click "Add Force".
2. **Configure**: Adjust Magnitude (N) and Angle ($^\circ$).
3. **Position**: Change the application point $(r_x, r_y)$ to create Moments (Torque).
4. **Analyze**: Check the panel to see $\Sigma F_x, \Sigma F_y, \Sigma M$.
