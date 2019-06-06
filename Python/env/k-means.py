from sklearn.cluster import KMeans
import numpy as np
import json
import matplotlib.pyplot as plt

genre = 200
all = []
data = []

with open('../../Express/public/data/orderOUT.json', 'r') as f:
    data = json.load(f)

    dataset = []

    for str in data:
        if str["getOffCoordinate"][0] == 0:
            continue
        dataset.append([float(str["getOnCoordinate"][0]), float(str["getOnCoordinate"][1])])
        dataset.append([float(str["getOffCoordinate"][0]), float(str["getOffCoordinate"][1])])

    X = np.array(dataset)

    y_pred = KMeans(n_clusters=genre, random_state=0).fit_predict(X)
    print(y_pred)
    for i in range(0, genre):
        all.append([])
        for e in range(0, len(X)):
            if y_pred[e] == i:
                all[i].append([X[e][0], X[e][1]])
        pass

    for i in range(0, genre):
        print(all[i])

    fw = open('../../Express/public/data/lines.json', mode='w')

    for str in data:
        if str["getOffCoordinate"][0] == 0:
            continue
        start = -1
        end = -1
        for i in range(0, genre):
            if [float(str["getOnCoordinate"][0]), float(str["getOnCoordinate"][1])] in all[i]:
                start = i
                break
        for i in range(0, genre):
            if [float(str["getOffCoordinate"][0]), float(str["getOffCoordinate"][1])] in all[i]:
                end = i
                break
        if start != -1 and end != -1 and start != end:
            print([start, end])
            try:
                fw.write(str([start, end]))
                fw.write(",")
            except:
                pass
            pass

    # fw.write("[")
    # for piece in output:
    #     fw.write(str(piece))
    #     fw.write(",")
    # fw.write("]")

# plt.figure(figsize=(20, 20))
#
# color = ("#D02090", "#FAEBD7", "#00FFFF", "#7FFFD4", "#F5DEB3", "#9ACD32", "#FFE4C4",
#          "#000000", "#FFEBCD", "#0000FF", "#8A2BE2", "#A52A2A", "#DEB887", "#5F9EA0",
#          "#7FFF00", "#D2691E", "#FF7F50", "#6495ED", "#D02090", "#DC143C", "#00FFFF",
#          "#00008B", "#008B8B", "#B8860B", "#A9A9A9", "#006400", "#BDB76B", "#8B008B",
#          "#556B2F", "#FF8C00", "#9932CC", "#8B0000", "#E9967A", "#8FBC8F", "#483D8B",
#          "#2F4F4F", "#00CED1", "#9400D3", "#FF1493", "#00BFFF", "#696969", "#1E90FF",
#          "#D19275", "#B22222", "#FFFAF0", "#228B22", "#FF00FF", "#DCDCDC", "#F8F8FF",
#          "#FFD700", "#DAA520", "#808080", "#008000", "#ADFF2F", "#F0FFF0", "#FF69B4",
#          "#CD5C5C", "#4B0082", "#FFFFF0", "#F0E68C", "#E6E6FA", "#FFF0F5", "#7CFC00",
#          "#FFFACD", "#ADD8E6", "#F08080", "#E0FFFF", "#FAFAD2", "#D3D3D3", "#90EE90",
#          "#FFB6C1", "#FFA07A", "#20B2AA", "#87CEFA", "#8470FF", "#778899", "#B0C4DE",
#          "#FFFFE0", "#00FF00", "#32CD32", "#FAF0E6", "#FF00FF", "#800000", "#66CDAA",
#          "#0000CD", "#BA55D3", "#9370D8", "#3CB371", "#7B68EE", "#00FA9A", "#48D1CC",
#          "#C71585")

# colors=np.array(color)[y_pred]
# plt.scatter(X[:, 0], X[:, 1], c=colors)
# plt.show()
