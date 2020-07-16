import React from 'react'
import { Route, Link, Redirect } from "react-router-dom"
import Comswipe from "@/components/swiper/Comswipe"
import newscss from "@/css/news/news.less"
import Homeliuyan from '@/Components/home/Homeliuyan'
import Introduce from '@/Components/home/Introduce'
import Footer from "@/Components/Footer"

export default class Homegongfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isShow1:true,
            isShow2:false,
            id:props.match.params.id,
            msg:{}
        }
    }
    render(){
        return <div style={{backgroundColor:'#fff',height:'100%'}}>
            <Comswipe img={this.state.msg.gallery}></Comswipe>
            <p dangerouslySetInnerHTML={{__html:this.state.msg.title}} style={{padding:'4vw',fontSize:'4.8vw',color:'#A0261B',borderBottom:'0.5vw solid #BFA76B',margin:0,letterSpacing:'0.3vw'}}>
            </p>
            <div className={newscss.news}>
                <a className={this.state.isShow1 ? newscss.active : ''} onClick={()=>this.change1()}>详情</a>
                <a className={this.state.isShow2 ? newscss.active : ''} onClick={()=>this.change2()}>留言</a>
            </div>
            <Route path='/home/homedetail/gongfo/:id/introduce' component={Introduce} exact/>
            <Route path='/home/homedetail/gongfo/:id/liuyan' component={Homeliuyan} exact/>

            <button style={{position:'fixed',left:'50%',bottom:'19.2vw',transform:'translateX(-50%)',width:'80vw',height:'10.6vw',lineHeight:'10.6vw',backgroundColor:'#A0261B',color:'#CAA487',border:0,borderRadius:'2vw'}} onClick={()=>this.gosuixi()}>我要供奉</button>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){
        this.change1()
        this.getMsg()
    }
    getMsg=()=>{        
        this.$http('/Bless/BlessContent/?bless_id='+this.state.id).then(res=>{
            const data=res.data.result
            this.setState({
                msg:data
            })
            // console.log(data);           
        })
    }
    change1=()=>{
        this.props.history.push(`/home/homedetail/gongfo/${this.state.id}/introduce`)
        this.setState({
            isShow1:true,
            isShow2:false
        })
    }
    change2=()=>{
        this.props.history.push(`/home/homedetail/gongfo/${this.state.id}/liuyan`)
        this.setState({
            isShow1:false,
            isShow2:true,
        })
    }
    gosuixi=(id)=>{
        this.props.history.push(`/home/homedetail/gongfo/${this.state.id}/suixi`)
    }
}