// eslint-disable-next-line import/no-anonymous-default-export
export default {
    formatNumber(number) {
        return number.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1'");
    },

    trimPriceToThreeDecimal(price) {
        if (price % 1 === 0) {
            return price;
        } else {
            let cachedPrice = price.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0];

            while (cachedPrice.charAt(cachedPrice.length-1) === '0') {
                cachedPrice = cachedPrice.substring(0, cachedPrice.length - 1);
            }

            return parseFloat(cachedPrice);
        }
    },

    formatNumberWithCommas(number) {
        const options = {
            minimumFractionDigits: 0,
            maximumFractionDigits: 3
        };

        return Number(number).toLocaleString('en', options);
    }
}