# Independent teaching example; synthetic data.
import csv, io
text = 'station,minutes\n"Central, East",12\nNorth,8\n'
rows = list(csv.DictReader(io.StringIO(text)))
print(rows)
assert len(rows[0]) == 2
