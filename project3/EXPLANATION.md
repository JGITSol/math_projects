# Optimization: How Machines Learn

## The Concept
Machine Learning is essentially **Optimization**. An AI model tries to minimize its "error" (Cost/Loss) just like a ball trying to roll to the bottom of a valley.
- **Cost Function $f(x, y)$**: Represents the error. Lower is better.
- **Gradient $\nabla f$**: The direction of steepest ascent. We go *opposite* to the gradient to go down.
- **Learning Rate $\alpha$**: How big of a step we take.

## The Algorithm: Gradient Descent
$$ \theta_{new} = \theta_{old} - \alpha \nabla f(\theta_{old}) $$
In English: "Take a step downhill proportional to the steepness."

## Key Challenges
1. **Local Minima**: Getting stuck in a small valley instead of the deepest one (Global Minimum).
2. **Saddle Points**: Flat areas where the gradient is near zero, causing learning to stall.
3. **Exploding Gradients**: If Learning Rate is too high, you overshoot the target and diverge.

## Engineering Applications
- **Training Neural Networks**: Backpropagation computes gradients to update weights.
- **Logistics**: Finding the shortest route (minimizing distance/time).
- **Control Systems**: Tuning controllers to minimize error.
