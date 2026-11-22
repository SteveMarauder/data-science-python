# Independent teaching example; synthetic data.
import numpy as np
x = np.array([2, 3, 4, 5, 36])
print('mean:', x.mean(), 'median:', np.median(x))
for estimate in [4, 10]:
    print(estimate, np.mean((x - estimate) ** 2))
