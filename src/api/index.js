export default class ApiService {
    static async fetchAddressInfo(address) {
        const url = `http://jobcoin.gemini.com/reflux-shorter/api/addresses/${address}`
        try {
            let res = await fetch(url)
            let json = await res.json()
            return json
        } catch (e) {
            return Error(e)
        }
    }
    
    static async fetchTransactionHistory() {
        const url = "http://jobcoin.gemini.com/reflux-shorter/api/transactions"
        try {
            let res = await fetch(url)
            let json = await res.json()
            return json
        } catch (e) {
            return Error(e)
        }
    }

    static async sendJobcoin(params) {
        const {userAddress, recipientAddress, quantity} = params
        const body = {
            fromAddress: userAddress,
            toAddress: recipientAddress,
            amount: quantity
        }
        const url = "http://jobcoin.gemini.com/reflux-shorter/api/transactions"
        const config = {
            mode: 'cors',
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }
        try {
            let res = await fetch(url, config)
            let json = await res.json()
            return json
        } catch (e) {
            return e
        }
    }
}