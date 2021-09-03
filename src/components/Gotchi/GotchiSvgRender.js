export default { 
    async getSvg(hauntId, collateralAddress, numericTraits, equippedWearables, Moralis) {
        let result = await Moralis.Cloud.run("getSVG",{hauntId, collateralAddress, numericTraits:numericTraits,equippedWearables:equippedWearables});

        return `data:image/svg+xml;utf8,${encodeURIComponent(result)}`;
    }
}