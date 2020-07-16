import React from 'react'
import { Route, Link, Redirect } from "react-router-dom"
import footer from '@/css/footer.less'

export default class Footer extends React.Component {
    constructor() {
        super()
        this.state = {
            isClick1: true,
            isClick2: true,
            isClick3: true,
            isClick4: true,
            isClick5: true,
        }
    }
    
    render() {        
        return <div className={footer.layout}>
            <footer>
                <ul>
                    <li>
                        <Link to="/home" onClick={() => this.one()}>
                            {this.state.isClick1 ?
                                <div>
                                    <img src={require('@/assets/images/icon1-1.png')} alt="" />
                                    <span style={{ color: "#fff" }}>首页</span>
                                </div> :
                                <div>
                                    <img src={require('@/assets/images/icon1.png')} alt="" />
                                    <span style={{ color: this.state.color1 }}>首页</span>
                                </div>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/practice" onClick={() => this.two()}>
                            {this.state.isClick2 ?
                                <div>
                                    <img src={require('@/assets/images/icon2.png')} alt="" />
                                    <span>修行</span>
                                </div> :
                                <div>
                                    <img src={require('@/assets/images/icon2-2.png')} alt="" />
                                    <span style={{ color: "#fff" }}>修行</span>
                                </div>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/bless" onClick={() => this.three()}>
                            {this.state.isClick3 ?
                                <div>
                                    <img src={require('@/assets/images/icon3.png')} alt="" />
                                    <span>福报</span>
                                </div> :
                                <div>
                                    <img src={require('@/assets/images/icon3-3.png')} alt="" />
                                    <span style={{ color: "#fff" }}>福报</span>
                                </div>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/fawu" onClick={() => this.four()}>
                            {this.state.isClick4 ?
                                <div>
                                    <img src={require('@/assets/images/icon4.png')} alt="" />
                                    <span>法物</span>
                                </div> :
                                <div>
                                    <img src={require('@/assets/images/icon4-4.png')} alt="" />
                                    <span style={{ color: "#fff" }}>法物</span>
                                </div>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={() => this.five()}>
                            {this.state.isClick5 ?
                                <div>
                                    <img src={require('@/assets/images/icon5.png')} alt="" />
                                    <span>我的</span>
                                </div> :
                                <div>
                                    <img src={require('@/assets/images/icon5-5.png')} alt="" />
                                    <span style={{ color: "#fff" }}>我的</span>
                                </div>}
                        </Link>
                    </li>
                </ul>
            </footer>
        </div>
    }
    componentDidMount(){       
       if(location.hash.indexOf('#/home')!=-1){
           this.one()
       }else if(location.hash.indexOf('#/practice')!=-1){
           this.two()
       }else if(location.hash.indexOf('#/bless')!=-1){
           this.three()
       }else if(location.hash.indexOf('#/fawu')!=-1){
           this.four()
       }else if(location.hash.indexOf('#/about')!=-1){
           this.five()
       }        
    }
    one = () =>{  
        this.setState({
            isClick1: true,
            isClick2: true,
            isClick3: true,
            isClick4: true,
            isClick5: true,
        })
    }
    two = () => {
        this.setState({
            isClick1: false,
            isClick2: false,
            isClick3: true,
            isClick4: true,
            isClick5: true,
        })
    }
    three = () => { 
        this.setState({
            isClick1: false,
            isClick2: true,
            isClick3: false,
            isClick4: true,
            isClick5: true,
        })
    }
    four = () => {
        this.setState({
            isClick1: false,
            isClick2: true,
            isClick3: true,
            isClick4: false,
            isClick5: true,
        })
    }
    five = () => {
        this.setState({
            isClick1: false,
            isClick2: true,
            isClick3: true,
            isClick4: true,
            isClick5: false,
        })
    }
}