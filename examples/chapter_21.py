# Independent teaching example; synthetic data.
sources = ['A', 'A', 'B', 'B', 'C', 'C']
train = [i for i, source in enumerate(sources) if source != 'C']
test = [i for i, source in enumerate(sources) if source == 'C']
assert set(sources[i] for i in train).isdisjoint(sources[i] for i in test)
print('train:', train, 'test:', test)
