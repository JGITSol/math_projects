# Matrices as Transformations (Project 2)

An interactive visualizer demonstrating how matrices act as linear transformations on space, designed for students learning Linear Algebra.

## Overview
This tool moves beyond the "grid of numbers" view of matrices and shows them as **geometric operations**. It visualizes how a 2x2 matrix transforms a grid, basis vectors, and shapes (Scale, Rotation, Shear).

## Features
- **Geometric Visualization**: See the "Grid" warp and stretch in real-time as you change matrix values.
- **Determinant Visualization**: The area of the transformed unit square represents the Determinant ($ad-bc$).
- **Eigenvector Demo**: Visualize vectors that span the same line after transformation.
- **Math Traceability**: Explicit step-by-step matrix-vector multiplication display.
- **Internationalization**: Full support for 8 languages.
- **Dark Mode**: High-contrast theme for better visibility.

## Tech Stack
- **Core**: Vanilla HTML5, CSS3, JavaScript.
- **Rendering**: HTML5 Canvas API (custom transformation engine).
- **Libraries**: `MathJax` (LaTeX), `Lucide` (Icons).
- **No Build Step**: Works directly in the browser.

## Setup
1. Clone the repository.
2. Open `index.html` in a browser.

## Usage
- **Presets**: Choose "Rotation", "Shear", "Scale", or "Identity" to see standard transforms.
- **Sliders**: Manually adjust $a, b, c, d$ components of the matrix.
- **Interactive Grid**: Watch the basis vectors $\hat{i}$ (Green) and $\hat{j}$ (Red) change.
