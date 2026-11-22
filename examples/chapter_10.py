# Independent teaching example; synthetic data.
import pandas as pd
df = pd.DataFrame({'group': ['A'] * 4 + ['B'] * 4, 'value': [1, 2, 3, 4, 1, 2, 3, 40]})
print(df.groupby('group')['value'].agg(['mean', 'median', 'max']))
