# The Calculus Lab: A Layman's Guide

## What is this?
Calculus is often taught as a set of mechanical rules for manipulating symbols. This lab aims to show the **geometry** behind those rules. We focus on two main pillars: **Differentiation** (Breaking things down) and **Integration** (Building things up).

---

## 1. The Derivative (The Slope)
### The Intuition
Imagine you are driving a car.
- The **Graph** represents your **Distance** from home over time.
- The **Derivative** represents your **Speedometer** reading at this exact moment.

If the graph is steep, you are moving fast (high slope). If the graph is flat, you are stopped (zero slope).

### The Math
Mathematically, the derivative $f'(x)$ is the limit of the slope as the time interval shrinks to zero:
$$ f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} $$

In this lab, the **Red Line** is the Tangent Line—it shows the direction the function is heading at that exact instant.

### Engineering Applications
- **Velocity**: Rate of change of Position.
- **Current**: Rate of change of Charge.
- **Marginal Cost**: The cost to produce "one more" unit in economics.

---

## 2. The Integral (The Area)
### The Intuition
Now imagine you only have your **Speedometer** readings (Velocity) and you want to know how far you traveled.
- You multiply your speed by the time you drove.
- If your speed changes constantly, you have to add up (accumulate) tiny little chunks of `speed × time`.
- This sum is the **Area Under the Curve**.

### The Math
The Fundamental Theorem of Calculus links these two concepts:
$$ \int_{a}^{b} f(x) dx = F(b) - F(a) $$
This says: To find the total change (Area), just check the "Anti-derivative" value at the end ($b$) and subtract the value at the start ($a$).

### Engineering Applications
- **Distance**: Accumulation of Velocity.
- **Work**: Accumulation of Force over a distance ($W = \int F dx$).
- **Battery Charge**: Accumulation of Current over time.
