# Independent teaching example; synthetic data.
target = {'A', 'B', 'C', 'D', 'E'}
frame = {'A', 'B', 'C'}
print('uncovered:', sorted(target - frame))
print('frame coverage:', len(frame & target) / len(target))
