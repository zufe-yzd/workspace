#!/usr/bin/env python3


def explain(filename):
    with open('../../Express/public/data/'+filename+'.json', mode='r') as fr:
        fw = open('../../Express/public/data/'+filename+'OUT.json', mode='w')
        all = 8685303
        count = 0
        while True:
            char = fr.read(1)
            if not char:
                break
                pass
            if char == '\'':
                char = '\"'
                pass
            fw.write(char)
            count = count + 1
            print("Process: "+str(count * 100 / all)+"%")
            pass
        fw.close()
        print("Finished. ")
        pass
    pass


if __name__ == "__main__":
    explain("order")
    pass
