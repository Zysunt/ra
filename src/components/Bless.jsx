import React from "react"
import { Link, Route, Redirect } from 'react-router-dom'
import blessobj from "@/css/bless.less"
import GoodsB from "@/Components/goods/GoodsB"
import Footer from "@/Components/Footer"
export default class Bless extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list:[],
            currentIndex: 0
        }
    }
    render() {
        return <div className={blessobj.layout}>
            <div className={blessobj.navbox}>
                <ul className={blessobj.goodsbox}>
                    {this.state.list.map((item,i)=><li key={item.id}><a onClick={()=>this.getList(item.id,i)} className={this.state.currentIndex==i ? blessobj.active : ''}>{item.id==1 ?'全部':item.name}</a></li>)}
                </ul>
            </div>
            <Route path='/bless' render={() => <Redirect to='/bless/list/1' />} exact />
            <Route path="/bless/list/:id" component={GoodsB} exact />
            <Footer></Footer>
        </div>
    }
    componentWillMount = () => {
        setTimeout(()=>{
            this.getAll()
          },50)
    }
    getAll=()=>{
        this.$http('/Goods/goodsCategoryList/?parent_id=0').then(res=>{
            let data=res.data.result[0]    
            let arr=[]
            arr.push(data)
            this.setState({
                list:arr
            })           
        })
        setTimeout(()=>{
            this.$http('/Goods/goodsCategoryList/?parent_id=1').then(res=>{
                let data=res.data.result  
                // console.log(data); 
                let list=this.state.list
                let arr = list.concat(data) 
                this.setState({
                    list:arr
                })           
            })     
        },50)  
    }
    getList=(id,i)=>{
        this.props.history.push('/bless/list/'+id)
        this.setState({
            currentIndex:i
        })
    }
}