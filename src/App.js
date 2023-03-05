import { Component } from "react";

import Navbar from "./components/Navbar";
import Main from "./components/Main";

import './App.css'
import Web3 from 'web3';

import UserSignup from './truffle_abis/UserSignup.json'

class App extends Component {
    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()

    }
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('No ethereum browser detected ! You can checkout Metamask')
        }
    }
    async loadBlockchainData() {
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        this.setState({ account: account[0] })
        const networkId = await web3.eth.net.getId()
        console.log(networkId, 'Network ID')

        //Load userSignup Contract
        const userSignupData = UserSignup.networks[networkId]
        if (userSignupData) {
            const signup = new web3.eth.Contract(UserSignup.abi, userSignupData.address)
            this.setState({ signup })
            console.log(signup)
        }
        else {
            window.alert('UserSignup contract not deployed - no detected network')
        }


        this.setState({ loading: false });

    }

    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            signup: {},
            userSignupBalance: '0',
            application: {},
            loading: true,
        }
    }
    render() {
        let content

        {
            this.state.loading
                ? content = <p id='loader' className="text-center" style={{ margin: '30px' }}>
                    LOADING PLEASE...
                </p>
                :
                content = <Main account={this.state.account} signup={this.state.signup} />
        }
        return (
            <div className="App">

                <Navbar account={this.state.account} />
                <div className="container-fluid mt-5">
                    <div className="row ">
                        <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px', minHeight: '100vm' }}>
                            <div className="position-absolute top-50 start-50 translate-middle">
                                {content}
                            </div>
                        </main>
                    </div>
                </div>


            </div >
        )
    }

}

export default App;