import React, { useEffect, useState } from "react";
import { View, Button, Text, ActivityIndicator, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { BarChart } from 'react-native-chart-kit';
import { query, getDocs } from 'firebase/firestore';
import { format, startOfMonth } from 'date-fns';
import { BuyDataRef } from "../../config/firebase";
import { colors } from "../../assest/color";
import AppStyle from "../../theme";

const Width = Dimensions.get('window').width;

const DataAnalysisMonth = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedPointInfo, setSelectedPointInfo] = useState(null);

    const fetchBuyData = async () => {
        try {
            let q = query(BuyDataRef());
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const rawData = querySnapshot.docs.map(doc => doc.data());
                const formattedData = formatData(rawData);
                setData(formattedData);

                // Tính số lượng đơn hàng theo từng trạng thái
                const counts = {
                    total: rawData.length,
                    awaitingConfirmation: 0,
                    awaitingPickup: 0,
                    awaitingDelivery: 0,
                    delivered: 0,
                    unsuccessful: 0
                };

                rawData.forEach(order => {
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

            } else {
                setData({});
            }
        } catch (error) {
            console.error('Error fetching buy data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatData = (rawData) => {
        const groupedByMonth = {};
    
        rawData.forEach(order => {
            const createdAt = order.timestamp.toDate(); // Chuyển đổi Timestamp thành JavaScript Date
            const formattedMonth = format(startOfMonth(createdAt), 'MM-yyyy'); // Lấy tháng và năm thành 'MM-yyyy'
    
            if (!groupedByMonth[formattedMonth]) {
                groupedByMonth[formattedMonth] = {
                    totalPriceSale: 0,
                    orderCount: 0
                };
            }
            groupedByMonth[formattedMonth].totalPriceSale += order.totalPriceSale / 1000000; // Tính tổng số tiền bán và chuyển đổi đơn vị thành triệu đồng
            groupedByMonth[formattedMonth].orderCount++; // Tăng số lượng đơn hàng
        });
    
        // Sắp xếp các nhãn (labels) theo thứ tự thời gian tăng dần
        const sortedLabels = Object.keys(groupedByMonth).sort((a, b) => new Date(a) - new Date(b));
        const sortedData = {};
        sortedLabels.forEach(label => {
            sortedData[label] = groupedByMonth[label];
        });
    
        return sortedData;
    };

    useEffect(() => {
        fetchBuyData();
    }, []);

    const renderChart = () => {
        const chartData = {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data).map(item => item.totalPriceSale),
            }],
        };
    
        return (
            <View style={{ margin: 5, alignItems: "center", marginTop: 20}}>
                <BarChart
                    data={chartData}
                    width={Width - 12}
                    height={200}
                    yAxisSuffix=" triệu"     // Đơn vị trục y là triệu đồng
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(150, 180, 170, ${opacity})`, // Màu cho các cột dữ liệu
                        propsForLabels: {
                            fontSize: 10,
                        },
                    }}
                    style={{
                        borderRadius: 20,
                        borderColor: colors.tabViewColor,
                        borderWidth: 1
                    }}
                    fromZero={true} // Hiển thị biểu đồ từ giá trị 0
                    yAxisInterval={1}
                    onDataPointClick={(data) => {
                        if (data && data.value) {
                            const selectedMonth = chartData.labels[data.index];
                            const totalPriceSale = data.value;
                            setSelectedPointInfo({ month: selectedMonth, price: totalPriceSale });
                        }
                    }}
                />
                <Text style={AppStyle.DataAnalysisStyle.chartTitle}>(Thống kê theo tháng)</Text>
    
                <Text style={AppStyle.DataAnalysisStyle.totalPriceSaleText}>
                    {selectedPointInfo
                        ? `Doanh thu Tháng ${selectedPointInfo.month}: ${selectedPointInfo.price} triệu đồng`
                        : `Doanh thu tháng hiện tại: ${
                            data[format(new Date(), 'MM-yyyy')]
                                ? data[format(new Date(), 'MM-yyyy')].totalPriceSale + " " + "triệu đồng"
                                : 0
                            }`
                    }
                </Text>
    
            </View>
        );
    };
    
    

    return (
        <View style={AppStyle.DataAnalysisStyle.container}>
            <ScrollView>
                <View style={AppStyle.DataAnalysisStyle.bodyView}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#62938b" />
                    ) : (
                        renderChart()
                    )}
                    {Object.keys(data).length === 0 && (
                        <Text style={AppStyle.DataAnalysisStyle.totalPriceSaleText}>Không có dữ liệu để phân tích</Text>
                    )}
                    {/*
                    <TouchableOpacity
                    onPress={fetchBuyData}
                    >
                        <Text>Cập nhật data</Text>
                    </TouchableOpacity>
                     */}
                </View>
            </ScrollView>
        </View>
    );
};

export default DataAnalysisMonth;


