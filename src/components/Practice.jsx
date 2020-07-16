import React from 'react'
import { Link, Route, Redirect } from 'react-router-dom'
import Bgc from "@/assets/images/500467424@2x.png"

import Sit from "@/Components/practice/Sit"
import Pray from "@/Components/practice/Pray"
import Mantra from "@/Components/practice/Mantra"
import Chant from "@/Components/practice/Chant"
import Copy from "@/Components/practice/Copy"
import Mantradet from "@/Components/practice/Mantradet"
import Chantcont from "@/Components/practice/Chantcont"
import Write from "@/Components/practice/Write"
import Jing from "@/Components/practice/Jing"

import pracss from "@/css/practice.less"
import Footer from "@/Components/Footer"

var sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${Bgc})`,
  backgroundSize: "cover"
};

export default class Practice extends React.Component {
  constructor() {
    super()
    this.state = {
      currentIndex:0,
      list:[],
      isClick1: true,
      isClick2: true,
      isClick3: true,
      isClick4: true,
      isClick5: true
    }
  }

  render() {
    let list=this.state.list
    return <div className={pracss.layout} style={sectionStyle}>
      {/* <ul className={pracss.nav}>
          {this.state.list&&this.state.list.map((item,i)=><li key={i}><a onClick={()=>this.getList(i)} className={this.state.currentIndex==i ? pracss.active : ''}>{item.cat_name}</a></li>)}
      </ul> */}
      <ul className={pracss.nav}>
        <li>
          <Link to="/practice/sit" className={this.state.isClick1 ? pracss.active : ''} onClick={() => this.one()}>坐禅</Link>
        </li>
        <li><a className={this.state.isClick2 ? '' : pracss.active} onClick={() => this.two(list[1].cat_id)}>念佛</a></li>
        <li><a className={this.state.isClick3 ? '' : pracss.active} onClick={() => this.three(list[2].cat_id)}>持咒</a></li>
        <li><a className={this.state.isClick4 ? '' : pracss.active} onClick={() => this.four(list[3].cat_id)}>念经</a></li>
        <li><a className={this.state.isClick5 ? '' : pracss.active} onClick={() => this.five(list[4].cat_id)}>抄经</a></li>
      </ul>
      {/* <div className={pracss.today}>
        <div className={pracss.bor}>
          <p>今日福德：0点</p>
        </div>
      </div> */}

      <Route path='/practice' render={() => <Redirect to='/practice/sit' />} exact />
      <Route path="/practice/sit" component={Sit} exact />
      <Route path="/practice/pray/:id" component={Pray} exact />
      <Route path="/practice/chant/:id/chantcont/:artId" component={Chantcont} exact />
      <Route path="/practice/chant/:id" component={Chant} exact />
      <Route path="/practice/copy/:id/jing/:artId" component={Jing} exact />
      <Route path="/practice/copy/:id/write/:artId" component={Write} exact />
      <Route path="/practice/copy/:id" component={Copy} exact />
      <Route path="/practice/mantra/:id/mantradet/:artId" component={Mantradet} exact />
      <Route path="/practice/mantra/:id" component={Mantra} exact />
      <Footer></Footer>
    </div>
  }
  componentWillMount(){
    this.$http('/Article/articleCat/?cat_id=3').then(res=>{
      const data={
        cat_id: "-1",
        cat_name: "坐禅",
        parent_id: "3"
      }
      let list=this.state.list
      list.push(data)
      let arr=res.data.result
      let arr1= list.concat(arr)
      this.setState({
          list:arr1
      })           
      // console.log(arr1);      
    }) 
  }
  // getList=(i)=>{
  //   this.setState({
  //       currentIndex:i
  //   })
  // }
  one = () => {
    this.setState({
      isClick1: true,
      isClick2: true,
      isClick3: true,
      isClick4: true,
      isClick5: true,
    })
  }
  two=(id)=>{
    this.props.history.push("/practice/pray/"+id)
    this.setState({
      isClick1: false,
      isClick2: false,
      isClick3: true,
      isClick4: true,
      isClick5: true,
    })
  }
  three=(id)=>{
    this.props.history.push("/practice/mantra/"+id)
    this.setState({
      isClick1: false,
      isClick2: true,
      isClick3: false,
      isClick4: true,
      isClick5: true,
    })
  }
  four=(id)=>{
    this.props.history.push("/practice/chant/"+id)
    this.setState({
      isClick1: false,
      isClick2: true,
      isClick3: true,
      isClick4: false,
      isClick5: true,
    })
  }
  five=(id)=>{
    this.props.history.push("/practice/copy/"+id)
    this.setState({
      isClick1: false,
      isClick2: true,
      isClick3: true,
      isClick4: true,
      isClick5: false,
    })
  }
}