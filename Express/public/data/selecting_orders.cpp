#include<iostream>
#include<fstream>
#include<vector>
using namespace std;

struct GPS {
	string time;
	double x;
	double y;
};

class Order {
	public:
		string id;
		vector<GPS> data;
		string kind;
		void setID(string id) {
			this->id = id;
			this->kind = "not";
		}
		void load(string time, double x, double y) {
			GPS gps;
			gps.time = time;
			gps.x = x;
			gps.y = y;
			this->data.push_back(gps);
		}
};

double parseTime(string str) {
	int value = 0;
	for (size_t i = 0; i < str.size(); i++) {
		value *= 10;
		value += str[i] - '0';
	}
	return value - 1525104000;
}

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
	return value;
}

const int ALL = 49103;
int DONE = -1;

int main() {
	Order *orders = new Order[50000];
	string data = "";
	ifstream file;
	file.open("../../../../data/gps-20180501.txt");
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
						cout << "READ: " << DONE << " / " << ALL << endl;
					}
					_id = newId;
					if (_time!="" && _x!="" && _y!="") {
						double cx = parseDouble(_x);
						double cy = parseDouble(_y);
						if (cx >= 104.0066+0.0025
								&& cx <= 104.0590+0.0025
								&& cy >= 30.4419-0.0025 
								&& cy <= 30.4861-0.0025)
							orders[i].kind = "pass-by";
					}
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
	offile.open("selected.json");
	offile << "[";
	for (int i=0;i<ALL;i++) {
		double cx = orders[i].data[0].x;
		double cy = orders[i].data[0].y;
		if (cx >= 104.0066+0.0025
				&& cx <= 104.0590+0.0025
				&& cy >= 30.4419-0.0025 
				&& cy <= 30.4861-0.0025)
			orders[i].kind = "from";
		cx = orders[i].data[orders[i].data.size()-1].x;
		cy = orders[i].data[orders[i].data.size()-1].y;
		if (cx >= 104.0066+0.0025
				&& cx <= 104.0590+0.0025
				&& cy >= 30.4419-0.0025 
				&& cy <= 30.4861-0.0025)
			orders[i].kind = "to";
		offile << "{\"id\":\"" << orders[i].id << "\",\"kind\":\"" << orders[i].kind << "\"}";
		if (i<ALL-1)
			offile << "," << endl;
		cout << "MARKED DOWN " << i+1 << " / " << ALL << endl;
	}
	offile << "]" << endl;
	offile.close();
	
	delete orders;
	
	return 0;
}
