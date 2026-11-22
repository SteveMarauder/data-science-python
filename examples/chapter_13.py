# Independent teaching example; synthetic data.
import re
from collections import Counter
text = 'Data science, data questions!'
tokens = re.findall(r'[a-z]+', text.lower())
print(Counter(tokens))
