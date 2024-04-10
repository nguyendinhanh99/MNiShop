import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { query, getDocs } from 'firebase/firestore';
import { BuyDataRef } from "../../config/firebase";
import { colors } from "../../assest/color";
import AppStyle from "../../theme";

const Width = Dimensions.get('window').width;

const SuccessfulOrderRate = () => {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBuyData = async () => {
            try {
                let q = query(BuyDataRef());
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const rawData = querySnapshot.docs.map(doc => doc.data());
                    setOrderData(rawData);
                } else {
                    setOrderData([]);
                }
            } catch (error) {
                console.error('Error fetching buy data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBuyData();
    }, []);

    const calculateOrderCounts = () => {
        let counts = {
            awaitingConfirmation: 0,
            awaitingPickup: 0,
            awaitingDelivery: 0,
            delivered: 0,
            unsuccessful: 0
        };

        orderData.forEach(order => {
            switch (order.orderStatus) {
                case 1:
                    counts.awaitingConfirmation++;
                    break;
                case 2:
                    counts.awaitingPickup++;
                    break;
                case 3:
                    counts.awaitingDelivery++;
                    break;
                case 4:
                    counts.delivered++;
                    break;
                case 5:
                    counts.unsuccessful++;
                    break;
                default:
                    break;
            }
        });

        return counts;
    };

    const renderPieChart = () => {
        const counts = calculateOrderCounts();
        
        const chartData = [
            { name: 'Đã giao hàng', population: counts.delivered, color: colors.green },
            { name: 'Chờ xác nhận', population: counts.awaitingConfirmation, color: colors.blue },
            { name: 'Chờ lấy hàng', population: counts.awaitingPickup, color: colors.orange },
            { name: 'Chờ giao hàng', population: counts.awaitingDelivery, color: colors.purple },
            { name: 'Khách huỷ đơn', population: counts.unsuccessful, color: colors.red }
        ];

        const chartConfig = {
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Màu chữ
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        };

        return (
            <View style={{ alignItems: "center", marginTop: 10 }}>
                <PieChart
                    data={chartData}
                    width={Width - 12}
                    height={200}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="1"
                    absolute
                />
            </View>
        );
    };

    return (
        <View style={AppStyle.DataAnalysisStyle.container}>
            {loading ? (
                <ActivityIndicator size="large" color={colors.loading} />
            ) : (
                <>
                    {renderPieChart()}
                    <Text style={AppStyle.DataAnalysisStyle.chartTitle}>
                        (Tỉ lệ đặt hàng thành công)
                    </Text>
                </>
            )}
        </View>
    );
};

export default SuccessfulOrderRate;
