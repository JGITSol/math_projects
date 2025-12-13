# Optimization (Gradient Descent) Visualizer (Project 3)

An interactive tool to visualize how Gradient Descent finds the minimum of a cost function, visualizing the "ball rolling down a hill" analogy used in Machine Learning.

## Overview
This project visualizes 2D optimization on a 3D surface (represented by a contour map). It demonstrates how algorithms like Gradient Descent navigate complex landscapes to find optimal solutions (minima).

## Features
- **Interactive Landscape**: Click anywhere on the contour map to set the starting point $(x_0, y_0)$.
- **Real-time Trajectories**: Watch the path taken by the optimizer step-by-step.
- **Hyperparameter Tunnig**: Adjust Learning Rate ($\alpha$) and Momentum to see how they stability and convergence speed.
- **Math Traceability**: See the Gradient Vector $\nabla f = [\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}]$ calculation at each step.
- **Internationalization**: Support for 8 languages.
- **Dark Mode**: Fully supported.

## Tech Stack
- **Core**: HTML5, CSS3, JavaScript.
- **Charts**: `Chart.js` for the Loss Curve.
- **Visuals**: Custom Canvas rendering for Contour Map.
- **Math**: `MathJax` for formula rendering.

## Usage
1. **Select a Function**: Choose a landscape (Bowl, Rosenbrock, Saddle, etc.).
2. **Tune**: Set Learning Rate (try 0.1 vs 0.8) and Iterations.
3. **Run**: Click "Start Optimization" or click on the map.
4. **Analyze**: Check the Loss Curve to see if it converged smoothly or oscillated.
