# Independent teaching example; synthetic data.
import numpy as np
rng = np.random.default_rng(42)
x = np.array([8., 9., 10., 11., 12.])
means = rng.choice(x, size=(5000, len(x)), replace=True).mean(axis=1)
print(np.quantile(means, [0.025, 0.975]))
