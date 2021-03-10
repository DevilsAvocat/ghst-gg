export const paramsToUrlString = (params) => {
    let str = "";

    for (let key in params) {
        if (str !== "") {
            str += "&";
        }
        if (params[key] instanceof Array) {
            for (let i = 0; i < params[key].length; i++) {
                if (str !== "") {
                    str += "&";
                }
                str += key + "=" + encodeURIComponent(params[key][i]);
            }
        } else {
            str += key + "=" + encodeURIComponent(params[key]);
        }
    }

    return str;
};
