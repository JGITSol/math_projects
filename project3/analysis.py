
def rosenbrock_grad(x, y):
    dx = -2 * (1 - x) - 400 * x * (y - x * x)
    dy = 200 * (y - x * x)
    return dx, dy

def simple_gd():
    x, y = 2.5, 2.0
    lr = 0.1
    print(f"Start: ({x}, {y})")
    
    for i in range(5):
        dx, dy = rosenbrock_grad(x, y)
        print(f"Iter {i}: Grad=({dx:.2f}, {dy:.2f})")
        
        x -= lr * dx
        y -= lr * dy
        print(f"  New Pos: ({x:.2f}, {y:.2f})")
        
        if abs(x) > 1e6 or abs(y) > 1e6:
            print("DIVERGED TO INFINITY")
            break

print("--- Standard Rosenbrock ---")
simple_gd()

def scaled_rosenbrock_grad(x, y, scale):
    # f_scaled = scale * f
    # grad_scaled = scale * grad
    dx, dy = rosenbrock_grad(x, y)
    return dx * scale, dy * scale

def scaled_gd(scale=0.001, lr=0.1):
    x, y = 2.5, 2.0
    print(f"\n--- Scaled Rosenbrock (Scale={scale}, LR={lr}) ---")
    for i in range(5):
        dx, dy = scaled_rosenbrock_grad(x, y, scale)
        print(f"Iter {i}: Grad=({dx:.2f}, {dy:.2f})")
        
        x -= lr * dx
        y -= lr * dy
        print(f"  New Pos: ({x:.2f}, {y:.2f})")

scaled_gd(scale=0.0005, lr=0.1) # Try scaling down by 2000
