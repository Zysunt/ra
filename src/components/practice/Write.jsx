import React from 'react'
import { Icon } from 'antd'
import write from '@/css/prac/write.less'
import Bgc from "@/assets/images/tian.png"
import Footer from "@/Components/Footer"

var sectionStyle = {
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${Bgc})`,
    backgroundSize: "240px 240px"
};

export default class Write extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            display: 'none',
            isTouchStart: false,
            lastLocX: 0,
            lastLocY: 0,
            curLocX: 0,
            curLocY: 0,
            ctx: null,
            textList:['，','行','深','般','若','波','罗','蜜','多','时','，','照'],
            artId:props.match.params.artId,
            id:props.match.params.id,
            msg:{}
        }
    }
    render() {
        return <div className={write.layout}>
            <div className={write.tit}>
                <span>【心经】</span>
                <Icon type="close" onClick={()=>this.golist()}/>
            </div>
            <div className={write.cont}>
                <p>{this.state.textList.map((item,index)=>
                    <span key={index} ref='zi' index={index}>{item}</span>
                )}</p>
                <div style={sectionStyle} ref="box">
                    <span ref="big">
                        若
                    </span>
                    <canvas ref="myCanvas" onTouchStart={(e) => this.down(e)} onTouchMove={(e) => this.move(e)}>
                    </canvas>
                </div>
            </div>
            <div className={write.icon}>
                <Icon type="left" onClick={()=>this.left()}/>
                <Icon type="close" onClick={()=>this.close()}/>
                <Icon type="right" onClick={()=>this.right()}/>
                <Icon type="caret-right" onClick={() => this.gocontent()} />
            </div>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){
        this.$http('/Article/articleContent/?id='+this.state.artId).then(res=>{
            const data =res.data.result
            this.setState({
                msg:data
            })
            // console.log(data);           
        })
    }
    gocontent = (id) => {
        this.props.history.push(`/practice/copy/${this.state.id}/jing/${this.state.artId}`)
    }
    golist=()=>{
        this.props.history.push(`/practice/copy/${this.state.id}`)
    }
    down = (e) => {
        e.persist()
        let left = this.refs.box.offsetLeft;
        let top = this.refs.box.offsetTop;
        let x = e.touches[0].pageX - left;
        let y = e.touches[0].pageY - top;
        this.setState({
            isTouchStart: true,
            lastLocX: x,
            lastLocY: y
        })
        let ctx = this.state.ctx
        if (!ctx) {
            ctx = this.initCtx();
        }
        ctx.moveTo(x, y);       
    }
    initCtx() {
        let c = this.refs.myCanvas
        let ctx = c.getContext("2d")
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.strokeStyle = "black";
        this.setState({
            ctx: ctx
        });
        return ctx;
    }
    //   move=(e)=>{     
    //         if(this.state.isMouseDown){
    //             e.persist()
    //             let left=this.refs.box.offsetLeft;
    //             let top=this.refs.box.offsetTop;
    //             this.setState({
    //                 curLocX:e.clientX-left,
    //                 curLocY:e.clientY-top
    //             })

    //             console.log(this.state.curLocX,this.state.curLocY);

    //             let c=this.refs.myCanvas
    //             let ctx =c.getContext("2d")      

    //             ctx.beginPath();
    //             ctx.lineWidth="4";
    //             ctx.strokeStyle="black"; 
    //             ctx.moveTo(this.state.lastLocX,this.state.lastLocY);
    //             ctx.lineTo(this.state.curLocX,this.state.curLocY);
    //             ctx.stroke();
    //             this.state.lastLocX = this.state.curLocX
    //             this.state.lastLocY = this.state.curLocY
    //         }      
    //    }
    move = (e) => {
        e.persist()
        if (this.state.isTouchStart) {
            let left = this.refs.box.offsetLeft;
            let top = this.refs.box.offsetTop;
            let x = e.touches[0].pageX - left;
            let y = e.touches[0].pageY - top
            this.setState({
                curLocX: x,
                curLocY: y
            });
            let ctx = this.state.ctx
            if (!ctx) {
                ctx = this.initCtx();
            }
            ctx.lineTo(x, y);
            ctx.stroke();
            this.state.lastLocX = this.state.curLocX
            this.state.lastLocY = this.state.curLocY
        }       
    }
    close=()=>{
        this.refs.myCanvas.width=this.refs.box.clientWidth;
        this.refs.myCanvas.height=this.refs.box.clientHeight;        
        let ctx = this.state.ctx
        if (!ctx) {
            ctx = this.initCtx();
        }
        ctx.lineWidth = "4";
    }
    left=()=>{
        this.close()
        let one=this.state.textList.pop()
        let arr=this.state.textList
        arr.unshift(one)
        this.setState({
            textList:arr
        })
  
        let four=this.state.textList[4]
        let reg=/[\u4e00-\u9fa5]/
        if(!reg.test(four)){
            let one=this.state.textList.pop()
            let arr=this.state.textList
            arr.unshift(one)
            this.setState({
                textList:arr
            })
        }  
        this.refs.big.innerText=this.state.textList[4]     
    }
    right=()=>{           
        this.close()
        let one=this.state.textList.shift()
        let arr=this.state.textList
        arr.push(one)
        this.setState({
            textList:arr
        })
  
        let four=this.state.textList[4]
        let reg=/[\u4e00-\u9fa5]/
        if(!reg.test(four)){
            let one=this.state.textList.shift()
            let arr=this.state.textList
            arr.push(one)
            this.setState({
                textList:arr
            })
        }  
        this.refs.big.innerText=this.state.textList[4]      
    }
}