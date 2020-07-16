import React from "react"
import goodscss from "@/css/goods/goods.less"
import { Route, Link } from "react-router-dom"

class GoodsB extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            goodslist:[],
            id:props.match.params.id
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
                                <img src={require('@/assets/images/goodsfu.gif')} alt="" />
                                <span>{item.exchange_integral}</span>
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
        let id=this.state.id
        let p=1
        this.$http('/Goods/index/?id='+id+'&&is_real=0&&p='+p).then(res=>{
            let list=res.data.result.goods_list
            // console.log(list);           
            this.setState({
                goodslist:list
            })    
        })
    }
    godetail=(id)=>{
        this.props.history.push('/bless/detail/'+id)
    }
}
export default (props)=><GoodsB {...props} key={props.location.pathname} />