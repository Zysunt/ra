import React from 'react'
import Bgc from "@/assets/images/111.png"
import Bgc1 from "@/assets/images/bgc1.png"
import jingxiang from "@/css/about/jingxiang.less"
import Footer from "@/Components/Footer"

var sectionStyle = {
    backgroundImage: `url(${Bgc})`,
    backgroundSize: "100% 100%"
  };

var contentBgc = {
    backgroundImage: `url(${Bgc1})`,
    backgroundSize: "100% 100%"
};

export default class Jingxiang extends React.Component{
    constructor(props){
        super(props)
        this.state={
            display: 'none'
        }
    }
    render(){
        return <div className={jingxiang.layout}>
            <div className={jingxiang.content} style={sectionStyle}>
                <div className={jingxiang.left}>
                    <h2><span>大雄宝殿</span><span>祈福高香三支</span></h2>
                    <p><span>仅以此功德回向给</span>  <span>照此打印实际香牌</span></p>
                </div>
                <div className={jingxiang.qian} style={contentBgc}>
                    <div>
                        <span style={{fontSize:"4vw",lineHeight:"4.5vw",display:"block",marginBottom:"15vw"}}>佛光普照</span>
                        <span style={{fontSize:"4.8vw",lineHeight:"5vw"}}>一九年三月二十日</span>
                    </div>
                    <h1>阖家安康</h1>
                    <div>
                        <span style={{fontSize:"5.3vw",color:"#A0261B",display:"block",marginBottom:"2vw"}}>愿</span>
                        <span style={{fontSize:"5.3vw",lineHeight:"5vw"}}>李康宁</span>
                    </div>
                </div>
                <img src={require('@/assets/images/pai.png')} alt=""/>
            </div>
            <div className={jingxiang.jifen}>
                <div>
                    <img src={require('@/assets/images/goodsfu.gif')} alt=""/>
                    <span>+252</span>
                </div>
                <div>
                    <img src={require('@/assets/images/shan.png')} alt=""/>
                    <span>+252</span>
                </div>
            </div>
            <div className={jingxiang.jin}>  
                功德金： <span>￥36</span>
            </div>
            <Footer></Footer>
        </div>
    }
}