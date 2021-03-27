export const formatNumber = (number) => {
    return number.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1'");
};