import React from "react"
import sit from "@/css/prac/sit.less"
import Footer from "@/Components/Footer"

export default class Sit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            start: true,
            timeId: null,
            time: localStorage.getItem("time")?localStorage.getItem("time") : 0,
            one: '00',
            two: '00',
            three: '00'
        }
    }
    render() {
        return <div className={sit.layout}>
            <div className={sit.fo}>
                <img src={require('@/assets/images/400557965@2x.png')} alt="" />
            </div>
            <div className={sit.sec}>
                <span>{this.state.one}</span>
                <span>:</span>
                <span>{this.state.two}</span>
                <span>:</span>
                <span>{this.state.three}</span>
            </div>
            <div className={sit.btn}>
                <button className={sit.btn1} onClick={() => this.clear()}>清零</button>
                <button className={sit.btn2} onClick={() => this.count()} ref="start">{this.state.start ? '开始' : '结束'}</button>
            </div>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){       
        this.$http.post('/Article/practice',{type:1,date_time:0}).then(res=>{
            // console.log(res);
            
        })
    }
    componentDidMount(){
        let time=this.state.time   
        this.setState({
            three: (time % 60).toString().padStart(2, 0),
            two: parseInt(time / 60).toString().padStart(2, 0),
            one: parseInt(time / 3600).toString().padStart(2, 0)
        })
    }
    count = () => {
        if (this.state.timeId) {
            clearInterval(this.state.timeId)
        }    
        let time=this.state.time          
        this.setState({
            start: !this.state.start,
        })
        
        if (this.refs.start.innerHTML == '开始') {           
            this.state.timeId = setInterval(() => {
                this.setState({
                    time: time++,
                    three: (time % 60).toString().padStart(2, 0),
                    two: parseInt(time / 60).toString().padStart(2, 0),
                    one: parseInt(time / 3600).toString().padStart(2, 0),
                },)
            }, 1000)
        }
        if (this.refs.start.innerHTML == '结束') {
            clearInterval(this.state.timeId)
            this.setState({
                time:time
            },function(){
                localStorage.setItem("time",time)   
            })        
        }     
    }
    clear = () => {
        clearInterval(this.state.timeId)
        this.setState({
            start: true,
            time: 0,
            one: '00',
            two: '00',
            three: '00'
        })
    }
    componentWillUnmount() {
        clearInterval(this.state.timeId)
    }
}