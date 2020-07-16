import React from 'react';
import { Icon } from 'antd';
import accountcss from "@/css/fawu/fawuaccount.less"
import Footer from "@/Components/Footer"

export default class Fawuaccount extends React.Component {
    constructor() {
        super()
        this.state = {
            num:1,
            min:1,
            address:{},
            goods:{},
            liuyan:''
        }
    }
    render() {
        let address=this.state.address
        let goods=this.state.goods
        return <div className={accountcss.layout}>
             <div className={accountcss.address} onClick={()=>this.goaddress()}>
                <img src={require('@/assets/images/dw.gif')} alt="" />
                <div className={accountcss.info}>
                    <p>
                        <span>收货人：{address.consignee}</span>
                        <span>{address.mobile}</span>
                    </p>
                    <p>
                        苏{address.province}{address.city}{address.district} {address.address}
                    </p>
                </div>
                <Icon type="right" />
            </div>
            <div className={accountcss.yun}>
                <span>运费</span>
                <div className={accountcss.fangshi}>
                    <div>
                        <input type="radio" name="yun" defaultChecked={true}/> 自取
                    </div>
                    <div>
                        <input type="radio" name="yun" ref='daofu' onChange={()=>this.change()}/> 到付
                    </div>
                </div>
            </div>
            <div className={accountcss.goods}>
                <div className={accountcss.iconbig}>
                    <Icon type="check-circle" theme="filled"/>
                </div>
                <img src={goods.original_img} alt=""/>
                <div className={accountcss.right}>
                    <p>
                        {goods.goods_name}
                    </p>
                    <span className={accountcss.price}>￥{goods.shop_price}</span>
                    <div className={accountcss.num}>
                        <span onClick={()=>this.jian()}>-</span>
                        <input type="number" value={this.state.num} onChange={()=>this.change()} ref='num'/>
                        <span onClick={()=>this.add()}>+</span>
                    </div>
                </div>
            </div>
            <div className={accountcss.xi}>
                <span>随喜</span>
                <span>￥{goods.shop_price}</span>
            </div>
            <div className={accountcss.content}>
                <textarea placeholder="说点什么吧~~" ref='liuyan' onChange={()=>this.change()}></textarea>
                    <input type="checkbox" ref='niming'/> <span>匿名随喜</span>
                </div>
            <div className={accountcss.dui}>
                <div className={accountcss.fen}>
                    随喜：
                    <span>￥{goods.price}</span>
                </div>
                <button onClick={()=>{this.gosuccese()}}>微信支付</button>
            </div>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){
        this.getAddress()
        this.getList(1)
    }
    getAddress=()=>{
        this.$http.post('/Cart/getAddress',{address_id:''}).then(res=>{
            const data=res.data.result.address
            this.setState({
                address:data
            })
            // console.log(data);           
        })
    }
    getList=(num)=>{       
        this.$http('/Cart/OrderPage/?id='+this.props.match.params.id+'&goods_num='+num).then(res=>{
            const data=res.data.result.goods
            this.setState({
                goods:data
            })
            // console.log(data);            
        })
    }
    change=()=>{
        this.setState({
            num:this.refs.num.value,
            liuyan:this.refs.liuyan.value
        })
    }
    jian=()=>{
        if(this.state.num<=1) return
        this.setState({
            num:this.state.num-1
        },function(){
            this.getList(this.state.num)
        })
    }
    add=()=>{
        this.setState({
            num:this.state.num+1
        },function(){
            this.getList(this.state.num)
        })
    }
    goaddress=()=>{
        this.props.history.push('/about/address')
    }
    gosuccese=()=>{
        let is_invite=0
        if(this.refs.daofu.checked){
            is_invite=1
        } 

        let is_show_note
        if(this.refs.niming.checked){
            is_show_note=0
        }else{
            is_show_note=1
        }
        const opt={
            goods_id:this.props.match.params.id,
            goods_num:this.state.num,
            order_amount:this.state.goods.price,
            is_invite:is_invite, //0自取 1到付
            integral:0,
            share_integral:0,
            user_note:this.state.liuyan,
            address_id:this.state.address.address_id,
            is_show_note:is_show_note
        }
        // console.log(opt);       
        this.$http.post('/Cart/upOrder',opt).then(res=>{
            const orderId=res.data.result
            this.$http.post('/PayWay/pay',{orderId:orderId,amount:this.state.goods.price,type:2}).then(res=>{
                console.log(res);
                
            })
            // this.props.history.push('/fawu/detail/account/success')                    
        })              
    }
}