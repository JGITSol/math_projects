# The Calculus Lab (Project 1)

A specialized interactive laboratory for visualizing core Calculus I & II concepts, built for engineering students and self-learners.

## Overview
This project visualizes the relationship between a function, its derivative (slope/rate of change), and its integral (area/accumulation). Unlike static textbook plots, this lab allows real-time manipulation of function parameters (`a`, `b`, `c`), exploration points, and integration bounds.

## Features
- **Dual Mode Visualization**: Switch between "Slope" (Derivative) and "Area" (Integral) contexts.
- **Interactive Graphing**: Custom-built HTML5 Canvas engine with Zoom, Pan, and Adaptive Grids.
- **Real-Time Math Traceability**: See the step-by-step substitution and calculation, not just the result.
- **Engineering Context**: Connects abstract math to real-world concepts like Velocity, Work, and Flux.
- **Internationalization**: Full support for 8 languages (En, Pl, Fr, Es, Pt, De, Uk, Be).
- **Dark Mode**: Optimized for late-night study sessions.

## Tech Stack
- **Core**: Vanilla HTML5, CSS3, JavaScript (ES6+).
- **Rendering**: HTML5 Canvas API (Custom graphing engine).
- **Math**: `MathJax` for LaTeX formula rendering.
- **Icons**: `Lucide Icons` (via CDN).
- **No Build Step**: Runs directly in the browser.

## Setup
1. Clone the repository.
2. Open `index.html` in any modern web browser.
3. (Optional) Serve via a local server (e.g., `python -m http.server`) for best performance, though not required.

## Usage
- **Scroll** to Zoom the graph.
- **Click & Drag** to Pan the view.
- **Sliders**: Adjust `x` to move the target point (Derivative) or `a`/`b` to change integration bounds.
- **Function Type**: Select from Quadratic, Cubic, Sine, or Exponential functions.
