import React from "react";
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    Image
} from "react-native";
import { useRoute } from "@react-navigation/native";
import AppStyle from "../../../theme";
import GobackButtomView from "../../../component/gobackButtomView";
import Swiper from "react-native-swiper";
import formatPrice from "../../../component/formatPrice";

export default function ProductionDetail() {
    const route = useRoute();
    const { product } = route.params;
    StatusBar.setHidden(true);
    return (
        <View style={AppStyle.ProductionDetailStyle.container}>
            <GobackButtomView />
            <View style={AppStyle.ProductionDetailStyle.bodyView}>
                <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                >
                    <View style={AppStyle.ProductionDetailStyle.imageView}>
                        <Swiper
                            autoplay={true}
                            horizontal={true}
                            autoplayTimeout={3000}
                            style={{
                                height: 250,
                                width: "auto",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            containerStyle={{ justifyContent: "center", alignItems: "center" }}
                        >
                            {product.images && product.images.map((image, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: image }}
                                    style={AppStyle.ProductionDetailStyle.imageStyle}
                                    resizeMode="contain"
                                />
                            ))}
                        </Swiper>
                    </View>

                    <View 
                    style = {AppStyle.ProductionDetailStyle.featureView}
                    >
                        <Text style = {AppStyle.ProductionDetailStyle.featureTextStyle}>
                            Chỉnh sửa thông tin
                        </Text>
                    </View>

                    <View style={AppStyle.ProductionDetailStyle.productionInfoView}>
                        <Text style = {AppStyle.ProductionDetailStyle.nameTextStyle}>
                            Mã sản phẩm: {product.productCode}
                        </Text>
                        <Text style = {AppStyle.ProductionDetailStyle.nameTextStyle}>
                            Tên sản phẩm: {product.name}
                        </Text>
                        <Text style = {AppStyle.ProductionDetailStyle.priceTextStyle}>
                            Giá gốc: {formatPrice(product.cost)} ₫
                        </Text>
                        <Text style = {AppStyle.ProductionDetailStyle.priceTextStyle}>
                            Giá bán: {formatPrice(product.price)} ₫
                        </Text>
                        <Text style = {AppStyle.ProductionDetailStyle.priceTextStyle}>
                            Giá sau khuyến mãi: {formatPrice(product.priceSale)} ₫
                        </Text>
                        <Text  style = {AppStyle.ProductionDetailStyle.descriptionTextStyle}>
                            Thông tin sản phẩm: {product.description}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}