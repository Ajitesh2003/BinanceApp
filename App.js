import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function App() {
  const ws = useRef(null);
  const lastPriceRef = useRef(null);
  const [price, setPrice] = useState(null);
  const [color, setColor] = useState('black');
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    // Connect to Binance WebSocket
    ws.current = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("dta here ==>", data);
      const newPrice = parseFloat(data.p); // price from trade stream
      const timeStamp = new Date(data.t).toLocaleTimeString();
      // Color coding based on price movement
      if (lastPriceRef.current) {
        if (newPrice > lastPriceRef.current) setColor('green');
        else if (newPrice < lastPriceRef.current) setColor('red');
        else setColor('black');
      }
      lastPriceRef.current = newPrice;
      setPrice(newPrice);

      // Update price history for graph
      setPriceHistory((prev) => [...prev.slice(-19), newPrice]); // Keep last 20 points
    };

    return () => ws.current.close();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>📈 BTC/USDT Live Price</Text>

      {/* Current Price */}
      <Text style={[styles.price, { color }]}>
        {price ? `$${price.toFixed(2)}` : 'Loading...'}
      </Text>

      {/* Graph */}
      {priceHistory.length > 1 && (
        <LineChart
          data={{
            labels: Array(priceHistory.length).fill(''), // Hide labels
            datasets: [{ data: priceHistory }],
          }}
          width={Dimensions.get('window').width - 20}
          height={200}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#f8f8f8',
            backgroundGradientTo: '#f8f8f8',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: () => '#000',
            propsForDots: {
              r: '2',
              strokeWidth: '1',
              stroke: '#1E90FF',
            },
          }}
          bezier
          style={styles.chart}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  price: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  chart: { borderRadius: 10 },
});
