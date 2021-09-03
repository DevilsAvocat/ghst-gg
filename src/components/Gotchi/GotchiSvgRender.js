export default { 
    async getSvg(gotchies, Moralis) {
        let result = await Moralis.Cloud.run("getSVG",{gotchies});

        return result.map((item) => {
            return `data:image/svg+xml;utf8,${encodeURIComponent(item)}`;
        })
    }
}