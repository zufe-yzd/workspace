#include<iostream>
#include<fstream>
#include<vector>
#include<math.h>
using namespace std;

struct GPS {
	int zone;
	string time;
	double x;
	double y;
};

struct Point {
	double x;
	double y;
	double speed;
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
		void load(int zone, string time, double x, double y) {
			GPS gps;
			gps.zone = zone;
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
	TimeData *timedata_1 = new TimeData[8640];
	TimeData *timedata_2 = new TimeData[8640];
	TimeData *timedata_3 = new TimeData[8640];
	TimeData *timedata_4 = new TimeData[8640];
	TimeData *timedata_5 = new TimeData[8640];
	TimeData *timedata_6 = new TimeData[8640];
	TimeData *timedata_7 = new TimeData[8640];
	TimeData *timedata_8 = new TimeData[8640];
	TimeData *timedata_9 = new TimeData[8640];
	TimeData *timedata_10 = new TimeData[8640];
	TimeData *timedata_11 = new TimeData[8640];
	for (int i=0;i<8640;i++) {
		timedata_1[i].time = 10*i;
	}
	for (int i=0;i<8640;i++) {
		timedata_2[i].time = 10*i;
	}
	for (int i=0;i<8640;i++) {
		timedata_3[i].time = 10*i;
	}
	for (int i=0;i<8640;i++) {
		timedata_4[i].time = 10*i;
	}
	for (int i=0;i<8640;i++) {
		timedata_5[i].time = 10*i;
	}
	for (int i=0;i<8640;i++) {
		timedata_6[i].time = 10*i;
	}
	for (int i=0;i<8640;i++) {
		timedata_7[i].time = 10*i;
	}
	for (int i=0;i<8640;i++) {
		timedata_8[i].time = 10*i;
	}
	for (int i=0;i<8640;i++) {
		timedata_9[i].time = 10*i;
	}
	for (int i=0;i<8640;i++) {
		timedata_10[i].time = 10*i;
	}
	for (int i=0;i<8640;i++) {
		timedata_11[i].time = 10*i;
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
						// zone 1
						if (cx >= 104.0084+0.0025
								&& cx <= 104.0184+0.0025
								&& cy >= 30.4468-0.0025 
								&& cy <= 30.4590-0.0025)
							orders[i].load(1,_time,cx,cy);
						// zone 2
						else if (cx >= 104.0084+0.0025
								&& cx <= 104.0184+0.0025
								&& cy >= 30.4468-0.0025 
								&& cy <= 30.4590-0.0025)
							orders[i].load(2,_time,cx,cy);
						// zone 3
						else if (cx >= 104.0232+0.0025
								&& cx <= 104.0288+0.0025
								&& cy >= 30.4706-0.0025 
								&& cy <= 30.4762-0.0025)
							orders[i].load(3,_time,cx,cy);
						// zone 4
						else if (cx >= 104.0248+0.0025
								&& cx <= 104.0306+0.0025
								&& cy >= 30.4762-0.0025 
								&& cy <= 30.4861-0.0025)
							orders[i].load(4,_time,cx,cy);
						// zone 5
						else if (cx >= 104.0308+0.0025
								&& cx <= 104.0386+0.0025
								&& cy >= 30.4776-0.0025 
								&& cy <= 30.4812-0.0025)
							orders[i].load(5,_time,cx,cy);
						// zone 6
						else if (cx >= 104.0386+0.0025
								&& cx <= 104.0460+0.0025
								&& cy >= 30.4776-0.0025 
								&& cy <= 30.4812-0.0025)
							orders[i].load(6,_time,cx,cy);
						// zone 7
						else if (cx >= 104.0288+0.0025
								&& cx <= 104.0374+0.0025
								&& cy >= 30.4718-0.0025 
								&& cy <= 30.4752-0.0025)
							orders[i].load(7,_time,cx,cy);
						// zone 8
						else if (cx >= 104.0374+0.0025
								&& cx <= 104.0460+0.0025
								&& cy >= 30.4718-0.0025 
								&& cy <= 30.4752-0.0025)
							orders[i].load(8,_time,cx,cy);
						// zone 9
						else if (cx >= 104.0460+0.0025
								&& cx <= 104.0524+0.0025
								&& cy >= 30.4718-0.0025 
								&& cy <= 30.4844-0.0025)
							orders[i].load(9,_time,cx,cy);
						// zone 10
						else if (cx >= 104.0256+0.0025
								&& cx <= 104.0364+0.0025
								&& cy >= 30.4580-0.0025 
								&& cy <= 30.4628-0.0025)
							orders[i].load(10,_time,cx,cy);
						// zone 11
						else if (cx >= 104.0284+0.0025
								&& cx <= 104.0484+0.0025
								&& cy >= 30.4474-0.0025 
								&& cy <= 30.4552-0.0025)
							orders[i].load(11,_time,cx,cy);
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
				if (orders[i].data.size()<=1) {
					p.speed = -1;
				}
				else if (e==0) {
					double x1 = orders[i].data.at(e+1).x;
					double y1 = orders[i].data.at(e+1).y;
					double t1 = parseDouble(orders[i].data.at(e).time);
					double t2 = parseDouble(orders[i].data.at(e+1).time);
					double lx = (p.x-x1)*67605;
					double ly = (p.y-y1)*111000;
					p.speed = sqrt(pow(lx,2)+pow(ly,2))*1.000000/(t2-t1);
				}
				else if (e==orders[i].data.size()-1) {
					double x1 = orders[i].data.at(e).x;
					double y1 = orders[i].data.at(e).y;
					double t1 = parseDouble(orders[i].data.at(e-1).time);
					double t2 = parseDouble(orders[i].data.at(e).time);
					double lx = (p.x-x1)*67605;
					double ly = (p.y-y1)*111000;
					p.speed = sqrt(pow(lx,2)+pow(ly,2))*1.000000/(t2-t1);
				}
				else {
					double x1 = orders[i].data.at(e+1).x;
					double y1 = orders[i].data.at(e+1).y;
					double t1 = parseDouble(orders[i].data.at(e-1).time);
					double t2 = parseDouble(orders[i].data.at(e+1).time);
					double lx = (p.x-x1)*67605;
					double ly = (p.y-y1)*111000;
					p.speed = sqrt(pow(lx,2)+pow(ly,2))*1.000000/(t2-t1);
				}
				switch (orders[i].data.at(e).zone) {
					case 1:
						timedata_1[time].data.push_back(p);
						break;
					case 2:
						timedata_2[time].data.push_back(p);
						break;
					case 3:
						timedata_3[time].data.push_back(p);
						break;
					case 4:
						timedata_4[time].data.push_back(p);
						break;
					case 5:
						timedata_5[time].data.push_back(p);
						break;
					case 6:
						timedata_6[time].data.push_back(p);
						break;
					case 7:
						timedata_7[time].data.push_back(p);
						break;
					case 8:
						timedata_8[time].data.push_back(p);
						break;
					case 9:
						timedata_9[time].data.push_back(p);
						break;
					case 10:
						timedata_10[time].data.push_back(p);
						break;
					case 11:
						timedata_11[time].data.push_back(p);
						break;
				}
			}
		}
		cout << "PARSED: " << i+1 << " / " << ALL << endl;
	}
	
	ofstream offile;
	offile.open("zones.json");
	offile << "[{\"zone\":1,\"data\":[";
	for (int i=0;i<8640;i++) {
		offile << "{\"time\":" << timedata_1[i].time 
			<< ",\"count\":" << timedata_1[i].data.size() 
			<< ",\"speed\":";
		if (timedata_1[i].data.size()==0) {
			offile << "-255}";
			if (i<8640-1)
				offile << ",";
			cout << "ZONE 1:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
			continue;
		}
		double s = 0;
		for (int j=0;j<timedata_1[i].data.size();j++) {
			if (timedata_1[i].data.at(j).speed==-1)
				continue;
			s += timedata_1[i].data.at(j).speed;
		}
		s = 1.000000 * s / timedata_1[i].data.size();
		offile << s << "}";
		if (i<8640-1)
			offile << ",";
		cout << "ZONE 1:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
	}
	offile << "]},{\"zone\":2,\"data\":[";
	for (int i=0;i<8640;i++) {
		offile << "{\"time\":" << timedata_2[i].time 
			<< ",\"count\":" << timedata_2[i].data.size() 
			<< ",\"speed\":";
		if (timedata_2[i].data.size()==0) {
			offile << "-255}";
			if (i<8640-1)
				offile << ",";
			cout << "ZONE 2:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
			continue;
		}
		double s = 0;
		for (int j=0;j<timedata_2[i].data.size();j++) {
			if (timedata_2[i].data.at(j).speed==-1)
				continue;
			s += timedata_2[i].data.at(j).speed;
		}
		s = 1.000000 * s / timedata_2[i].data.size();
		offile << s << "}";
		if (i<8640-1)
			offile << ",";
		cout << "ZONE 2:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
	}
	offile << "]},{\"zone\":3,\"data\":[";
	for (int i=0;i<8640;i++) {
		offile << "{\"time\":" << timedata_3[i].time 
			<< ",\"count\":" << timedata_3[i].data.size() 
			<< ",\"speed\":";
		if (timedata_3[i].data.size()==0) {
			offile << "-255}";
			if (i<8640-1)
				offile << ",";
			cout << "ZONE 3:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
			continue;
		}
		double s = 0;
		for (int j=0;j<timedata_3[i].data.size();j++) {
			if (timedata_3[i].data.at(j).speed==-1)
				continue;
			s += timedata_3[i].data.at(j).speed;
		}
		s = 1.000000 * s / timedata_3[i].data.size();
		offile << s << "}";
		if (i<8640-1)
			offile << ",";
		cout << "ZONE 3:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
	}
	offile << "]},{\"zone\":4,\"data\":[";
	for (int i=0;i<8640;i++) {
		offile << "{\"time\":" << timedata_4[i].time 
			<< ",\"count\":" << timedata_4[i].data.size() 
			<< ",\"speed\":";
		if (timedata_4[i].data.size()==0) {
			offile << "-255}";
			if (i<8640-1)
				offile << ",";
			cout << "ZONE 4:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
			continue;
		}
		double s = 0;
		for (int j=0;j<timedata_4[i].data.size();j++) {
			if (timedata_4[i].data.at(j).speed==-1)
				continue;
			s += timedata_4[i].data.at(j).speed;
		}
		s = 1.000000 * s / timedata_4[i].data.size();
		offile << s << "}";
		if (i<8640-1)
			offile << ",";
		cout << "ZONE 4:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
	}
	offile << "]},{\"zone\":5,\"data\":[";
	for (int i=0;i<8640;i++) {
		offile << "{\"time\":" << timedata_5[i].time 
			<< ",\"count\":" << timedata_5[i].data.size() 
			<< ",\"speed\":";
		if (timedata_5[i].data.size()==0) {
			offile << "-255}";
			if (i<8640-1)
				offile << ",";
			cout << "ZONE 5:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
			continue;
		}
		double s = 0;
		for (int j=0;j<timedata_5[i].data.size();j++) {
			if (timedata_5[i].data.at(j).speed==-1)
				continue;
			s += timedata_5[i].data.at(j).speed;
		}
		s = 1.000000 * s / timedata_5[i].data.size();
		offile << s << "}";
		if (i<8640-1)
			offile << ",";
		cout << "ZONE 5:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
	}
	offile << "]},{\"zone\":6,\"data\":[";
	for (int i=0;i<8640;i++) {
		offile << "{\"time\":" << timedata_6[i].time 
			<< ",\"count\":" << timedata_6[i].data.size() 
			<< ",\"speed\":";
		if (timedata_6[i].data.size()==0) {
			offile << "-255}";
			if (i<8640-1)
				offile << ",";
			cout << "ZONE 6:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
			continue;
		}
		double s = 0;
		for (int j=0;j<timedata_6[i].data.size();j++) {
			if (timedata_6[i].data.at(j).speed==-1)
				continue;
			s += timedata_6[i].data.at(j).speed;
		}
		s = 1.000000 * s / timedata_6[i].data.size();
		offile << s << "}";
		if (i<8640-1)
			offile << ",";
		cout << "ZONE 6:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
	}
	offile << "]},{\"zone\":7,\"data\":[";
	for (int i=0;i<8640;i++) {
		offile << "{\"time\":" << timedata_7[i].time 
			<< ",\"count\":" << timedata_7[i].data.size() 
			<< ",\"speed\":";
		if (timedata_7[i].data.size()==0) {
			offile << "-255}";
			if (i<8640-1)
				offile << ",";
			cout << "ZONE 7:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
			continue;
		}
		double s = 0;
		for (int j=0;j<timedata_7[i].data.size();j++) {
			if (timedata_7[i].data.at(j).speed==-1)
				continue;
			s += timedata_7[i].data.at(j).speed;
		}
		s = 1.000000 * s / timedata_7[i].data.size();
		offile << s << "}";
		if (i<8640-1)
			offile << ",";
		cout << "ZONE 7:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
	}
	offile << "]},{\"zone\":8,\"data\":[";
	for (int i=0;i<8640;i++) {
		offile << "{\"time\":" << timedata_8[i].time 
			<< ",\"count\":" << timedata_8[i].data.size() 
			<< ",\"speed\":";
		if (timedata_8[i].data.size()==0) {
			offile << "-255}";
			if (i<8640-1)
				offile << ",";
			cout << "ZONE 8:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
			continue;
		}
		double s = 0;
		for (int j=0;j<timedata_8[i].data.size();j++) {
			if (timedata_8[i].data.at(j).speed==-1)
				continue;
			s += timedata_8[i].data.at(j).speed;
		}
		s = 1.000000 * s / timedata_8[i].data.size();
		offile << s << "}";
		if (i<8640-1)
			offile << ",";
		cout << "ZONE 8:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
	}
	offile << "]},{\"zone\":9,\"data\":[";
	for (int i=0;i<8640;i++) {
		offile << "{\"time\":" << timedata_9[i].time 
			<< ",\"count\":" << timedata_9[i].data.size() 
			<< ",\"speed\":";
		if (timedata_9[i].data.size()==0) {
			offile << "-255}";
			if (i<8640-1)
				offile << ",";
			cout << "ZONE 9:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
			continue;
		}
		double s = 0;
		for (int j=0;j<timedata_9[i].data.size();j++) {
			if (timedata_9[i].data.at(j).speed==-1)
				continue;
			s += timedata_9[i].data.at(j).speed;
		}
		s = 1.000000 * s / timedata_9[i].data.size();
		offile << s << "}";
		if (i<8640-1)
			offile << ",";
		cout << "ZONE 9:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
	}
	offile << "]},{\"zone\":10,\"data\":[";
	for (int i=0;i<8640;i++) {
		offile << "{\"time\":" << timedata_10[i].time 
			<< ",\"count\":" << timedata_10[i].data.size() 
			<< ",\"speed\":";
		if (timedata_10[i].data.size()==0) {
			offile << "-255}";
			if (i<8640-1)
				offile << ",";
			cout << "ZONE 10:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
			continue;
		}
		double s = 0;
		for (int j=0;j<timedata_10[i].data.size();j++) {
			if (timedata_10[i].data.at(j).speed==-1)
				continue;
			s += timedata_10[i].data.at(j).speed;
		}
		s = 1.000000 * s / timedata_10[i].data.size();
		offile << s << "}";
		if (i<8640-1)
			offile << ",";
		cout << "ZONE 10:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
	}
	offile << "]},{\"zone\":11,\"data\":[";
	for (int i=0;i<8640;i++) {
		offile << "{\"time\":" << timedata_11[i].time 
			<< ",\"count\":" << timedata_11[i].data.size() 
			<< ",\"speed\":";
		if (timedata_11[i].data.size()==0) {
			offile << "-255}";
			if (i<8640-1)
				offile << ",";
			cout << "ZONE 11:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
			continue;
		}
		double s = 0;
		for (int j=0;j<timedata_11[i].data.size();j++) {
			if (timedata_11[i].data.at(j).speed==-1)
				continue;
			s += timedata_11[i].data.at(j).speed;
		}
		s = 1.000000 * s / timedata_11[i].data.size();
		offile << s << "}";
		if (i<8640-1)
			offile << ",";
		cout << "ZONE 11:\tMARKED DOWN " << i+1 << " / " << 8640 << endl;
	}
	offile << "]}]" << endl;
	offile.close();
	
	delete orders;
	delete timedata_1;
	delete timedata_2;
	delete timedata_3;
	delete timedata_4;
	delete timedata_5;
	delete timedata_6;
	delete timedata_7;
	delete timedata_8;
	delete timedata_9;
	delete timedata_10;
	delete timedata_11;
	
	return 0;
}
