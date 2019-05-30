#include<iostream>
#include<fstream>
#include<vector>
using namespace std;

struct GPS {
	string time;
	string x;
	string y;
};

class Order {
	public:
		string id;
		vector<GPS> data;
		void setID(string id) {
			this->id = id;
		}
		void load(string time, string x, string y) {
			GPS gps;
			gps.time = time;
			gps.x = x;
			gps.y = y;
			this->data.push_back(gps);
		}
};

const int ALL = 49103;
int DONE = -1;

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
						cout << "PROCESS: " << DONE << " / " << ALL << endl;
					}
					_id = newId;
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
	offile.open("gps_by_order PACK 1.json");
	for (int i=0;i<5000;i++) {
		offile << "{\"id\":\"" << orders[i].id << "\",\"data\":" << "[";
		for (int e=0;e<orders[i].data.size();e++) {
			offile << "{\"time\":"<< orders[i].data.at(e).time << ",\"coordinate\":[" << orders[i].data.at(e).x << "," << orders[i].data.at(e).y << "]}";
			if (e!=orders[i].data.size()-1)
				offile << ",";
		}
		offile << "]}";
		if (i<ALL-1)
			offile << ",";
		offile << endl;
		cout << "WRITTEN IN " << i << " / " << ALL << endl;
	}
	offile.close();
	
	offile.open("gps_by_order PACK 2.json");
	for (int i=5000;i<10000;i++) {
		offile << "{\"id\":\"" << orders[i].id << "\",\"data\":" << "[";
		for (int e=0;e<orders[i].data.size();e++) {
			offile << "{\"time\":"<< orders[i].data.at(e).time << ",\"coordinate\":[" << orders[i].data.at(e).x << "," << orders[i].data.at(e).y << "]}";
			if (e!=orders[i].data.size()-1)
				offile << ",";
		}
		offile << "]}";
		if (i<ALL-1)
			offile << ",";
		offile << endl;
		cout << "WRITTEN IN " << i << " / " << ALL << endl;
	}
	offile.close();
	
	offile.open("gps_by_order PACK 3.json");
	for (int i=10000;i<15000;i++) {
		offile << "{\"id\":\"" << orders[i].id << "\",\"data\":" << "[";
		for (int e=0;e<orders[i].data.size();e++) {
			offile << "{\"time\":"<< orders[i].data.at(e).time << ",\"coordinate\":[" << orders[i].data.at(e).x << "," << orders[i].data.at(e).y << "]}";
			if (e!=orders[i].data.size()-1)
				offile << ",";
		}
		offile << "]}";
		if (i<ALL-1)
			offile << ",";
		offile << endl;
		cout << "WRITTEN IN " << i << " / " << ALL << endl;
	}
	offile.close();
	
	offile.open("gps_by_order PACK 4.json");
	for (int i=15000;i<20000;i++) {
		offile << "{\"id\":\"" << orders[i].id << "\",\"data\":" << "[";
		for (int e=0;e<orders[i].data.size();e++) {
			offile << "{\"time\":"<< orders[i].data.at(e).time << ",\"coordinate\":[" << orders[i].data.at(e).x << "," << orders[i].data.at(e).y << "]}";
			if (e!=orders[i].data.size()-1)
				offile << ",";
		}
		offile << "]}";
		if (i<ALL-1)
			offile << ",";
		offile << endl;
		cout << "WRITTEN IN " << i << " / " << ALL << endl;
	}
	offile.close();
	
	offile.open("gps_by_order PACK 5.json");
	for (int i=20000;i<25000;i++) {
		offile << "{\"id\":\"" << orders[i].id << "\",\"data\":" << "[";
		for (int e=0;e<orders[i].data.size();e++) {
			offile << "{\"time\":"<< orders[i].data.at(e).time << ",\"coordinate\":[" << orders[i].data.at(e).x << "," << orders[i].data.at(e).y << "]}";
			if (e!=orders[i].data.size()-1)
				offile << ",";
		}
		offile << "]}";
		if (i<ALL-1)
			offile << ",";
		offile << endl;
		cout << "WRITTEN IN " << i << " / " << ALL << endl;
	}
	offile.close();
	
	offile.open("gps_by_order PACK 6.json");
	for (int i=25000;i<30000;i++) {
		offile << "{\"id\":\"" << orders[i].id << "\",\"data\":" << "[";
		for (int e=0;e<orders[i].data.size();e++) {
			offile << "{\"time\":"<< orders[i].data.at(e).time << ",\"coordinate\":[" << orders[i].data.at(e).x << "," << orders[i].data.at(e).y << "]}";
			if (e!=orders[i].data.size()-1)
				offile << ",";
		}
		offile << "]}";
		if (i<ALL-1)
			offile << ",";
		offile << endl;
		cout << "WRITTEN IN " << i << " / " << ALL << endl;
	}
	offile.close();
	
	offile.open("gps_by_order PACK 7.json");
	for (int i=30000;i<35000;i++) {
		offile << "{\"id\":\"" << orders[i].id << "\",\"data\":" << "[";
		for (int e=0;e<orders[i].data.size();e++) {
			offile << "{\"time\":"<< orders[i].data.at(e).time << ",\"coordinate\":[" << orders[i].data.at(e).x << "," << orders[i].data.at(e).y << "]}";
			if (e!=orders[i].data.size()-1)
				offile << ",";
		}
		offile << "]}";
		if (i<ALL-1)
			offile << ",";
		offile << endl;
		cout << "WRITTEN IN " << i << " / " << ALL << endl;
	}
	offile.close();
	
	offile.open("gps_by_order PACK 8.json");
	for (int i=35000;i<40000;i++) {
		offile << "{\"id\":\"" << orders[i].id << "\",\"data\":" << "[";
		for (int e=0;e<orders[i].data.size();e++) {
			offile << "{\"time\":"<< orders[i].data.at(e).time << ",\"coordinate\":[" << orders[i].data.at(e).x << "," << orders[i].data.at(e).y << "]}";
			if (e!=orders[i].data.size()-1)
				offile << ",";
		}
		offile << "]}";
		if (i<ALL-1)
			offile << ",";
		offile << endl;
		cout << "WRITTEN IN " << i << " / " << ALL << endl;
	}
	offile.close();
	
	offile.open("gps_by_order PACK 9.json");
	for (int i=40000;i<45000;i++) {
		offile << "{\"id\":\"" << orders[i].id << "\",\"data\":" << "[";
		for (int e=0;e<orders[i].data.size();e++) {
			offile << "{\"time\":"<< orders[i].data.at(e).time << ",\"coordinate\":[" << orders[i].data.at(e).x << "," << orders[i].data.at(e).y << "]}";
			if (e!=orders[i].data.size()-1)
				offile << ",";
		}
		offile << "]}";
		if (i<ALL-1)
			offile << ",";
		offile << endl;
		cout << "WRITTEN IN " << i << " / " << ALL << endl;
	}
	offile.close();
	
	offile.open("gps_by_order PACK 10.json");
	for (int i=45000;i<DONE;i++) {
		offile << "{\"id\":\"" << orders[i].id << "\",\"data\":" << "[";
		for (int e=0;e<orders[i].data.size();e++) {
			offile << "{\"time\":"<< orders[i].data.at(e).time << ",\"coordinate\":[" << orders[i].data.at(e).x << "," << orders[i].data.at(e).y << "]}";
			if (e!=orders[i].data.size()-1)
				offile << ",";
		}
		offile << "]}";
		if (i<ALL-1)
			offile << ",";
		offile << endl;
		cout << "WRITTEN IN " << i << " / " << ALL << endl;
	}
	offile.close();
	
	delete orders;
	
	return 0;
}
