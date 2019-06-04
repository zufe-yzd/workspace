from sklearn.cluster import KMeans
import numpy as np
import matplotlib.pyplot as plt

X = np.array(
    [[15, 17], [12, 18], [14, 15], [13, 16], [12, 15], [16, 12], [4, 6], [5, 8], [5, 3], [7, 4], [7, 2], [6, 5]])
y_pred = KMeans(n_clusters=2, random_state=0).fit_predict(X)
plt.figure(figsize=(20, 20))
color = ("red", "green")
colors = np.array(color)[y_pred]
plt.scatter(X[:, 0], X[:, 1], c=colors)
plt.show()
