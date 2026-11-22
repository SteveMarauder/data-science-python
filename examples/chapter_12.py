# Independent teaching example; synthetic data.
import numpy as np
reference = np.array([10., 20., 30., 40.])
sensor = reference + 5
print('bias:', np.mean(sensor - reference))
print('RMSE:', np.sqrt(np.mean((sensor - reference) ** 2)))
