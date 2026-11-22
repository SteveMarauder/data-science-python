# Independent teaching example; synthetic data.
import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
from sklearn.model_selection import cross_val_score, KFold
X = np.arange(30.).reshape(-1, 1)
y = 2 * X.ravel() + np.sin(X.ravel())
cv = KFold(5, shuffle=True, random_state=42)
model = make_pipeline(StandardScaler(), Ridge(alpha=1.0))
print(-cross_val_score(model, X, y, cv=cv, scoring='neg_mean_squared_error').mean())
