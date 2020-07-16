import React from 'react'
import goodscss from "@/css/goods/goods.less"
import Footer from "@/Components/Footer"

export default class Collect extends React.Component{
    constructor(){
        super()
        this.state={
            msg:[]
        }
    }
    render(){
        return <div className={goodscss.layout} style={{borderTop: '0.5vw solid #BFA76B'}}>
            <ul className={goodscss.goodslist}>
                {this.state.msg&&this.state.msg.map((v,i)=>
                <li key={i} onClick={()=>{this.godetail(v.goods_id)}}>
                    <img src={v.original_img} alt="" className={goodscss.goods} />
                    <div>
                        <span>{v.goods_name}</span>
                        {v.is_real==0?<p>
                            <img src={require('@/assets/images/goodsfu.gif')} alt="" />
                            <span>{v.exchange_integral}</span>
                        </p>:
                        <p>
                        <span>￥{v.shop_price}</span>
                        </p>}
                    </div>
                </li>
                )}
            </ul>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){
        this.$http.post('/User/collect',{p:1}).then(res=>{            
            let data=res.data.result
            // console.log(data);
            this.setState({
                msg:data
            })
        })
    }
    godetail=(id)=>{
        this.props.history.push('/bless/detail/'+id)
    }
}