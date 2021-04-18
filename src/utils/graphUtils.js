// eslint-disable-next-line import/no-anonymous-default-export
export default {
    sortGotchies(array, sortType) {
        // Possible sortType values: id, baseRarityScore, modifiedRarityScore, kinship, experience
        return [...array].sort((a, b) => b[sortType] - a[sortType]);
    },

    calculateRewards(position, type) {
        const RSCformula = {y: 0.97, k: 95338.67};
        const KINformula = {y: 0.76, k: 9800.93};
        const EXPformula = {y: 0.65, k: 2592.58};

        if(position > 5000) {
            return 0;
        }

        switch(type) {
            case 'RSC':
                return +((Math.pow(1 / position, RSCformula.y)) * RSCformula.k).toFixed(0);
            case 'KIN':
                return +((Math.pow(1 / position, KINformula.y)) * KINformula.k).toFixed(0);
            case 'EXP':
                return +((Math.pow(1 / position, EXPformula.y)) * EXPformula.k).toFixed(0);
            default:
                return 0;
        }
    }
}