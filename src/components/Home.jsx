import React from "react"
import { Route, Link, Redirect, Switch } from 'react-router-dom'

import homeobj from "@/css/home.less"
import Bgc from "@/assets/images/index.png"
import Footer from "@/Components/Footer"

var sectionStyle = {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${Bgc})`,
    backgroundSize: "100% 100%"
};

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id:[],
            one:1
        }
    }
    render() {
    
        return <div className={homeobj.layout} style={sectionStyle}>
            <button onClick={() => this.gonews('1')}>宣传板</button>
            <div className={homeobj.music}>
                <div>
                    <img src={require('@/assets/images/sound.gif')} alt="" />
                </div>
                <div>
                    <img src={require('@/assets/images/music.gif')} alt="" onClick={() => this.music()} />
                </div>
            </div>
            <div className={homeobj.daxiong} onClick={this.gohomedet.bind(this,'17')}></div>
            <div className={homeobj.fawu} onClick={this.gofawu.bind(this)}></div>
            <div className={homeobj.shanmen} onClick={this.gohomedet.bind(this,'25')}></div>
            <div className={homeobj.tianwang} onClick={this.gohomedet.bind(this,'23')}></div>
            <div className={homeobj.guangchang} onClick={this.gohomedet.bind(this,'11')}></div>
            <div className={homeobj.yuantong} onClick={this.gohomedet.bind(this,'12')}></div>
            <div className={homeobj.cangjing} onClick={this.gohomedet.bind(this,'5')}></div>
            <div className={homeobj.foxi} onClick={this.gohomedet.bind(this,'2')}></div>
            <div className={homeobj.dishuigy} onClick={this.gohomedet.bind(this,'3')}></div>
            <div className={homeobj.gongdebei} onClick={this.gohomedet.bind(this,'6')}></div>
            <div className={homeobj.fangzhangyuan} onClick={this.gohomedet.bind(this,'7')}></div>
            <div className={homeobj.chanchayuan} onClick={this.gohomedet.bind(this,'10')}></div>
            <div className={homeobj.chagengyuan} onClick={this.gohomedet.bind(this,'14')}></div>
            <div className={homeobj.dizang} onClick={this.gohomedet.bind(this,'15')}></div>
            <div className={homeobj.gulou} onClick={this.gohomedet.bind(this,'16')}></div>
            <div className={homeobj.shangketang} onClick={this.gohomedet.bind(this,'24')}></div>
            <div className={homeobj.baota} onClick={this.gohomedet.bind(this,'20')}></div>
            <div className={homeobj.zhonglou} onClick={this.gohomedet.bind(this,'21')}></div>
            <div className={homeobj.guanyin} onClick={this.gohomedet.bind(this,'19')}></div>
            <div className={homeobj.jushilou} onClick={this.gohomedet.bind(this,'18')}></div>
            {/* <div className={homeobj.jiashan} onClick={this.gohomedet.bind(this,'17')}></div> */}
            <div className={homeobj.talin} onClick={this.gohomedet.bind(this,'4')}></div>
            <div className={homeobj.zhaitang} onClick={this.gohomedet.bind(this,'13')}></div>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){
        this.$http('Index/homeBuildList').then(res=>{
            let data=res.data.result  
            let arr=[]      
            data.map(item=>{                
                arr.push(item.position_id)
                this.setState({
                    id:arr
                })
            })        
            // console.log(this.state.id);           
            // console.log(data);             
        })
    }
    gonews = (id) => {
        this.props.history.push('/home/news/'+id)
    }
    music = (id) => {        
        this.props.history.push('/home/music/'+id)
    }
    gohomedet = (id) => {      
        this.props.history.push('/home/homedetail/'+id)
    }
    gofawu = () => {        
        this.props.history.push('/fawu')
    }
    gojing = (id) => {
        this.props.history.push('/about/jing/'+id)
    }
}