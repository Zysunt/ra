import React from 'react'
import homesucc from '@/css/home/homesucc.less'
import Bgc from "@/assets/images/bgc-s.png"
import Footer from "@/Components/Footer"

var sectionStyle = {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${Bgc})` ,
    backgroundSize: "100% 100%"
  };

export default class Homesucc extends React.Component{
    constructor(){
        super()
        this.state={}
    }
    render(){
        return <div className={homesucc.layout}>
            <div className={homesucc.content} style={sectionStyle}>
                <p>
                    寺庙正准备供香，打印香牌，约需5-10分钟。敬请耐心等待。敬香完成以后，即可邀请助福、分享、回看！
                </p>
                <button onClick={()=>this.gojing()}>知道了</button>
            </div>
            <Footer></Footer>
        </div>
    }
    gojing=()=>{
        this.props.history.push('/about/jing')
    }
}