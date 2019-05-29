#!/usr/bin/env python3

order = []                                  # 所有订单
orderData = []

did = []

def interprete():
    with open('../../../data/order-uniq-20180501.txt', mode='r') as fo:
        while True:
            line = fo.readline()            # 读取整行
            if not line:
                break
                pass
            line = line.rsplit('\n')[0]     # 去掉结尾换行符
            data = line.split(',')          # 切割字符串
            order.append(data[0])
            orderData.append(dict(id=data[0], data=[
                {"time": int(data[1]),
                 "coordinate": [float(data[3]), float(data[4])]},
                {"time": int(data[1]),
                 "coordinate": [float(data[3]), float(data[4])]}
            ]))
            pass
        pass
    print("Orders loaded. ")

    with open('../../../data/gps-20180501.txt', mode='r') as fr:
        while True:
            line = fr.readline()            # 读取整行
            if not line:
                break
                pass
            line = line.rsplit('\n')[0]     # 去掉结尾换行符
            data = line.split(',')          # 切割字符串
            newData = {}                   # 创建空字典
            newData["time"] = int(data[1])
                                            # 时间
            newData["coordinate"] = [float(data[2]), float(data[3])]
                                            # 位置坐标
            flag = False
            for i in range(0, len(order)):
                if orderData[i]["id"] == data[0]:
                    if data[0] not in did:
                        did.append(data[0])
                        print("Process: " + str(len(did)) + "/49103")
                    orderData[i]["data"].append(newData)
                    flag = True
                    pass
                pass
            if flag == False:
                print("ERROR: Order code " + str(data[0]) + " NOT FOUND! ")
                pass
            pass
        pass
    print("Orders' data loaded successfully. ")

    for each in orderData:
        temp = each["data"][1]
        del each["data"][1]
        each["data"].append(temp)
        print("    Order code " + str(data[0]) + " saved successed. ")
        pass
    pass


if __name__ == "__main__":
    interprete()        # 解析数据

    perfile = int(len(orderData) / 100)

    for file in range(1,100):
        fw = open("../../Express/public/data/orders/data_by_order_pack" + str(file) + ".json", mode='w')  # 写入文件
        for i in range((file - 1) * perfile, file * perfile):
            string = "{\"id\":\"" + str(orderData[i]["id"]) + "\",\"data\":["
            for e in orderData[i]["data"]:
                string = string + "{\"time\":" + str(e["time"]) + ",\"coordinate\":" + str(e["coordinate"]) + "},"
                pass
            string = string[0: len(string) - 1] + "]},"
            fw.write(string)
            pass
        fw.close()
        print("Pack " + str(file) + " finished. ")
    pass

    fw = open("../../Express/public/data/orders/data_by_order_pack100.json", mode='w')  # 写入文件
    for i in range(100 * perfile, len(orderData)):
        string = "{\"id\":\"" + str(orderData[i]["id"]) + "\",\"data\":["
        for e in orderData[i]["data"]:
            string = string + "{\"time\":" + str(e["time"]) + ",\"coordinate\":" + str(e["coordinate"]) + "},"
            pass
        string = string[0: len(string) - 1] + "]},"
        fw.write(string)
        pass
    fw.close()
    print("Pack 100 finished. ")
