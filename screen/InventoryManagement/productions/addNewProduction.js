import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Alert, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "../../../config/firebase";
import { getAuth } from "firebase/auth";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import AppStyle from "../../../theme";
import Icons from "../../../assest";
import Loading from "../../../component/loading";
import { useNavigation } from "@react-navigation/native";

export default function AddNewProduction() {
    const navigation = useNavigation();
    const [productInfo, setProductInfo] = useState({
        cost: '',
        productCode: '',
        name: '',
        price: '',
        priceSale: '',
        evaluate: 5,
        description: '',
        images: [], // đường dẫn tương đối từ storage
        promotionStatus: 1
    });
    const [isLoading, setIsLoading] = useState(false);

    const addNewProduction = async () => {
        try {
            setIsLoading(true); // Hiển thị Loading khi bắt đầu thêm sản phẩm mới
    
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) {
                console.error('Người dùng chưa đăng nhập!');
                setIsLoading(false);
                return;
            }
            const userId = user.uid;
    
            // Kiểm tra các trường bắt buộc
            if (!productInfo.name || !productInfo.price || !productInfo.description) {
                Alert.alert('Thông báo !', 'Vui lòng nhập đầy đủ thông tin trước khi tạo sản phẩm');
                setIsLoading(false);
                return;
            }
    
            console.log('Thông tin sản phẩm:', productInfo); // In ra thông tin sản phẩm
    
            // Tải ảnh lên Storage và nhận đường dẫn tương đối
            const images = await Promise.all(
                productInfo.images.map(async (image) => {
                    const downloadURL = await uploadImageToStorage(image.uri, image, await user.getIdToken());
                    console.log('Đường dẫn tương đối của ảnh:', downloadURL);
                    return downloadURL;
                })
            );
    
            // Thêm đường dẫn tương đối vào productInfo
            const updatedProductInfo = { ...productInfo, images };
    
            // Thêm sản phẩm vào Firestore
            await addProductionToFirestore(userId, updatedProductInfo);
    
            // Thông báo thành công
            Alert.alert('Thông báo', 'Đã thêm sản phẩm vào kho hàng');
    
            // Reset các trường nhập liệu
            resetProductInfo();
    
            // Kết thúc hiển thị loading sau khi tải dữ liệu lên thành công
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false); // Ẩn Loading nếu có lỗi xảy ra
            console.error('Lỗi khi thêm sản phẩm vào Firestore:', error);
            // Thông báo lỗi
            Alert.alert('Error', 'Failed to add product');
        }
    };
    
    const addProductionToFirestore = async (userId, productInfo) => {
        try {
            const productionInfoCollection = collection(db, 'AllProduction');

            // Kiểm tra các trường bắt buộc trước khi thêm vào Firestore
            if (!productInfo.name || !productInfo.price || !productInfo.description) {
                throw new Error('Thông tin sản phẩm không đầy đủ');
            }

            // Loại bỏ bất kỳ trường nào có giá trị là undefined
            Object.keys(productInfo).forEach(key => {
                if (productInfo[key] === undefined) {
                    delete productInfo[key];
                }
            });

            // Thêm sản phẩm vào Firestore
            await addDoc(productionInfoCollection, {
                userId: userId,
                ...productInfo,
                createdAt: serverTimestamp(),
                userRole: 2
            });
            console.log('Đã thêm sản phẩm vào Firestore thành công!');
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm vào Firestore:', error);
            throw error;
        }
    };


    const uploadImageToStorage = async (uri, image, authToken) => {
        try {
            const filename = `image_${Date.now()}.jpg`;
            const formData = new FormData();
            formData.append('file', {
                uri: image.uri,
                name: filename,
                type: 'image/jpeg',
            });

            const response = await fetch(
                `https://firebasestorage.googleapis.com/v0/b/nishop-de3c5.appspot.com/o?name=${filename}`,
                {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            // Lấy đường dẫn URL từ phản hồi
            const downloadURL = `https://firebasestorage.googleapis.com/v0/b/nishop-de3c5.appspot.com/o/${filename}?alt=media`;
            console.log('1 Đường dẫn tương đối của ảnh:', downloadURL);

            // Trả về đường dẫn tương đối của ảnh
            return downloadURL;
        } catch (error) {
            console.error('Error uploading image to Firebase Storage:', error);
            throw error;
        }
    };



    const selectImage = () => {
        Alert.alert(
            'Ảnh cho sản phẩm',
            'Bạn có thể sử dụng một trong hai',
            [
                {
                    text: 'Camera',
                    onPress: () => launchCameraHandler()
                },
                {
                    text: 'Thư viện',
                    onPress: () => launchImageLibraryHandler()
                },
                {
                    text: 'Đóng',
                    style: 'cancel'
                }
            ]
        );
    };

    const launchCameraHandler = () => {
        launchCamera({}, response => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else if (response.assets) {
                const selectedImages = response.assets.map(asset => ({ uri: asset.uri }));
                setProductInfo({ ...productInfo, images: [...productInfo.images, ...selectedImages] });
            }
        });
    };

    const launchImageLibraryHandler = () => {
        const options = {
            mediaType: 'photo',
            selectionLimit: 7
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets) {
                const selectedImages = response.assets.map(asset => ({ uri: asset.uri }));
                setProductInfo({ ...productInfo, images: [...productInfo.images, ...selectedImages] });
            }
        });
    };

    const handleInputChange = (field, value) => {
        setProductInfo({ ...productInfo, [field]: value });
    };

    const removeImage = (indexToRemove) => {
        const updatedImages = [...productInfo.images];
        updatedImages.splice(indexToRemove, 1);
        setProductInfo({ ...productInfo, images: updatedImages });
    };

    const resetProductInfo = () => {
        setProductInfo({
            cost: '',
            productCode: '',
            name: '',
            price: '',
            priceSale: '',
            evaluate: 5,
            description: '',
            images: [],
            promotionStatus: 1
        });
    };

    return (
        <View style={AppStyle.AddNewProductionStyle.container}>
            <View style={AppStyle.AddNewProductionStyle.tabView}>
                <TouchableOpacity
                    style={AppStyle.AddNewProductionStyle.goBackButtomView}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={Icons.GoBackIcon}
                        style={AppStyle.AddNewProductionStyle.goBackIcon}
                        tintColor={"#A9A9A9"}
                    />
                </TouchableOpacity>
                <View
                    style={AppStyle.AddNewProductionStyle.tabTitleView}
                >
                    <Text
                        style={AppStyle.AddNewProductionStyle.tabTitleStyle}
                    >
                        Thông tin sản phẩm
                    </Text>

                </View>
                <TouchableOpacity
                    style={AppStyle.AddNewProductionStyle.goBackButtomView}
                    onPress={addNewProduction}
                >
                    <Text
                        style={AppStyle.AddNewProductionStyle.tabTitleSaveStyle}
                    >Lưu</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={AppStyle.AddNewProductionStyle.bodyView}>
                    <Text
                        style={AppStyle.AddNewProductionStyle.bodyTitleStyle}
                    >Mã sản phẩm:</Text>
                    <TextInput
                        onChangeText={(text) => handleInputChange("productCode", text)}
                        value={productInfo.productCode}
                        style={AppStyle.AddNewProductionStyle.textInputStyle}
                    />

                    <Text
                        style={AppStyle.AddNewProductionStyle.bodyTitleStyle}
                    >Tên sản phẩm:</Text>
                    <TextInput
                        onChangeText={(text) => handleInputChange("name", text)}
                        value={productInfo.name}
                        style={AppStyle.AddNewProductionStyle.textInputStyle}
                    />
                    <Text
                        style={AppStyle.AddNewProductionStyle.bodyTitleStyle}
                    >Giới thiệu sản phẩm:</Text>
                    <TextInput
                        onChangeText={(text) => handleInputChange("description", text)}
                        value={productInfo.description}
                        multiline
                        style={AppStyle.AddNewProductionStyle.descriptionView}
                    />
                    <Text
                        style={AppStyle.AddNewProductionStyle.bodyTitleStyle}
                    >Giá gốc:</Text>
                    <TextInput
                        onChangeText={(text) => handleInputChange("cost", text)}
                        value={productInfo.cost}
                        keyboardType="numeric"
                        style={AppStyle.AddNewProductionStyle.textInputStyle}
                    />

                    <Text
                        style={AppStyle.AddNewProductionStyle.bodyTitleStyle}
                    >Giá bán:</Text>
                    <TextInput
                        onChangeText={(text) => handleInputChange("price", text)}
                        value={productInfo.price}
                        keyboardType="numeric"
                        style={AppStyle.AddNewProductionStyle.textInputStyle}
                    />

                    <Text
                        style={AppStyle.AddNewProductionStyle.bodyTitleStyle}
                    >Giá khuyến mãi:</Text>
                    <TextInput
                        onChangeText={(text) => handleInputChange("priceSale", text)}
                        value={productInfo.priceSale}
                        keyboardType="numeric"
                        style={AppStyle.AddNewProductionStyle.textInputStyle}
                    />

                    {isLoading && <Loading />}

                    <TouchableOpacity
                        onPress={selectImage}
                        style={AppStyle.AddNewProductionStyle.selectImageButtomView}
                    >
                        <Text
                            style={AppStyle.AddNewProductionStyle.selectImageButtomText}
                        >
                            Hình ảnh sản phẩm
                        </Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'column' }}>
                        {productInfo.images.map((image, index) => (
                            <View key={index} style={{ flexDirection: 'row', marginBottom: 10 }}>
                                {productInfo.images.slice(index * 3, (index + 1) * 3).map((img, idx) => (
                                    <View key={idx} style={{ flex: 1, paddingHorizontal: 5 }}>
                                        <Image
                                            source={{ uri: img.uri }}
                                            style={{ width: '100%', aspectRatio: 1 }} // Đảm bảo tỉ lệ khung hình luôn bằng 1:1
                                        />
                                        <TouchableOpacity
                                            style={AppStyle.AddNewProductionStyle.removeImageButtom}
                                            onPress={() => removeImage(index * 3 + idx)}
                                        >
                                            <Text style={AppStyle.AddNewProductionStyle.removeImageButtomText}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
