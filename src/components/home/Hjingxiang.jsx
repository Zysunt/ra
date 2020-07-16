import React from 'react'
import Bgc from "@/assets/images/111.png"
import Bgc1 from "@/assets/images/bgc1.png"
import homejing from "@/css/home/homejing.less"
import Footer from "@/Components/Footer"

var sectionStyle = {
    backgroundImage: `url(${Bgc})`,
    backgroundSize: "100% 100%"
  };

var contentBgc = {
    backgroundImage: `url(${Bgc1})`,
    backgroundSize: "100% 100%"
};

export default class Hjingxiang extends React.Component{
    constructor(props){
        super(props)
        this.state={
            msg:{}
        }
    }
    render(){
        return <div className={homejing.layout}>
            <div className={homejing.content} style={sectionStyle}>
                <div className={homejing.left}>
                    <h2><span>大雄宝殿</span><span>祈福高香三支</span></h2>
                    <p><span>仅以此功德回向给</span>  <span>照此打印实际香牌</span></p>
                </div>
                <div className={homejing.qian} style={contentBgc}>
                    <div>
                        <span style={{fontSize:"4vw",lineHeight:"4.5vw",display:"block",marginBottom:"15vw"}}>佛光普照</span>
                        <span style={{fontSize:"4.8vw",lineHeight:"5vw"}}>{this.state.msg.show_time}</span>
                    </div>
                    <h1>{this.state.msg.user_note}</h1>
                    <div>
                        <span style={{fontSize:"5.3vw",color:"#A0261B",display:"block",marginBottom:"2vw"}}>愿</span>
                        <span style={{fontSize:"5.3vw",lineHeight:"5vw"}}>{this.state.msg.for_user}</span>
                    </div>
                </div>
                <img src={require('@/assets/images/pai.png')} alt=""/>
            </div>
            <div className={homejing.jifen}>
                <div>
                    <img src={require('@/assets/images/goodsfu.gif')} alt=""/>
                    <span>+{this.state.msg.integral}</span>
                </div>
                {/* <div>
                    <img src={require('@/assets/images/shan.png')} alt=""/>
                    <span>+252</span>
                </div> */}
            </div>
            <div className={homejing.jin}>
                <div>
                    功德金： <span>￥{this.state.msg.money}</span>
                </div>
                <button onClick={()=>this.gosuccess()}>确认敬香</button>
            </div>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){
        this.$http.post('/Bless/blessOrderContent',{order_sn:this.props.match.params.dd}).then(res=>{
            const data =res.data.result
            this.setState({
                msg:data
            })
            // console.log(data);           
        })
    }
    gosuccess=()=>{
        this.props.history.push(`/home/homedetail/jingxiang/${this.props.match.params.id}/qifu/qian/${this.props.match.params.dd}/success`)
    }
}