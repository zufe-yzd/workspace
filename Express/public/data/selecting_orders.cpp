#include<iostream>
#include<fstream>
#include<vector>
using namespace std;

const int ALL = 49103;
int CONTAINED = 0;
int DONE = -1;

double parseDouble(string str) {
	double value = 0;
	bool flo = false;
	int onflo = 0;
	for (size_t i = 0; i < str.size(); i++) {
		if (str[i]=='.')
			flo = true;
		else {
			value *= 10;
			value += str[i] - '0';
			if (flo)
				onflo++;
		}
	}
	while (onflo-->0)
		value = value * 0.100000;
	return value;// - 1525104000;
}

struct GPS {
	double time;
	double x;
	double y;
};

class Order {
	public:
		string id;
		bool isContained;
		vector<GPS> data;
		void setID(string id) {
			this->id = id;
			this->isContained = false;
		}
		void load(string time, string x, string y) {
			if (this->isContained==false) {
				GPS gps;
				gps.time = parseDouble(time);
				gps.x = parseDouble(x);
				gps.y = parseDouble(y);
				//cout << gps.x << "," << gps.y << endl;
				//system("pause");
				if (gps.x >= 104.0177 && gps.x-0.005 <= 104.0635 && gps.y+0.005 >= 30.4458 && gps.y <= 30.4857) {
					this->isContained = true;
					CONTAINED++;
					if (CONTAINED%50==0)
						cout << "CONTAINED = " << CONTAINED << endl;
				}
			}
			//this->data.push_back(gps);
		}
};


int main() {
	Order *orders = new Order[50000];
	string data = "";
	ifstream file;
	file.open("gps-20180501.txt");
	if (!file.is_open()) {
		cerr << "Can't open this file. ";
		
		return -1;
	}
	cin.unsetf(ios::skipws);
	char ch;
	int pos = 0;
	string _id = "";
	string newId = "";
	string _time = "";
	string _x = "";
	string _y = "";
	int i = -1;
	do {
		file.get(ch);
		if ((ch=='\n' || ch==',' )&& data!="") {
			switch (pos) {
				case 0:
					newId = data;
					i = DONE;
					while (orders[i].id!=newId && i>-1)
						i--;
					if (i==-1) {
						DONE++;
						i = DONE;
						orders[i].id = newId;
						if (DONE%100==0)
							cout << "PROCESS: " << DONE << " / " << ALL << endl;
					}
					_id = newId;
					if (i!=-1 && orders[i].isContained)
						break;
					if (_time!="" && _x!="" && _y!="")
						orders[i].load(_time,_x,_y);
					break;	
				case 1:
					_time = data;
					break;
				case 2:
					_x = data;
					break;
				case 3:
					_y = data;
					break;
			}
			data = "";
			pos = pos<3 ? pos+1 : 0;
		}
		else
			data += ch;
	} while (!file.eof());
	file.close();
	
	ofstream offile;
	offile.open("orders_contained.json");
	offile << "[";
	for (int i=0;i<ALL;i++) {
		if (orders[i].isContained)
			offile << ",\n\"" << orders[i].id << "\"";
		if (i%100==0)
			cout << "WRITTEN IN " << i+1 << " / " << CONTAINED << endl;
	}
	offile << "]";
	offile.close();
	
	delete orders;
	
	return 0;
}
