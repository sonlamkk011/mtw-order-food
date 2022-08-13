
const formatterVND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});
export const formatCurrencyToVND = (number) => {
    return formatterVND.format(number);
};