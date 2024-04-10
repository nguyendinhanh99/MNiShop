import React, { useEffect, useState } from "react";
import { View, Button, Text, ActivityIndicator, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { query, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { BuyDataRef } from "../../config/firebase";
import { colors } from "../../assest/color";
import AppStyle from "../../theme";

const Width = Dimensions.get('window').width;

const DataAnalysis = () => {
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
        const groupedByDate = {};

        rawData.forEach(order => {
            const createdAt = order.timestamp.toDate(); // Chuyển đổi Timestamp thành JavaScript Date
            const formattedDate = format(createdAt, 'dd-MM-yyyy'); // Định dạng ngày thành 'yyyy-MM-dd'

            if (!groupedByDate[formattedDate]) {
                groupedByDate[formattedDate] = {
                    totalPriceSale: 0,
                    orderCount: 0
                };
            }
            groupedByDate[formattedDate].totalPriceSale += order.totalPriceSale / 1000000; // Tính tổng số tiền bán và chuyển đổi đơn vị thành triệu đồng
            groupedByDate[formattedDate].orderCount++; // Tăng số lượng đơn hàng
        });

        // Sắp xếp các nhãn (labels) theo thứ tự thời gian tăng dần
        const sortedLabels = Object.keys(groupedByDate).sort((a, b) => new Date(a) - new Date(b));
        const sortedData = {};
        sortedLabels.forEach(label => {
            sortedData[label] = groupedByDate[label];
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
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Màu xanh cho các điểm dữ liệu
                strokeWidth: 2, // Độ dày của đường

            }],
        };

        return (
            <View style={{ margin: 5, alignItems: "center"}}>
                <LineChart
                    data={chartData}
                    width={Width - 12}
                    height={290}
                    yAxisSuffix=" triệu"     // Đơn vị trục y là triệu đồng
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        color: (opacity = 1) => `rgba(150, 180, 170, ${opacity})`, // Màu cho các điểm dữ liệu (tương đối đậm hơn)                        
                        propsForLabels: {
                            fontSize: 10,
                        },
                        propsForDots: {
                            r: '5', // Bán kính của điểm dữ liệu
                            fill: colors.tabViewColor, // Màu nền của điểm dữ liệu
                            stroke: colors.tabTitleColor, // Màu viền của điểm dữ liệu
                        }
                    }}
                    style={{
                        borderRadius: 20,
                        borderColor: colors.tabViewColor,
                        borderWidth: 1
                    }}
                    fromZero={true} // Hiển thị biểu đồ từ giá trị 0
                    onDataPointClick={(data) => {
                        if (data && data.value) {
                            const selectedDate = chartData.labels[data.index];
                            const totalPriceSale = data.value;
                            setSelectedPointInfo({ date: selectedDate, price: totalPriceSale });
                        }
                    }}
                />
                <Text style = {AppStyle.DataAnalysisStyle.chartTitle}>(Thống kê theo ngày)</Text>

                <Text style={AppStyle.DataAnalysisStyle.totalPriceSaleText}>
                    {selectedPointInfo
                        ? `Doanh thu Ngày ${selectedPointInfo.date}: ${selectedPointInfo.price} triệu đồng`
                        : `Doanh thu ngày hôm nay: ${data[format(new Date(), 'dd-MM-yyyy')]
                            ? data[format(new Date(), 'dd-MM-yyyy')].totalPriceSale + " " + "triệu đồng"
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

export default DataAnalysis;


