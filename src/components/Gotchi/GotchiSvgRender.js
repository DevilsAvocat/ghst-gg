export default { 
    async getSvg(numericTraits, equippedWearables, Moralis) {
        // useEffect(() => {
        //     if(isInitialized) {
        //         getSvg().then(result => {
        //             setSvg(result);
        //             console.log(encodeURIComponent(result));
        //             setIsLoaded(false);
        //         }, error => {console.log('error')});
        //     }
        // }, []);

        // const numericTraits = [30, 5, 50, 29, 80, 5];
        // const equippedWearables = [160, 216, 202, 161, 122, 122, 237, 210, 0, 0, 0, 0, 0, 0, 0, 0];

        let result = await Moralis.Cloud.run("getSVG",{numericTraits:numericTraits,equippedWearables:equippedWearables});

        console.log(result);
        // const htmlToElements = (html) => {
        //     var template = document.createElement('template');
        //     template.innerHTML = html;
        //     return template.content.childNodes[0];
        // }

        
        // if(!svg) return null;
        return `data:image/svg+xml;utf8,${encodeURIComponent(result)}`;
    }
}