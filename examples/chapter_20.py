# Independent teaching example; synthetic data.
w = 0.0
rate = 0.1
for _ in range(100):
    gradient = 2 * (w - 3)
    w -= rate * gradient
print('w:', round(w, 6), 'loss:', (w - 3) ** 2)
assert abs(w - 3) < 1e-6
