import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import AppStyle from "../../../theme";
import GobackButtomView from "../../../component/gobackButtomView";
import { useNavigation } from "@react-navigation/native";


export default function OrderStatus1({ route }) {
    const { orders } = route.params;
    const navigation = useNavigation();
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

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('BuyDataDetail', { buyDataDetail: item })}
            style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasView}
        >
            <View style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasImageView}>
                <Text style={{ fontSize: 8 }}>Ảnh SP</Text>
                {item.cartItems.map((cartItem, index) => (
                    <View key={index} style={{ margin: 3 }}>
                        <Image
                            source={{ uri: cartItem.images[0] }} // Lấy hình ảnh đầu tiên từ mỗi cartItem
                            style={{ width: 40, height: 40 }}
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </View>
            <View style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasInfoView}>
                <Text style={AppStyle.PurchaseInformationScreenStyle.renderAllBuyDatasTitle}>
                    Thông tin đơn hàng #{item.orderId}
                </Text>
                <Text>Sản phẩm:</Text>
                {item.cartItems.map((cartItem, index) => (
                    <Text key={index}>{cartItem.name}</Text>
                ))}
                <Text>Thời gian giao dự kiến: {item.EstimatedDeliveryTime}</Text>
                <Text>Nội dung đính kèm: {item.attachContent}</Text>
                <Text>Thời gian giao hàng: {item.deliveryTime}</Text>
                <Text>Tổng giá: {item.totalPrice}</Text>
                <Text style={getStatusStyle(item.orderStatus)}>
                    Trạng thái: {getStatusText(item.orderStatus)}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const getStatusText = (orderStatus) => {
        switch (orderStatus) {
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
    };

    return (
        <View>
            <GobackButtomView></GobackButtomView>
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                    <View style={AppStyle.PurchaseInformationScreenStyle.listEmptyComponentView}>
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>Không có đơn hàng nào.</Text>
                    </View>
                )}
                contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 210 }}
            />
        </View>
    );
}
