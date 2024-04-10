import React, { useEffect, useState } from "react";
import {
    ScrollView,
    Text,
    StatusBar,
    View,
    Image,
    RefreshControl,
    TouchableOpacity,
    TextInput
} from "react-native";
import { useSelector } from 'react-redux';
import { query, limit, getDocs, where } from 'firebase/firestore';
import { UserInfoRef, AllProductionRef } from "../../../config/firebase";
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import AppStyle from "../../../theme";
import Icons from "../../../assest";
import { colors } from "../../../assest/color";
import formatPrice from "../../../component/formatPrice";


export default function WareHouseHome() {
    const { user } = useSelector(state => state.user);
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState(null);
    const [productionData, setProductionData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [isConnected, setIsConnected] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState('');

    StatusBar.setHidden(true);

    const fetchData = async () => {
        try {
            const netInfoState = await NetInfo.fetch();
            const isConnected = netInfoState.isConnected;
            setIsConnected(isConnected);

            if (user && isConnected) {
                setRefreshing(true);
                const userQuerySnapshot = await getDocs(
                    query(UserInfoRef(), where('userId', '==', user.uid), limit(1))
                );
                if (!userQuerySnapshot.empty) {
                    const userData = userQuerySnapshot.docs[0].data();
                    setUserInfo(userData);

                    let productionQuery = query(AllProductionRef(), where('userId', '==', user.uid));
                    if (searchKeyword !== '') {
                        productionQuery = query(AllProductionRef(),
                            where('userId', '==', user.uid),
                            where('name', '>=', searchKeyword),
                            where('name', '<=', searchKeyword + '\uf8ff')
                        );
                    }


                    const productionQuerySnapshot = await getDocs(productionQuery);

                    const productionData = [];
                    productionQuerySnapshot.forEach((doc) => {
                        const production = doc.data();
                        productionData.push(production);
                    });

                    setProductionData(productionData);
                    console.log(searchKeyword)
                    console.log(productionData)
                } else {
                    console.log('No user data found for the current user!');
                }
            } else {
                console.log('No user information available or not connected to the internet!');
            }
        } catch (error) {
            console.error('Error checking network connection:', error);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        if (isConnected) {
            fetchData();
        }
    }, [user, isConnected]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const handleSearch = () => {
        fetchData();
    };

    let totalCost = 0;
    if (productionData) {
        productionData.forEach((product) => {
            totalCost += parseInt(product.cost);
        });
    }

    const totalNumberOfProducts = productionData ? productionData.length : 0;



    return (
        <View style={{ flex: 1 }}>
            <View style={AppStyle.WareHouseHomeStyle.tabView}>
                <View style={AppStyle.WareHouseHomeStyle.tabFunction}>
                    <View style={AppStyle.WareHouseHomeStyle.tabFunctionView}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={AppStyle.WareHouseHomeStyle.goBackButtom}
                        >
                            <Image
                                style={AppStyle.WareHouseHomeStyle.goBackButtomStyle}
                                source={Icons.GoBackIcon}
                                tintColor={"#383838"}
                            />
                        </TouchableOpacity>
                        <View
                            style={AppStyle.WareHouseHomeStyle.searchInputView}
                        >
                            <TextInput
                                onChangeText={(text) => setSearchKeyword(text)}
                                value={searchKeyword}
                                style={AppStyle.WareHouseHomeStyle.textInputStyle}
                                placeholder="Search"
                            />
                        </View>
                        <TouchableOpacity
                            onPress={handleSearch}
                            style={AppStyle.WareHouseHomeStyle.searchButtomView}
                        >
                            <Image
                                style={AppStyle.WareHouseHomeStyle.goBackButtomStyle}
                                source={Icons.SearchIcon}
                                tintColor={colors.tabTitleColor}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={AppStyle.WareHouseHomeStyle.generalInformation}>
                    <View style={AppStyle.WareHouseHomeStyle.generalInformationView}>
                        <Text style={AppStyle.WareHouseHomeStyle.generalInformationText}>
                            Số lượng: {totalNumberOfProducts} (SP)
                        </Text>
                        <Text style={AppStyle.WareHouseHomeStyle.generalInformationText}>
                            Giá trị: {formatPrice(totalCost)}₫
                        </Text>
                    </View>
                </View>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                {productionData && productionData.map((product, index) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ProductionDetail', { product: product })}
                        style={AppStyle.WareHouseHomeStyle.productionInfoView}
                        key={index}>
                        <View style={AppStyle.WareHouseHomeStyle.productionImage}>
                            {product.images && product.images.length > 0 && (
                                <Image
                                    source={{ uri: product.images[0] }}
                                    style={AppStyle.WareHouseHomeStyle.productionImageStyle} />
                            )}
                        </View>
                        <View style={AppStyle.WareHouseHomeStyle.productionInfoTextView}>
                            <Text
                                style={AppStyle.WareHouseHomeStyle.productionInfoTextName}
                            >Mã sản phẩm: {product.productCode}</Text>
                            <Text>{product.name}</Text>
                            <Text
                                style={AppStyle.WareHouseHomeStyle.productionInfoTextPrice}
                            >Giá gốc:{formatPrice(product.cost)}₫ Giá bán: {formatPrice(product.price)}₫ </Text>
                            <Text
                                style={AppStyle.WareHouseHomeStyle.productionInfoTextPriceSale}
                            >Giá khuyến mãi: {formatPrice(product.priceSale)}₫</Text>
                            <Text
                                style={AppStyle.WareHouseHomeStyle.productionInfoTextDescription}
                                numberOfLines={4}>{product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {!userInfo || !productionData}
            <View
            style = {{marginBottom:75}}
            />
        </View>
    );
}
