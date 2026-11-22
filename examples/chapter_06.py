# Independent teaching example; synthetic data.
import pandas as pd
trips = pd.DataFrame({'city': ['Taipei', 'Taipei', 'Tainan'], 'minutes': [20, 30, 15]})
summary = trips.groupby('city', as_index=False).agg(mean_minutes=('minutes', 'mean'))
print(summary.to_string(index=False))
