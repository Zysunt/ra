import React from 'react'
import { Link, Route, Redirect } from 'react-router-dom'
import fawu from "@/css/fawu.less"
import GoodsF from "@/Components/goods/GoodsF"
import Footer from "@/Components/Footer"

export default class Fawu extends React.Component {
  constructor() {
    super()
    this.state = {
      isloading: true,
      list:[],
      currentIndex: 0
    }
  }

  render() {
    return <div className={fawu.layout}>
        <div className={fawu.navbox}>
          <ul className={fawu.nav}>
              {this.state.list.map((item,i)=><li key={item.id}><a onClick={()=>this.getList(item.id,i)} className={this.state.currentIndex==i ? fawu.active : ''}>{item.id==2 ?'全部':item.name}</a></li>)}
          </ul>
        </div>
      <Route path='/fawu' render={() => <Redirect to='/fawu/list/2' />} exact />
      <Route path="/fawu/list/:id" component={GoodsF} exact />
      <Footer></Footer>
    </div >
  }
  componentWillMount = () => {
    setTimeout(()=>{
      this.getAll()
    },50)
  }
  getAll=()=>{
    this.$http('/Goods/goodsCategoryList/?parent_id=0').then(res=>{
      let data=res.data.result[1]    
      // console.log(data); 
      let arr=[]
      arr.push(data)
      this.setState({
        list:arr
      })           
    })
    setTimeout(()=>{
      this.$http('/Goods/goodsCategoryList/?parent_id=2').then(res=>{
        let data=res.data.result  
        // console.log(data); 
        let list=this.state.list
        let arr = list.concat(data) 
        this.setState({
          isLoading: false,
          list:arr
        })           
      })     
    },50)   
  }
  getList=(id,i)=>{
      this.props.history.push('/fawu/list/'+id)
      this.setState({
          currentIndex:i
      })
    }
}