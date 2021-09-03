export default { 
    async getSvg(gotchies, Moralis) {
        console.log(gotchies);
        let result = await Moralis.Cloud.run("getSVG",{gotchies});

        return result.map((item) => {
            return `data:image/svg+xml;utf8,${encodeURIComponent(item)}`;
        })
    }
}