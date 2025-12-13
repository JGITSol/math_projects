# Linear Algebra: Matrices as Transformations

## What is a Matrix?
In school, a matrix is often taught as a spreadsheet of numbers. In computer graphics and physics, a matrix is a **function** that transforms space.
$$
M = \begin{bmatrix} a & b \\ c & d \end{bmatrix}
$$
This 2x2 matrix tells us where the basis vectors land:
- The first column $\begin{bmatrix} a \\ c \end{bmatrix}$ is where $\hat{i}$ (the x-axis unit vector) lands.
- The second column $\begin{bmatrix} b \\ d \end{bmatrix}$ is where $\hat{j}$ (the y-axis unit vector) lands.

## The Determinant
The **Determinant** tells you how much the transformation **scales area**.
$$ \text{det}(M) = ad - bc $$
- If $\text{det} = 2$, areas get twice as big.
- If $\text{det} = 0$, the space is squished into a line or point (dimension reduction).
- If $\text{det} < 0$, the space is flipped (like a mirror image).

## Linear Transformations
A transformation is linear if:
1. Origin stays at origin.
2. Grid lines stay parallel and evenly spaced.

## Engineering Applications
- **Computer Graphics**: All 3D rotations and scaling in video games are matrices.
- **Robotics**: Inverse kinematics uses matrices to calculate robot arm angles.
- **Stress Analysis**: The Stress Tensor is a matrix describing internal forces.
