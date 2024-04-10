import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, RefreshControl } from "react-native";
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { query, getDocs, where } from 'firebase/firestore';
import { BuyDataRef } from "../../config/firebase";
import AppStyle from "../../theme";
import Icons from "../../assest";
import { colors } from "../../assest/color";
import Loading from "../../component/loading";
import formatPrice from "../../component/formatPrice";
import { setPurchaseDataCount, setPendingOrdersCount } from "../../redux/slices/purchaseSlice";


export default function PurchaseInformationScreen() {
    const [buyData, setBuyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    
    const fetchBuyData = async (status = null) => {
        try {
            let q = query(BuyDataRef());

            if (status !== null) {
                q = query(q, where('orderStatus', '==', status));
            }

            console.log("Fetching buy data...");
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const data = querySnapshot.docs.map(doc => doc.data());
                setBuyData(data);
                console.log('Buy data:', data);
                
                const pendingOrders = data.filter(item => item.orderStatus === 1);
                dispatch(setPendingOrdersCount(pendingOrders.length)); // Cập nhật pendingOrdersCount
                dispatch(setPurchaseDataCount(data.length));
            } else {
                console.log('No buy data found for the current user!');
                setBuyData([]);
            }
        } catch (error) {
            console.error('Error fetching buy data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };


    const handleRefresh = async () => {
        setRefreshing(true);

        try {
            await fetchBuyData(selectedStatus);
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchBuyData();
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };

        fetchData();
    }, []);

    const countOrdersByStatus = (status) => {
        return buyData.filter(item => item.orderStatus === status).length;
    };


    const RenderAllBuyDatas = () => {
        if (loading && !refreshing) {
            return <Loading />;
        }
        const getStatusStyle = (orderStatus) => {
            let color = '';

            switch (orderStatus) {
                case 1:
                    color = 'blue';
                    break;
                case 2:
                    color = 'orange';
                    break;
                case 3:
                    color = 'green';
                    break;
                case 4:
                    color = 'purple';
                    break;
                case 5:
                    color = 'red';
                    break;
                default:
                    color = 'black';
                    break;
            }
            return { color: color };
        };
        return (
            <FlatList
                style={{ marginBottom: 210 }}
                data={filteredBuyData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('BuyDataDetail', { buyDataDetail: item })}
                        style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasView}>
                        <View style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasImageView}>
                            <Text style={{ fontSize: 8 }}>Ảnh SP</Text>
                            {item.cartItems.map((cartItem, index) => (
                                <View key={index} style={{ margin: 3, }}>
                                    <Image
                                        source={{ uri: cartItem.images[0] }} // Lấy hình ảnh đầu tiên từ mỗi cartItem
                                        style={{ width: 40, height: 40 }}
                                        resizeMode="cover"
                                    />
                                </View>
                            ))}
                        </View>
                        <View
                            style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasInfoView}
                        >
                            <Text style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasTitle}>
                                Thông tin đơn hàng #{item.orderId}
                            </Text>
                            <View style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasProductNameView}>
                                <Text
                                    style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasProductNameText}
                                >Sản phẩm: </Text>
                                {item.cartItems.map((cartItem, index) => (
                                    <View key={index} >
                                        <Text
                                            style={{
                                                ...AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasProductNameText,
                                                flexWrap: 'wrap'
                                            }}
                                        >{cartItem.name}, </Text>

                                    </View>
                                ))}
                            </View>
                            <Text style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasProductContentText}>
                                <Text style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasProductPriceSaleText}>Thiệp:</Text> <Text>{item.attachContent}</Text>
                            </Text>
                            <Text style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasProductPriceSaleText}>
                                Thanh toán: <Text>{formatPrice(item.totalPriceSale)} ₫</Text> <Text style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasProductPriceText}>{formatPrice(item.totalPrice)} ₫</Text>
                            </Text>
                            <Text style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasProductPayText}>
                                <Text>{item.selectedPaymentMethod === "cash" ? 'Thanh toán khi nhận hàng' : 'Khác'}</Text>
                            </Text>

                            {/* Hiển thị thông tin của khách hàng */}
                            <Text style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasUserText}>
                                Họ và tên: <Text>{item.userInfo.fullName}</Text>
                            </Text>
                            <Text style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasUserText}>
                                Địa chỉ: <Text>{item.userInfo.address}</Text>
                            </Text>
                            <Text style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasUserText}>
                                Số điện thoại: <Text>{item.userInfo.phoneNumber}</Text>
                            </Text>

                            <View>
                                <Text style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasOderText}>
                                    <Text>
                                        Trạng thái:{' '}
                                    </Text>
                                    <Text style={getStatusStyle(item.orderStatus)}>
                                        {(() => {
                                            switch (item.orderStatus) {
                                                case 1:
                                                    return 'Chờ xác nhận';
                                                case 2:
                                                    return 'Chờ lấy hàng';
                                                case 3:
                                                    return 'Chờ giao hàng';
                                                case 4:
                                                    return 'Đã giao hàng';
                                                case 5:
                                                    return 'Khách huỷ đơn';
                                                default:
                                                    return 'Không xác định';
                                            }
                                        })()}
                                    </Text>
                                </Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                ListEmptyComponent={() => (
                    <View
                        style={AppStyle.PurchaseInformationScreenStyle.listEmptyComponentView}
                    >
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>
                            Không có đơn hàng nào.
                        </Text>
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            />



        );
    };

    const navigateToOrderStatus = (status) => {
        const filteredOrders = buyData.filter(item => item.orderStatus === status);
        if (filteredOrders.length > 0) {
            navigation.navigate('OrderStatus1', { orders: filteredOrders });
        }
    };
    
    const filteredBuyData = selectedStatus !== null ? buyData.filter(item => item.orderStatus === selectedStatus) : buyData;
    return (
        <View style={AppStyle.PurchaseInformationScreenStyle.container}>
            <View style={AppStyle.PurchaseInformationScreenStyle.tabView}>
            </View>
            <View style={AppStyle.PurchaseInformationScreenStyle.bodyView}>
                <View style={AppStyle.PurchaseInformationScreenStyle.selectButtom}>
                    <TouchableOpacity
                        style={AppStyle.PurchaseInformationScreenStyle.selectButtomStyle}
                        onPress={() => navigateToOrderStatus(1)} // Chờ xác nhận
                        >
                        <Image
                            source={Icons.ChecklistsIcon}
                            style={AppStyle.PurchaseInformationScreenStyle.selectIconStyle}
                            tintColor={colors.PurchaseInformationTincolor}
                        />
                        <Text style={AppStyle.PurchaseInformationScreenStyle.selectText}>
                            Chờ xác nhận <Text style={{ color: "red", fontWeight: "700" }}>({countOrdersByStatus(1)})</Text>
                        </Text>
                    </TouchableOpacity>



                    <TouchableOpacity                        
                        onPress={() => navigateToOrderStatus(2)} // Chờ xác nhận

                        style={AppStyle.PurchaseInformationScreenStyle.selectButtomStyle}
                    >
                        <Image
                            source={Icons.GoodsIcon}
                            style={AppStyle.PurchaseInformationScreenStyle.selectIconStyle}
                            tintColor={colors.PurchaseInformationTincolor}
                        />
                        <Text style={AppStyle.PurchaseInformationScreenStyle.selectText}>
                            Chờ lấy hàng <Text style={{ color: "red", fontWeight: "700" }}>({countOrdersByStatus(2)})</Text>
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigateToOrderStatus(3)} // Chờ xác nhận
                        style={AppStyle.PurchaseInformationScreenStyle.selectButtomStyle}
                    >
                        <Image
                            source={Icons.DeliveryCarIcon}
                            style={AppStyle.PurchaseInformationScreenStyle.selectIconStyle}
                            tintColor={colors.PurchaseInformationTincolor}
                        />
                        <Text style={AppStyle.PurchaseInformationScreenStyle.selectText}>
                            Chờ giao hàng <Text style={{ color: "red", fontWeight: "700" }}>({countOrdersByStatus(3)})</Text>
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigateToOrderStatus(4)} // Chờ xác nhận
                        style={AppStyle.PurchaseInformationScreenStyle.selectButtomStyle}
                    >
                        <Image
                            source={Icons.OrderDeliveryIcon}
                            style={AppStyle.PurchaseInformationScreenStyle.selectIconStyle}
                            tintColor={colors.PurchaseInformationTincolor}
                        />
                        <Text style={AppStyle.PurchaseInformationScreenStyle.selectText}>
                            Đã giao hàng <Text style={{ color: "#009933", fontWeight: "700" }}>({countOrdersByStatus(4)})</Text>
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigateToOrderStatus(5)} // Chờ xác nhận
                        style={AppStyle.PurchaseInformationScreenStyle.selectButtomStyle}
                    >
                        <Image
                            source={Icons.DeliveryFailed}
                            style={AppStyle.PurchaseInformationScreenStyle.selectIconStyle}
                            tintColor={colors.PurchaseInformationTincolor}
                        />
                        <Text style={AppStyle.PurchaseInformationScreenStyle.selectText}>
                            Khách huỷ đơn<Text style={{ color: "red" }}>({countOrdersByStatus(5)})</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{
                paddingTop: 10,
            }}>
                <RenderAllBuyDatas />
            </View>
        </View>
    )
}