import React, { useEffect, useState } from "react";
import { View, Button, Text, ActivityIndicator, Dimensions, Alert, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { query, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { BuyDataRef } from "../../../config/firebase";
import GobackButtomView from "../../../component/gobackButtomView";
import { colors } from "../../../assest/color";

const Width = Dimensions.get('window').width;


const UploadScreen = () => {
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
                    totalPrice: 0,
                    orderCount: 0
                };
            }
            groupedByDate[formattedDate].totalPrice += order.totalPriceSale / 1000000; // Tính tổng số tiền bán và chuyển đổi đơn vị thành triệu đồng
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
                data: Object.values(data).map(item => item.totalPrice),
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Màu xanh cho các điểm dữ liệu
                strokeWidth: 2, // Độ dày của đường
            }],
        };

        return (
            <View style={{ margin: 5 }}>
                <LineChart
                    data={chartData}
                    width={Width - 12}
                    height={290}
                    yAxisSuffix=" triệu" // Đơn vị trục y là triệu đồng
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        propsForLabels: {
                            fontSize: 8,
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
                            const totalPrice = data.value;
                            setSelectedPointInfo({ date: selectedDate, price: totalPrice });
                        }
                    }}
                />

                <Text style={{ marginTop: 10 }}>
                    {selectedPointInfo
                        ? `Doanh thu là Ngày ${selectedPointInfo.date}: ${selectedPointInfo.price} triệu đồng`
                        : `Doanh thu ngày hôm nay: ${data[format(new Date(), 'dd-MM-yyyy')]
                            ? data[format(new Date(), 'dd-MM-yyyy')].totalPrice + " " + "triệu đồng"
                            : 0
                        }`
                    }
                </Text>

            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={{
                    flex: 1,
                    borderRadius: 20,
                }}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#62938b" />
                    ) : (
                        renderChart()
                    )}
                    {Object.keys(data).length === 0 && (
                        <Text style={{ marginTop: 10 }}>Không có dữ liệu để phân tích</Text>
                    )}
                    

                    <Button title="Reload Data" onPress={fetchBuyData} />
                </View>
            </ScrollView>
        </View>
    );
};

export default UploadScreen;


