import React from 'react';
import { Icon } from 'antd';
import accountcss from "@/css/bless/blessaccount.less"
import Footer from "@/Components/Footer"

export default class Blessaccount extends React.Component {
    constructor() {
        super()
        this.state = {
            small1: true,
            small2: false,
            small3: false,
            num:1,
            min:1,
            address:{},
            goods:{},
            fu:0,
            shan:0,
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
                    <span className={accountcss.price}>￥{goods.exchange_integral}</span>
                    <div className={accountcss.num}>
                        <span onClick={()=>this.jian()}>-</span>
                        <input type="number" value={this.state.num} onChange={()=>this.change()} ref='num'/>
                        <span onClick={()=>this.add()}>+</span>
                    </div>
                </div>
            </div>
            <ul className={accountcss.list}>
                <li>
                    <div className={accountcss.iconsmall}  onClick={()=>this.small1()}>
                        <p>
                            {this.state.small1 ? <Icon type="check-circle" theme="filled" /> : ''}
                        </p>
                        <span>福德兑换</span>
                    </div>
                    <span>{goods.integral_price}</span>
                </li>
                <li>
                    <div className={accountcss.iconsmall}  onClick={()=>this.small2()}>
                        <p>
                            {this.state.small2 ? <Icon type="check-circle" theme="filled" /> : ''}
                        </p>  
                        <span>善缘兑换</span>
                    </div>
                    <span>{goods.integral_price}</span>
                </li>
                <li>
                    <div className={accountcss.iconsmall}  onClick={()=>this.small3()}>
                        <p>
                            {this.state.small3 ? <Icon type="check-circle" theme="filled" /> : ''}
                        </p>
                        <span>福善兑换</span>
                    </div>
                    <div className={accountcss.into}>
                        <div>
                            <img src={require('@/assets/images/goodsfu.gif')} alt=""/>
                            <input type="text" placeholder="单行输入" ref='fu' onChange={()=>this.change()}/>
                        </div>
                        <div>
                            <img src={require('@/assets/images/shan.png')} alt=""/>
                            <input type="text" placeholder="单行输入" ref='shan' onChange={()=>this.change()}/>
                        </div>
                    </div>
                </li>
            </ul>
            <div  className={accountcss.content}>
                <textarea placeholder="说点什么吧~~" ref='liuyan' onChange={()=>this.change()}></textarea>
                <input type="checkbox" ref='niming'/> <span>隐藏留言</span>
            </div>
            <div className={accountcss.dui}>
                {this.state.small1 ?
                <div className={accountcss.fen}>
                    福德：<span>{goods.integral_price}</span>
                    善缘：<span>0</span>
                </div> : ''}
                {this.state.small2 ?
                <div className={accountcss.fen}>
                    福德：<span>0</span>
                    善缘：<span>{goods.integral_price}</span>
                </div> : ''}
                {this.state.small3 ?
                <div className={accountcss.fen}>
                    福德：<span>{this.state.fu}</span>
                    善缘：<span>{this.state.shan}</span>
                </div> : ''}
                <button onClick={()=>{this.gosuccese()}}>积分兑换</button>
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
            fu:this.refs.fu.value,
            shan:this.refs.shan.value,
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
        
        let integral
        let share_integral
        if(this.state.small1){
            integral=this.state.goods.integral_price
            share_integral=0
        }else if(this.state.small2){
            integral=0
            share_integral=this.state.goods.integral_price
        }else if(this.state.small3){
            integral=this.state.fu
            share_integral=this.state.shan
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
            order_amount:0,
            is_invite:is_invite, //自取
            integral:integral,
            share_integral:share_integral,
            user_note:this.state.liuyan,
            address_id:this.state.address.address_id,
            is_show_note:is_show_note
        }
        // console.log(opt);       
        this.$http.post('/Cart/upOrder',opt).then(res=>{
            this.props.history.push('/bless/detail/account/success')                     
        })       
    }
    // all=()=>{
    //     this.setState({
    //         big: !this.state.big
    //     })
    // }
    small1=()=>{
        this.setState({
            small1: true,
            small2: false,
            small3: false
        })
    }
    small2=()=>{
        this.setState({
            small1: false,
            small2: true,
            small3: false
        })
    }
    small3=()=>{
        this.setState({
            small1: false,
            small2: false,
            small3: true
        })
    }
}