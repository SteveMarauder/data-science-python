# Independent teaching example; synthetic data.
import pandas as pd
wide = pd.DataFrame({'city': ['Taipei', 'Tainan'], 'Mon': [22, 25], 'Tue': [23, 26]})
long = wide.melt(id_vars='city', var_name='day', value_name='temperature')
assert not long.duplicated(['city', 'day']).any()
print(long.to_string(index=False))
