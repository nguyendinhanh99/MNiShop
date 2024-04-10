const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
};

export default formatPrice