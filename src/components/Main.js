import React, { Component } from "react";
import FarmerHomepage from "../Pages/FarmerHomepage";
import InspectorHomepage from "../Pages/InspectorHomepage";
import CertifierHomepage from "../Pages/CertifierHomepage";


class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: false,
            role: ''
        }
        this.getLoginDetails();

    }
    render() {
        console.log(this.props.account)
        console.log(this.state.isLoggedIn);
        if (this.state.isLoggedIn) {
            if (this.state.role === 'Farmer')
                return <FarmerHomepage account={this.props.account} />
            else if (this.state.role === 'Inspector')
                return <InspectorHomepage account={this.props.account} />
            else if (this.state.role === 'Certifier')
                return <CertifierHomepage account={this.props.account} />

        }

        else {
            return (
                <div id="content" className="mt-3">
                    <div className="card ">
                        <div className="card-body">
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    let UName = this.uname.value.toString()
                                    console.log(UName)
                                    let Role = this.role.value.toString()
                                    console.log(Role)
                                    this.saveUser(UName, Role);
                                }}
                                className="mb-3">
                                <h5 className="card-title">Signup</h5>
                                <div className="form-floating mb-3">
                                    <input
                                        ref={(uname) => { this.uname = uname }} type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">UserName</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        ref={(metamaskaddress) => { this.metamaskaddress = metamaskaddress }}
                                        type="text" className="form-control" id="floatingPassword" placeholder="Password" value={this.props.account} disabled />
                                    <label htmlFor="floatingPassword">Metamask Address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select ref={(role) => { this.role = role }} className="form-select" id="floatingSelect" aria-label="Floating label select example">
                                        <option defaultValue>--Select--</option>
                                        <option value="Farmer">Farmer</option>
                                        <option value="Inspector">Inspector</option>
                                        <option value="Certifier">Certifier</option>
                                    </select>
                                    <label htmlFor="floatingSelect">Select User Role</label>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button className="btn btn-outline-primary me-md-2" type="submit">Signup</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            );
        }

    }
    //function to get user login details(user role)
    async getLoginDetails() {
        console.log(this.props.signup)
        let loginData = await this.props.signup.methods.userRole(this.props.account).call();
        console.log('loginData')
        console.log(loginData)

        if (loginData) {
            this.setState({ isLoggedIn: true });
            this.setState({ role: loginData });

            console.log('logging in')

        }

    }
    //Registration function- User details saved to BC
    saveUser = (UName, Role) => {
        this.setState({ loading: true });
        console.log(this)
        this.props.signup.methods.savesignup(this.props.account, UName, Role).send({ from: this.props.account }).on('transactionHash', (hash) => {
            console.log(hash)
            window.location.reload(false)
        });


    }


}
export default Main;