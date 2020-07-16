import React from 'react';
import { Route, Link, Redirect } from "react-router-dom"
import { Icon } from 'antd'
import Comswipe from "@/components/swiper/Comswipe"
import detailcss from "@/css/fawu/fawudetail.less"
import Fawushan from "@/components/fawu/Fawushan"
import Goodsdetail from "@/components/goods/Goodsdetail"
import Footer from "@/Components/Footer"

export default class Fawudetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow1:true,
            isShow2:false,
            id:props.match.params.id,
            msg:{},
            gallery:[]
        }
    }
    render() {
        return <div className={detailcss.layout}>
            <Comswipe img={this.state.gallery}></Comswipe>
            <div className={detailcss.bless}>
                <span>{this.state.msg.goods_name}</span>
                <p>
                    <span>￥{this.state.msg.shop_price}</span>
                </p>
            </div>
            <div className={detailcss.content} dangerouslySetInnerHTML={{__html:this.state.msg.goods_remark}}>
            
            </div>
            <div className={detailcss.detail}>
                <a className={this.state.isShow1 ? detailcss.active : ''} onClick={()=>this.change1()}>详情</a>
                <a className={this.state.isShow2 ? detailcss.active : ''} onClick={()=>this.change2()}>善缘</a>
            </div>
            <Route path="/fawu/detail/:id/blessdetatil" component={Goodsdetail} exact/>
            <Route path="/fawu/detail/:id/shan" component={Fawushan} exact/>
            <div className={detailcss.huan}>
                <div className={detailcss.xin} onClick={()=>this.collect()}>
                    {this.state.msg.is_collect==1?
                        <Icon type="heart" theme="filled" twoToneColor="#A0261B" style={{padding: 0}}/>:
                        <Icon type="heart" style={{padding: 0}}/>
                    }
                    <p>收藏</p>
                </div>
                <button onClick={()=>this.goaccount()}>微信支付结缘</button>
            </div>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){
        this.change1()
        this.getmsg()
    }
    collect=()=>{
        const type=this.state.msg.is_collect
        const opt={
            goods_id:this.state.id,
            type:type
        }
        
        this.$http.post('/Goods/collectGoods',opt).then(res=>{
            // console.log(res);               
            this.getmsg()               
        })
    }
    getmsg=()=>{
        let id=this.state.id
        let user_id=localStorage.getItem('user_id')||''
        this.$http('/Goods/goodsInfo/?id='+id+'&&user_id='+user_id).then(res=>{
            // console.log(res);   
            let data=res.data.result.goods
            let arr=res.data.result.gallery
            this.setState({
                msg:data,
                gallery:arr
            })        
        }) 
    }
    goaccount=()=>{
        this.props.history.push(`/fawu/detail/${this.state.id}/account`)
    }
    change1=()=>{
        this.props.history.push(`/fawu/detail/${this.state.id}/blessdetatil`)
        this.setState({
            isShow1:true,
            isShow2:false
        })
    }
    change2=()=>{
        this.props.history.push(`/fawu/detail/${this.state.id}/shan`)
        this.setState({
            isShow1:false,
            isShow2:true,
        })
    }
}