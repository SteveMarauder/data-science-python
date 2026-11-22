# Independent teaching example; synthetic data.
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
fig, ax = plt.subplots()
ax.plot([8, 9, 10, 11], [30, 54, 38, 25], marker='o')
ax.set(xlabel='Hour', ylabel='Passengers', title='Toy station counts (n=4 hours)')
fig.savefig('toy-passengers.png', dpi=150, bbox_inches='tight')
plt.close(fig)
