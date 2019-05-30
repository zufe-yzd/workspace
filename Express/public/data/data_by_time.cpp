#include<iostream>
#include<fstream>
#include<vector>
using namespace std;

struct GPS {
	string time;
	double x;
	double y;
};

struct Point {
	double x;
	double y;
};

struct TimeData {
	double time;
	vector<Point> data;
};

class Order {
	public:
		string id;
		vector<GPS> data;
		void setID(string id) {
			this->id = id;
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
const double ZERO = 1525104000;
int DONE = -1;

int main() {
	Order *orders = new Order[50000];
	TimeData *timedata = new TimeData[8640];
	for (int i=0;i<8640;i++) {
		timedata[i].time = 10*i;
	}
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
						cout << "READ: " << DONE << " / " << ALL << endl;
					}
					_id = newId;
					if (_time!="" && _x!="" && _y!="") {
						double cx = parseDouble(_x);
						double cy = parseDouble(_y);
						if (cx >= 104.0066 
								&& cx <= 104.0590 
								&& cy >= 30.4419 
								&& cy <= 30.4861)
							orders[i].load(_time,cx,cy);
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
	
	for (int i=0;i<ALL;i++) {
		for (int e=0;e<orders[i].data.size();e++) {
			int time = parseTime(orders[i].data.at(e).time)/10;
			if (e==0 || time>parseTime(orders[i].data.at(e-1).time)/10) {
				Point p;
				p.x = orders[i].data.at(e).x;
				p.y = orders[i].data.at(e).y;
				timedata[time].data.push_back(p);
			}
		}
		cout << "PARSED: " << i+1 << " / " << ALL << endl;
	}
	
	ofstream offile;
	offile.open("gps_by_time.json");
	offile << "[";
	for (int i=0;i<8640;i++) {
		offile << "{\"time\":" << timedata[i].time << ",\"data\":" << "[";
		for (int e=0;e<timedata[i].data.size();e++) {
			offile << "[" << timedata[i].data.at(e).x << "," << timedata[i].data.at(e).y << "]";
			if (e!=timedata[i].data.size()-1)
				offile << ",";
		}
		offile << "]}";
		if (i<ALL-1)
			offile << ",";
		offile << endl;
		cout << "WRITTEN IN " << i+1 << " / " << 8640 << endl;
	}
	offile << "]" << endl;
	offile.close();
	
	offile.open("timeline.json");
	for (int i=0;i<8640;i++) {
		offile << "{\"time\":" << timedata[i].time << ",\"count\":" << timedata[i].data.size() << "}";
		if (i<ALL-1)
			offile << ",";
		cout << "MARKED DOWN " << i+1 << " / " << 8640 << endl;
	}
	offile.close();
	
	delete orders;
	delete timedata;
	
	return 0;
}
