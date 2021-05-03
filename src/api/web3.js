import Web3 from 'web3';
import Constants from './common/constants';

const web3 = new Web3(Constants.RPC_URL);
const contract = new web3.eth.Contract(Constants.ABI, Constants.TOKEN_ADDRESS);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async getInventoryByAddresses(addressesArray) {
        try {
            let responseArray = [];

            for (let i = 0; i < addressesArray.length; i++) {
                await contract.methods.itemBalances(addressesArray[i]).call()
                    .then((response) => {
                        responseArray.push({items: response, owner: addressesArray[i]});
                    });
            }

            return responseArray;
        } catch (error) {
            return [];
        }
    },

    isAddressValid(address) {
        return Web3.utils.isAddress(address);
    }
}