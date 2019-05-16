#!/usr/bin/env python3

order = []                                  # 所有订单

def interprete():
    with open('../../../data/order-uniq-20180501.txt', mode='r') as fr:
        while True:
            line = fr.readline()            # 读取整行
            if not line:
                break
                pass
            line = line.rsplit('\n')[0]     # 去掉结尾换行符
            data = line.split(',')          # 切割字符串
            newOrder = {}                   # 创建空字典
            newOrder['id'] = data[0]        # 订单 id
            newOrder['beginTime'] = int(data[1])
                                            # 开始计费时间
            newOrder['endTime'] = int(data[2])
                                            # 结束计费时间
            newOrder['getOnCoordinate'] = [float(data[3]), float(data[4])]
                                            # 上车位置坐标
            newOrder['getOffCoordinate'] = [float(data[5]), float(data[6])]
                                            # 下车位置坐标
            #print(newOrder)
            order.append(newOrder)
            pass


if __name__ == "__main__":
    interprete()        # 解析数据

    fw = open('../../json/order.json', mode='w')    # 写入文件
    fw.write(str(order))
    fw.close()
    pass
