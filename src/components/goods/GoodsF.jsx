import React from "react"
import goodscss from "@/css/goods/goods.less"
import { Route, Link } from "react-router-dom"

class GoodsF extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            goodslist:[]
        }
    }
    render() {
        return <div>
            <ul className={goodscss.goodslist}>
                {this.state.goodslist&&this.state.goodslist.map((item,i)=>
                    <li key={i} onClick={()=>{this.godetail(item.goods_id)}}>
                        <img src={item.original_img} alt="" className={goodscss.goods} />
                        <div>
                            <span>{item.goods_name}</span>
                            <p>
                                <span>￥{item.shop_price}</span>
                            </p>
                        </div>
                    </li>
                 )}
            </ul>
        </div>
    }
    componentWillMount(){
        this.getList()   
    }
    getList=()=>{
        let id=this.props.match.params.id   
        let p=1
        this.$http('/Goods/index/?id='+id+'&&is_real=1&&p='+p).then(res=>{
            let list=res.data.result.goods_list
            // console.log(list);           
            this.setState({
                goodslist:list
            })    
        })
    }
    godetail=(id)=>{
        this.props.history.push('/fawu/detail/'+id)
    }
}
export default (props)=><GoodsF {...props} key={props.location.pathname} />