import React from 'react';
import success from "@/css/fawu/success.less"
import Footer from "@/Components/Footer"

export default class Fawusuc extends React.Component{
    constructor(){
        super()
        this.state={}
    }
    render(){
        return <div className={success.layout}>
            <img src={require("@/assets/images/lian.png")} alt=""/>
            <p>支付/兑换成功</p>
            <div className={success.btn}>
                <button className={success.btn1} onClick={()=>this.gobless()}>再逛逛</button>
                <button className={success.btn2} onClick={()=>this.gocheck()}>查订单</button>
            </div>
            <Footer></Footer>
        </div>
    }
    gobless=()=>{
        this.props.history.push('/fawu')
    }
    gocheck=()=>{
        this.props.history.push('/about/jieyuan')
    }
}