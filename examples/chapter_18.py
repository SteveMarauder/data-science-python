# Independent teaching example; synthetic data.
import numpy as np
girth = np.array([90., 100., 110., 120.])
weight = np.array([110., 140., 170., 200.])  # synthetic teaching data
coef = np.polyfit(girth, weight, 1)
print('toy prediction at 105:', np.polyval(coef, 105))
