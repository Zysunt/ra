import React from 'react'
import suixi from '@/css/home/suixi.less'
import Footer from "@/Components/Footer"

export default class Suixi extends React.Component{
    constructor(props){
        super(props)
        this.state={
            display: 'none',
            id:props.match.params.id,
            msg:{},
            money:'',
            currentIndex: 0,
            bless_user:'',
            mobile:'',
            user_note:'',
            writeMoney:'',
            is_show:1,
            checked:false
        }
    }
    render(){
        let msg=this.state.msg
        return <div className={suixi.layout}>
            <div className={suixi.tit}>
                <p dangerouslySetInnerHTML={{__html:msg.title}}>
                </p>
                <ul>
                    {msg.money&&msg.money.map((v,i)=>
                        <li key={i} className={this.state.currentIndex==i ? suixi.active : ''} onClick={(e)=>this.choose(e,i)}>{v}元</li>
                    )}
                </ul>
            </div>
            <form>
                <div className={suixi.moneybox}>
                    <div className={suixi.money}>
                        <label>其他</label>
                        <input type="text" placeholder="元" ref='money' onChange={(e)=>this.change(e)}/>
                    </div>
                    <input type="checkbox" className={suixi.chose} ref='is_show' onChange={(e)=>this.change(e)}/> 匿名随喜
                </div>
                <input type="text" placeholder="请输入功德主姓名" className={suixi.info} ref='bless_user' onChange={(e)=>this.change(e)}/> <br/>
                <input type="number" placeholder='请输入功德主手机号' className={suixi.info} ref='mobile' onChange={(e)=>this.change(e)}/>
                <div className={suixi.liuyan}>
                    <p>回向文</p>
                    <textarea placeholder="愿以此功德，庄严净佛土，上报四重恩，下济三途苦，若有见闻者，悉发菩提心" ref='user_note' onChange={(e)=>this.change(e)}></textarea>
                </div>
                <input type="button" value="我要供奉" className={suixi.btn} onClick={()=>this.send()}/>
            </form>
            <div className={suixi.marktwo} style={{display:this.state.display}}>
                <p>请选择或输入金额</p>
            </div>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){
        this.$http('/Bless/blessOrder/?bless_id='+this.state.id).then(res=>{
            const data =res.data.result
            this.setState({
                msg:data
            })
            // console.log(data);            
        })
    }
    choose=(e,i)=>{
        const str=e.target.innerHTML
        const arr=str.split('元')       
        this.setState({
            money:arr[0],
            currentIndex:i
        })       
    }
    change=(e)=>{       
        this.setState({
            bless_user:this.refs.bless_user.value,
            mobile:this.refs.mobile.value,
            user_note:this.refs.user_note.value,
            writeMoney:this.refs.money.value,
            checked:this.refs.is_show.checked
        })
    }
    send=()=>{       
        let money=this.state.money
        const writeMoney=this.state.writeMoney
        if(money==''&&writeMoney.trim().length<=0){
            this.setState({
                display:'block'
            })
            return setTimeout(() => {
                this.setState({
                    display:'none'
                })
            },800);
        }

        const bless_user=this.state.bless_user
        if(bless_user.trim().length<=0) return alert("请填写功德主姓名")

        const mobile=this.state.mobile
        const regular = /^[1][3,4,5,7,8,9,6][0-9]{9}$/
        if(!regular.test(mobile)) return alert("请填写正确的手机号码")

        const checked=this.state.checked
        let is_show=this.state.is_show
        if(checked){
            is_show=0
        }else{
            is_show=1
        }

        const user_note=this.state.user_note
        if(user_note.trim().length<=0) return alert("请填写留言")
        const opt={
            bless_id:this.state.id,
            jx_id:'',
            money:money,
            bless_user:bless_user,
            mobile:mobile,
            is_show:is_show,
            for_user:'',
            user_note:user_note
        }
        this.$http.post('/Bless/blessUpOrder',opt).then(res=>{
            // console.log(res);
            
        })
    }
}