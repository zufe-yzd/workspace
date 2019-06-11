from sklearn.cluster import KMeans
import numpy as np
import json
import matplotlib.pyplot as plt

genre = 120
all = []
data = []

with open('../../Express/public/data/orderOUT.json', 'r') as f:
    data = json.load(f)

    dataset = []

    for string in data:
        if string["getOffCoordinate"][0] == 0:
            continue
        dataset.append([float(string["getOnCoordinate"][0]), float(string["getOnCoordinate"][1])])
        dataset.append([float(string["getOffCoordinate"][0]), float(string["getOffCoordinate"][1])])

    X = np.array(dataset)

    y_pred = KMeans(n_clusters=genre, random_state=0).fit_predict(X)
    print(y_pred)
    for i in range(0, genre):
        all.append([])
        for e in range(0, len(X)):
            if y_pred[e] == i:
                all[i].append([X[e][0], X[e][1]])
        pass

    # for i in range(0, genre):
    #     print(all[i])

    fw = open("nodes.json", mode="w")

    for string in data:
        if string["getOffCoordinate"][0] == 0:
            continue
        start = -1
        end = -1
        for i in range(0, genre):
            if [float(string["getOnCoordinate"][0]), float(string["getOnCoordinate"][1])] in all[i]:
                start = i
                break
        for i in range(0, genre):
            if [float(string["getOffCoordinate"][0]), float(string["getOffCoordinate"][1])] in all[i]:
                end = i
                break
        if start != -1 and end != -1 and start != end:
            fw.write("[{},{},\"geton\",{}],\n".format
                  (float(string["getOnCoordinate"][0]),
                   float(string["getOnCoordinate"][1]),
                   start))
            fw.write("[{},{},\"getoff\",{}],\n".format
                  (float(string["getOffCoordinate"][0]),
                   float(string["getOffCoordinate"][1]),
                   end))
            pass
        pass
    fw.close()
    pass
