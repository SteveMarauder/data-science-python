# Independent teaching example; synthetic data.
import numpy as np
x = np.array([1., 2., 3., 4.])
y = np.array([3., 5., 7., 9.])
X = np.column_stack([np.ones(len(x)), x])
beta, *_ = np.linalg.lstsq(X, y, rcond=None)
print('intercept, slope:', beta)
print('residuals:', y - X @ beta)
