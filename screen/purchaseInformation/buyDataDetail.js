import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import formatPrice from '../../component/formatPrice';
import AppStyle from '../../theme';
import GobackButtomView from '../../component/gobackButtomView';
import { colors } from '../../assest/color';

export default function BuyDataDetail({ route, navigation }) {
    const { buyDataDetail } = route.params;
    const { orderId } = buyDataDetail;
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const q = query(collection(db, 'BuyData'), where('orderId', '==', orderId));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const fetchedProducts = [];
                    querySnapshot.forEach((doc) => {
                        fetchedProducts.push({ id: doc.id, ...doc.data() }); // Lưu thêm ID của sản phẩm
                    });
                    setProducts(fetchedProducts);
                } else {
                    console.log('Không tìm thấy sản phẩm cho orderId:', orderId);
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
            }
        };

        // Gọi hàm fetchProducts khi component mount
        fetchProducts();

        // Cleanup function nếu cần
        return () => {
            // Thực hiện các tác vụ cleanup nếu cần
        };
    }, [orderId]);

    // Định nghĩa hàm getStatusText trong phạm vi của component
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

    const orderStatuses = [
        { value: 1, label: 'Chờ xác nhận' },
        { value: 2, label: 'Chờ lấy hàng' },
        { value: 3, label: 'Chờ giao hàng' },
        { value: 4, label: 'Đã giao hàng' },
        { value: 5, label: 'Khách huỷ đơn' },
    ];


    const handleUpdateOrderStatus = async (productId, currentStatus) => {
        try {
            let newStatus;
            switch (currentStatus) {
                case 1:
                    newStatus = 1;
                    break;
                case 2:
                    newStatus = 2;
                    break;
                case 3:
                    newStatus = 3;
                    break;
                case 4:
                    newStatus = 4;
                    break;
                case 5:
                    newStatus = 5;
                    break;
                default:
                    newStatus = currentStatus;
                    break;
            }

            Alert.alert(
                'Xác nhận',
                `Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng thành ${getStatusText(newStatus)} không?`,
                [
                    {
                        text: 'Không',
                        style: 'cancel',
                    },
                    {
                        text: 'Thay đổi',
                        onPress: async () => {
                            const productRef = doc(db, 'BuyData', productId);
                            await updateDoc(productRef, { orderStatus: newStatus });
                            Alert.alert('Thông báo', 'Cập nhật trạng thái đơn hàng thành công');
                            navigation.goBack('');

                            const updatedProducts = products.map((product) => {
                                if (product.id === productId) {
                                    return { ...product, orderStatus: newStatus };
                                }
                                return product;
                            });
                            setProducts(updatedProducts);
                        },
                    },
                ]
            );
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
            Alert.alert('Lỗi', 'Cập nhật trạng thái đơn hàng thất bại');
        }
    };

    return (
        <View style={AppStyle.BuyDataDetailStyle.container}>
            <GobackButtomView />
            <ScrollView>
                <View style={AppStyle.BuyDataDetailStyle.bodyView}>

                    <View style={AppStyle.BuyDataDetailStyle.titleView}>
                        <Text style={AppStyle.BuyDataDetailStyle.titleStyle}>Thông tin đơn hàng</Text>
                    </View>

                    <View style={AppStyle.BuyDataDetailStyle.infoView}>
                        <Text style={AppStyle.BuyDataDetailStyle.orderIdText}>Mã đơn hàng: <Text style={{ color: colors.priceSaleColor }}>{orderId}</Text></Text>
                        <Text style={AppStyle.BuyDataDetailStyle.sectionTitle}>danh sách sản phẩm</Text>
                        {products.map((product, index) => (
                            <View key={index} style={AppStyle.BuyDataDetailStyle.productItem}>
                                {product.cartItems.map((cartItem, index) => (
                                    <View key={index} style={{ flexDirection: "row" }}>
                                        <View style={AppStyle.BuyDataDetailStyle.productItemInfoView}>
                                            <Text
                                                style={{
                                                    ...AppStyle.BuyDataDetailStyle.infoText,
                                                    flexWrap: 'wrap'
                                                }}
                                            >{cartItem.name} <Text style={{ color: colors.productCodeColor }}>"{cartItem.productCode}"</Text></Text>
                                            <Text
                                                style={{
                                                    ...AppStyle.BuyDataDetailStyle.infoText,
                                                    flexWrap: 'wrap'
                                                }}
                                            >Số lượng: {cartItem.quantity} </Text>
                                            <Text
                                                style={{
                                                    ...AppStyle.BuyDataDetailStyle.infoText,
                                                    flexWrap: 'wrap'
                                                }}
                                            >Giá khuyến mãi: {cartItem.priceSale} ₫ </Text>
                                            <Text
                                                style={{
                                                    ...AppStyle.BuyDataDetailStyle.infoText,
                                                    flexWrap: 'wrap'
                                                }}
                                            >Giá bán: {cartItem.price} ₫ </Text>
                                            <Text
                                                style={{
                                                    ...AppStyle.BuyDataDetailStyle.infoText,
                                                    flexWrap: 'wrap'
                                                }}
                                            >Giá Cost: {cartItem.cost} ₫ </Text>
                                        </View>
                                        <View style={AppStyle.BuyDataDetailStyle.productItemImageView}>
                                            <Image
                                                source={{ uri: cartItem.images[0] }} // Lấy hình ảnh đầu tiên từ mỗi cartItem
                                                style={{ width: 100, height: 100, margin: 5 }}
                                                resizeMode="cover"
                                            />
                                        </View>
                                    </View>
                                ))}

                                <Text
                                    style={AppStyle.BuyDataDetailStyle.totalPriceSaleText}
                                >Tổng thanh toán: {formatPrice(product.totalPriceSale)} ₫</Text>
                                <Text style={AppStyle.BuyDataDetailStyle.totalPriceText}>Tổng giá bán: {formatPrice(product.totalPrice)} ₫</Text>
                                <Text
                                    style={AppStyle.BuyDataDetailStyle.selectedPaymentMethodText}
                                >Hình thức thanh toán: {product.selectedPaymentMethod === 'cash' ? 'Thanh toán khi nhận hàng' : 'Khác'}</Text>

                                <Text style={AppStyle.BuyDataDetailStyle.sectionTitle}>Thông tin người nhận</Text>
                                <Text
                                    style={AppStyle.BuyDataDetailStyle.infoText}

                                >Họ và tên khách hàng: {product.userInfo.fullName}</Text>
                                <Text
                                    style={AppStyle.BuyDataDetailStyle.infoText}
                                >Số điện thoại: {product.userInfo.phoneNumber}</Text>
                                <Text
                                    style={AppStyle.BuyDataDetailStyle.infoText}
                                >Địa chỉ giao hàng: {product.userInfo.address}</Text>

                                <Text
                                    style={AppStyle.BuyDataDetailStyle.attachContentText}
                                >Nội dung đính kèm: {product.attachContent}</Text>

                                <Text
                                    style={AppStyle.BuyDataDetailStyle.orderStatusText} >
                                    Trạng thái đơn hàng: {getStatusText(product.orderStatus)}
                                </Text>
                                <Text
                                    style={AppStyle.BuyDataDetailStyle.estimatedDeliveryTimeText}
                                >Thời gian giao hàng dự kiến: {product.deliveryTime}{product.EstimatedDeliveryTime}</Text>
                                <Text style={AppStyle.BuyDataDetailStyle.sectionTitle}>Thay đổi trạng thái đơn hàng</Text>

                                {orderStatuses.map((status) => (
                                    <TouchableOpacity
                                        key={status.value}
                                        style={AppStyle.BuyDataDetailStyle.button}
                                        onPress={() => handleUpdateOrderStatus(product.id, status.value)}
                                    >
                                        <Text style={AppStyle.BuyDataDetailStyle.buttonText}>{status.label}</Text>
                                    </TouchableOpacity>
                                ))}

                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}


