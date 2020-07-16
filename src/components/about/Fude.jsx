import React from 'react'
import { Icon } from "antd"
import fude from '@/css/about/fude.less'
import Footer from "@/Components/Footer"

export default class Fude extends React.Component {
    constructor() {
        super()
        this.state = {
            displayone:'none',
            displaytwo:'none',
            msg:{},
            list:{},
            monthList:['1','2','3','4','5','6','7','8','9','10','11','12'],
            typeList:['全部','普通商品','积分商品','祈福','修行'],
            currentIndex:0,
            month:'',
            type:'',
            arr:[]
        }
    }
    render() {
        let msg=this.state.msg
        let list=this.state.list
        const  date = new Date()
        const month=date.getMonth()+1  
        return <div className={fude.layout}>
            <div className={fude.head}>
                <p>我的福德:</p>
                <div className={fude.jifenone}>
                    <img src={require('@/assets/images/xiaofu.png')} alt="" />
                    <span>{list.add_point}</span>
                </div>
                <div className={fude.jifentwo}>
                    <img src={require('@/assets/images/fu.png')} alt="" />
                    <span>{list.reduce_point}</span>
                </div>
                <div className={fude.select} onClick={()=>this.changeone()}>
                    <span>{msg.name}</span>
                    <Icon type="caret-down" />
                </div>
                <div className={fude.select} onClick={()=>this.changetwo()}>
                    <span>{month}月</span>
                    <Icon type="caret-down" />
                </div>
                <ul style={{display:this.state.displayone}}>
                    {this.state.typeList.map((v,i)=>
                        <li key={i} className={this.state.currentIndex==i ? fude.active : ''} onClick={()=>this.chooseType(i)}>{v}</li>
                    )}
                </ul>
                <ul style={{display:this.state.displaytwo}}>
                    {this.state.monthList.map((v,i)=>
                        v>month?'':<li key={i} onClick={()=>this.chooseMonth(v)}>{v}月</li>
                    )}
                </ul>
            </div>

            <div className={fude.intru}>
                <p>福德介绍：</p>
                <p>请问你那是个没胃口了法规和市场大家聚聚军军军军军绿绿绿绿所所所所</p>
            </div>

            <ul className={fude.buy}>
                {this.state.arr&&this.state.arr.map((v,i)=>
                   <li key={i}>
                        <img src={require('@/assets/images/goods1.png')} alt="" className={fude.big} />
                        <div>
                            <p>{v.desc}</p>
                            <span>{v.create_time}</span>
                        </div>
                        <div>
                            <img src={require('@/assets/images/xiaofu.png')} alt="" />
                            <span>{v.pay_points}</span>
                        </div>
                    </li> 
                )}               
            </ul>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){
        const  date = new Date()
        const month=date.getMonth()+1       
        this.getList('',month)
    }
    getList=(type,month)=>{
        const opt={
            type:type,
            month:month,
            p:1
        }
        this.$http.post('/User/account',opt).then(res=>{
            const data= res.data.result
            const list=data.list
            const arr=data.list.list
            // console.log(arr);
            this.setState({
                msg:data,
                list:list,
                arr:arr
            })
        })
    }
    chooseType=(type)=>{
        this.setState({
            currentIndex:type,
            displayone:'none',
            type:type
        })
        const  date = new Date()
        const month=date.getMonth()+1
        const chooseM= this.state.month
        if(chooseM){
            this.getList(type,chooseM)
        }else{
            this.getList(type,month)
        }        
    }
    chooseMonth=(month)=>{
        this.setState({
            month:month,
            displaytwo:'none'
        })
        const type=this.state.type
        if(type){
            this.getList(type,month)
        }else{
            this.getList('',month)
        }  
    }
    changeone=()=>{       
        if(this.state.displayone=='none'){
            this.setState({
                displayone:'block'
            })
        }else if(this.state.displayone=='block'){
            this.setState({
                displayone:'none'
            })
        }
    }
    changetwo=()=>{       
        if(this.state.displaytwo=='none'){
            this.setState({
                displaytwo:'block'
            })
        }else if(this.state.displaytwo=='block'){
            this.setState({
                displaytwo:'none'
            })
        }
    }
}