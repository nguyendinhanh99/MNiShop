import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageBackground
} from "react-native";
import AppStyle from "../../theme";
import Icons from "../../assest";
import { colors } from "../../assest/color";
import { useNavigation } from "@react-navigation/native";
import Banders from "../../assest/bander";
import DataAnalysis from "../../component/dataAnalysis/dataAnalysis";
import SuccessfulOrderRate from "../../component/dataAnalysis/successfulOrderRate";
import DataAnalysisMonth from "../../component/dataAnalysis/dataAnalysisMonth";


export default function InventoryManagementScreen() {
    const navigation = useNavigation()
    return (
        <View style={AppStyle.InventoryManagementScreenStyle.container}>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >

                <ImageBackground
                    source={Banders.bander1}
                    style={[AppStyle.InventoryManagementScreenStyle.statisticsView]}
                >
                </ImageBackground>

                <View style={AppStyle.InventoryManagementScreenStyle.bodyView}>
                    <View style={AppStyle.InventoryManagementScreenStyle.titleView}>
                        <Text style={AppStyle.InventoryManagementScreenStyle.titleTextStyle}>
                            Sản phẩm
                        </Text>
                    </View>

                    <View style={AppStyle.InventoryManagementScreenStyle.buttomProductionView}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddNewProduction')}
                            style={[AppStyle.InventoryManagementScreenStyle.buttomProductionStyle, { backgroundColor: '#fec4b6' }]}>
                            <Image
                                style={AppStyle.InventoryManagementScreenStyle.buttomProductionIcon}
                                source={Icons.addProductionIcon}
                                tintColor={colors.tintColorInventory}
                            />
                            <Text style={AppStyle.InventoryManagementScreenStyle.buttomProductionTitle}>
                                Thêm sản phẩm
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('WareHouseHome')}
                            style={[AppStyle.InventoryManagementScreenStyle.buttomProductionStyle, { backgroundColor: '#f1b0da' }]}>
                            <Image
                                style={AppStyle.InventoryManagementScreenStyle.buttomProductionIcon}
                                source={Icons.warehouseIcon}
                                tintColor={colors.tintColorInventory}
                            />
                            <Text style={AppStyle.InventoryManagementScreenStyle.buttomProductionTitle}>
                                Kho hàng
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={AppStyle.InventoryManagementScreenStyle.titleView}>
                        <Text style={AppStyle.InventoryManagementScreenStyle.titleTextStyle}>
                            Thống kê bán hàng
                        </Text>
                    </View>

                    {/*
                    <View style={AppStyle.InventoryManagementScreenStyle.buttomStatisticalView}>
                        <TouchableOpacity 
                        onPress={() => navigation.navigate('Demo')}
                        style={AppStyle.InventoryManagementScreenStyle.buttomStatisticalStyle} accessible={false}>
                            <View style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaTitleView}>
                                <Text style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaTitleText}>
                                    Ngày
                                </Text>
                            </View>
                            <View style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaInfoView}>
                                <Text style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaInfoText}>
                                    Đã bán:
                                </Text>
                                <Text style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaInfoText}>
                                    Doanh thu:
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={AppStyle.InventoryManagementScreenStyle.buttomStatisticalStyle} accessible={false}>
                            <View style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaTitleView}>
                                <Text style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaTitleText}>
                                    Tuần
                                </Text>
                            </View>
                            <View style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaInfoView}>
                                <Text style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaInfoText}>
                                    Đã bán:
                                </Text>
                                <Text style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaInfoText}>
                                    Doanh thu:
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={AppStyle.InventoryManagementScreenStyle.buttomStatisticalView}>
                        <TouchableOpacity style={AppStyle.InventoryManagementScreenStyle.buttomStatisticalStyle} accessible={false}>
                            <View style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaTitleView}>
                                <Text style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaTitleText}>
                                    Tháng
                                </Text>
                            </View>
                            <View style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaInfoView}>
                                <Text style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaInfoText}>
                                    Đã bán: 30 sp
                                </Text>
                                <Text style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaInfoText}>
                                    Doanh thu:
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={AppStyle.InventoryManagementScreenStyle.buttomStatisticalStyle} accessible={false}>
                            <View style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaTitleView}>
                                <Text style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaTitleText}>
                                    Năm
                                </Text>
                            </View>
                            <View style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaInfoView}>
                                <Text style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaInfoText}>
                                    Đã bán:
                                </Text>
                                <Text style={AppStyle.InventoryManagementScreenStyle.buttomStatisticaInfoText}>
                                    Doanh thu:
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    */}
                    <DataAnalysis />
                    <DataAnalysisMonth/>
                    <SuccessfulOrderRate/>
                </View>
            </ScrollView>
        </View>
    )
}
