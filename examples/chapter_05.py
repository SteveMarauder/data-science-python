# Independent teaching example; synthetic data.
import numpy as np
headways = np.array([5., 15.])
print('mean headway:', headways.mean())
print('expected wait:', np.mean(headways ** 2) / (2 * headways.mean()))
