
import math

def rosenbrock_scaled(x, y):
    # Matches JS implementation: 0.0005 * ...
    dx = 0.0005 * (-2 * (1 - x) - 400 * x * (y - x * x))
    dy = 0.0005 * (200 * (y - x * x))
    return dx, dy

def rastrigin_scaled(x, y):
    # Matches JS implementation: 0.05 * ...
    dx = 0.05 * (2 * x + 20 * math.pi * math.sin(2 * math.pi * x))
    dy = 0.05 * (2 * y + 20 * math.pi * math.sin(2 * math.pi * y))
    return dx, dy

def test_stability():
    print("Testing Rosenbrock Stability...")
    # Test at a "bad" point (e.g., start point)
    rx, ry = 2.5, 2.0
    rdx, rdy = rosenbrock_scaled(rx, ry)
    print(f"Rosenbrock Grad at ({rx},{ry}): ({rdx:.4f}, {rdy:.4f})")
    
    # Assert gradient is reasonable (e.g., < 10)
    if abs(rdx) > 10 or abs(rdy) > 10:
        print("FAIL: Rosenbrock gradient too high!")
        exit(1)
        
    print("Testing Rastrigin Stability...")
    tx, ty = 2.5, 2.0
    tdx, tdy = rastrigin_scaled(tx, ty)
    print(f"Rastrigin Grad at ({tx},{ty}): ({tdx:.4f}, {tdy:.4f})")
    
    if abs(tdx) > 10 or abs(tdy) > 10:
        print("FAIL: Rastrigin gradient too high!")
        exit(1)

    print("SUCCESS: All gradients within safe range for LR=0.1")

if __name__ == "__main__":
    test_stability()
