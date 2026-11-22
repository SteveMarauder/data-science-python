# Independent teaching example; synthetic data.
import numpy as np
y = np.array([1, 1, 0, 0])
p = np.array([.9, .4, .6, .1])
pred = p >= .5
tp = np.sum(pred & (y == 1))
print('precision:', tp / pred.sum())
print('recall:', tp / np.sum(y == 1))
