# Independent teaching example; synthetic data.
import numpy as np
rng = np.random.default_rng(42)
population = np.array([1] * 40 + [0] * 60)
means = [rng.choice(population, 20, replace=False).mean() for _ in range(1000)]
print(round(float(np.mean(means)), 3))
