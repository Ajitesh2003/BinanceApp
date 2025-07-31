# 📈 Binance Live Price Tracker (React Native)

A **React Native mobile app** built using **Expo** that connects to the **Binance WebSocket API** to display real-time cryptocurrency price updates (e.g., BTC/USDT).  
Includes a **live updating price graph** for better visualization.

---

## 🚀 Features
- ✅ Real-time BTC/USDT price updates using WebSockets  
- ✅ Color-coded price changes (green for increase, red for decrease)  
- ✅ Live line graph for price visualization (using `react-native-chart-kit`)  
- ✅ Built with **Expo** (easy to run & test)  
- ✅ Responsive & minimal UI

---

## 🛠 Tech Stack
- **React Native (Expo)**
- **Binance WebSocket API**: `wss://stream.binance.com:9443/ws/btcusdt@trade`
- **react-native-chart-kit** (for graph)
- **react-native-svg** (dependency for charts)

---

## 📂 Project Structure
.
├── App.js # Main app file
├── components/ # (If you split UI later)
├── package.json
└── README.md


---

## 🔧 Setup Instructions

### 1️⃣ Clone Repo
```bash
git clone https://github.com/<your-username>/binance-live-price-app.git
cd binance-live-price-app

```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Run on Expo
```
npx expo start
```
Scan the QR Code using the Expo Go App on your phone.

## 📡 WebSocket API Details
- Each message received includes:

p → Latest trade price

T → Event timestamp

We parse these to update UI in real-time.
