import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function OrderAnalysis({ buyData }) {
    // Lấy mảng giá trị tổng giá trị đơn hàng từ buyData
    const totalPriceData = buyData.map(item => item.totalPrice);

    // Chuẩn bị dữ liệu cho biểu đồ
    const chartData = {
        labels: buyData.map((item, index) => `Đơn hàng ${index + 1}`),
        datasets: [{ data: totalPriceData }]
    };

    return (
        <View>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Phân tích đơn hàng theo tổng giá trị</Text>
            <BarChart
                style={{ marginVertical: 8, borderRadius: 16 }}
                data={chartData}
                width={350}
                height={200}
                yAxisSuffix="đ"
                chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
            />
        </View>
    );
}
