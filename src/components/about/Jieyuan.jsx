import React from 'react'

import { Link, Route, Redirect } from 'react-router-dom'
import jieyuan from '@/css/about/jieyuan.less'
import Dingdan from '@/Components/about/Dingdan'
import Shouhuo from '@/Components/about/Shouhuo'
import Done from '@/Components/about/Done'
import Footer from "@/Components/Footer"

export default class Jieyuan extends React.Component{
    constructor(){
        super()
        this.state={
            isClick1: true,
            isClick2: false,
            isClick3: false,
            msg:{}
        }
    }
    render(){
        return <div className={jieyuan.layout}>
            <div className={jieyuan.send}>
                <a className={this.state.isClick1?jieyuan.active:''} onClick={()=>this.one()}>
                    {this.state.msg.collect_count=='0'?'':<span>{this.state.msg.collect_count}</span>}
                    待发货
                </a>
                <a className={this.state.isClick2?jieyuan.active:''} onClick={()=>this.two()}>
                    {this.state.msg.delivery_count==0?'':<span>{this.state.msg.delivery_count}</span>}
                    待收货
                </a>
                <a className={this.state.isClick3?jieyuan.active:''} onClick={()=>this.three()}>已完成</a>
            </div>

            <Route path='/about/jieyuan' render={() => <Redirect to='/about/jieyuan/send' />} exact />
            <Route path="/about/jieyuan/send" component={Dingdan} exact />
            <Route path="/about/jieyuan/got" component={Shouhuo} exact />
            <Route path="/about/jieyuan/done" component={Done} exact />
            <Footer></Footer>
        </div>
    }
    componentWillMount(){
        this.$http.post('/User/getOrderList',{p:1,order_status:1}).then(res=>{
            const data=res.data.result
            this.setState({
                msg:data
            })
            // console.log(data);            
        })
    }
    one = () =>{  
        this.setState({
            isClick1: true,
            isClick2: false,
            isClick3: false
        })
        this.props.history.push("/about/jieyuan/send")
    }
    two = () => {
        this.setState({
            isClick1: false,
            isClick2: true,
            isClick3: false
        })
        this.props.history.push("/about/jieyuan/got")
    }
    three = () => { 
        this.setState({
            isClick1: false,
            isClick2: false,
            isClick3: true
        })
        this.props.history.push("/about/jieyuan/done")
    }
}