import React, { Component } from 'react'
import { Icon } from 'antd'
import aboutcss from "@/css/about.less"

import Bgcfu from "../assets/images/bgcfu.png"
import Bgcshan from "../assets/images/bgcshan.png"
import Footer from "@/Components/Footer"

var bgcfu = {
    backgroundImage: `url(${Bgcfu})` ,
    backgroundSize: "cover"
  };

  var bgcshan = {
    backgroundImage: `url(${Bgcshan})` ,
    backgroundSize: "cover"
  };

export default class About extends React.Component {
  constructor() {
    super()
    this.state = {
      isShow:false,
      msg:{}
    }
  }

  render() {
    let msg=this.state.msg
    let sex
    if(msg.sex==0){
      sex=''
    }else if(msg.sex==1){
      sex=(<Icon type="man" />)
    }else if(msg.sex==2){
      sex=(<Icon type="woman" />)
    }
    return <div className={aboutcss.layout}>
      <div className={aboutcss.userinfo} onClick={()=>this.gouserinfo()}>
          <img src={msg.head_pic}/>
          <div className={aboutcss.info}>
              <p>{msg.nickname} {sex} </p>           
              <p>{msg.signature?msg.signature:'暂无'}</p>
          </div>
      </div>
      <div className={aboutcss.fushan}>
        <div className={aboutcss.fu} style={bgcfu} onClick={()=>this.gofude()}>
          <img src={require('../assets/images/fu.png')}/>
          <div className={aboutcss.right}>
            <p>福德</p>
            <span>{msg.pay_points?msg.pay_points:0}</span>
          </div>
        </div>
        <div className={aboutcss.shan} style={bgcshan} onClick={()=>this.gofude()}>
          <img src={require('../assets/images/shan.png')}/>
          <div className={aboutcss.right}>
            <p>善缘</p>
            <span>{msg.share_points?msg.share_points:0}</span>
          </div>
        </div>
      </div>
      <div className="ui celled list" style={{marginBottom:0}}>
        <div className="item" style={{height:"11.2vw",borderTop:"0.5vw solid #EBE3D3",position:"relative",padding:"1vw"}} onClick={()=>this.gojing()}>
          <img className="ui avatar image" src={require('../assets/images/m1.gif')}/>
          <div className="content" style={{lineHeight:"9vw",fontSize:"4vw"}}>
            <span>敬香祈福</span>    
            <Icon type="right" style={{position:"absolute",top:"3vw",right:"5vw",fontSize:"5vw"}} /> 
          </div>   
                
        </div>
        {/* <div className="item" style={{height:"11.2vw",borderTop:"2px solid #EBE3D3",padding:"3.6vw",position:"relative"}} onClick={()=>this.gojishan()}>
          <img className="ui avatar image" src={require('../assets/images/m2.gif')}/>
          <div className="content" style={{lineHeight:"9vw",fontSize:"4vw"}}>
            <span>积善行德</span>  
            <Icon type="right" style={{position:"absolute",top:"3vw",right:"5vw",fontSize:"5vw"}} />       
          </div>
        </div> */}
        <div className="item" style={{height:"11.2vw",borderTop:"0.5vw solid #EBE3D3",position:"relative",padding:"1vw"}} onClick={()=>this.gojieyuan()}>
          <img className="ui avatar image" src={require('../assets/images/m3.gif')}/>
          <div className="content" style={{lineHeight:"9vw",fontSize:"4vw"}}>
            <span>我的结缘</span> 
            <Icon type="right" style={{position:"absolute",top:"3vw",right:"5vw",fontSize:"5vw"}} />        
          </div>
        </div>
        <div className="item" style={{height:"11.2vw",borderTop:"0.5vw solid #EBE3D3",position:"relative",padding:"1vw"}} onClick={()=>this.gocollect()}>
          <img className="ui avatar image" src={require('../assets/images/m4.gif')}/>
          <div className="content" style={{lineHeight:"9vw",fontSize:"4vw"}}>
            <span>我的收藏</span> 
            <span style={{marginLeft:"48vw",color:"#ccc"}}>{msg.collection_num?msg.collection_num+'个商品':''}</span>  
            <Icon type="right" style={{position:"absolute",top:"3vw",right:"5vw",fontSize:"5vw"}} />     
          </div>
        </div>
        <div className="item" style={{height:"11.2vw",borderTop:"0.5vw solid #EBE3D3",position:"relative",padding:"1vw"}} onClick={()=>this.goaddress()}>
          <img className="ui avatar image" src={require('../assets/images/m5.gif')}/>
          <div className="content" style={{lineHeight:"9vw",fontSize:"4vw"}}>
            <span>地址管理</span>      
            <Icon type="right" style={{position:"absolute",top:"3vw",right:"5vw",fontSize:"5vw"}} />  
          </div>
        </div>
        <div className="item" style={{height:"11.2vw",borderTop:"0.5vw solid #EBE3D3",borderBottom:"0.5vw solid #EBE3D3",position:"relative",padding:"1vw"}}>
          <img className="ui avatar image" src={require('../assets/images/m6.gif')}/>
          <div className="content" style={{lineHeight:"9vw",fontSize:"4vw"}}>
            <span>联系我们</span>     
            {/* <a href="tel:15827379004"></a>   */}
            <Icon type="right" style={{position:"absolute",top:"3vw",right:"5vw",fontSize:"5vw"}} />
          </div>
        </div>
    </div>
    <div className={aboutcss.erweima}>
      <img src={msg.qr_code} alt=""/>
      <button>分享</button>
    </div>
    <Footer></Footer>
</div>
  }
  componentWillMount(){
    this.$http.post('/User/userInfo').then(res=>{
      let data=res.data.result
      this.setState({
        msg:data
      })
      // console.log(data);
    })
  }
  gojing=()=>{
    this.props.history.push('/about/jing')
  }
  gojishan=()=>{
    this.props.history.push('/about/jishan')
  }
  gojieyuan=()=>{
    this.props.history.push('/about/jieyuan')
  }
  gocollect=()=>{
    this.props.history.push('/about/collect')
  }
  goaddress=()=>{
    this.props.history.push('/about/address')
  }
  gofude=()=>{
    this.props.history.push('/about/fude')
  }
  gouserinfo=()=>{
    this.props.history.push('/about/userinfo')
  }
}

