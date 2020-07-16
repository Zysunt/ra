import React from 'react'
import { Icon } from 'antd';
import qifu from '@/css/about/qifu.less'
import Footer from "@/Components/Footer"

export default class Homeqifu extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:props.match.params.id,
            msg:{},
            currentIndex: 0,
            user_note:'',
            bless_user:'',
            for_user:''
        }
    }
    render(){
        return <div className={qifu.layout}>
            <div className={qifu.content}>
                <div className={qifu.title}>
                    <p>正教正信&nbsp;&nbsp;&nbsp;爱党敬国</p>
                </div>
                <form>
                    <div className={qifu.user}>
                        <label>请香人</label>
                        <input placeholder="请输入请香人姓名" type="text" ref='bless_user' onChange={(e)=>this.change(e)}/>
                    </div>
                    <div  className={qifu.user}>
                        <label>祈愿对象(选填)</label>
                        <input placeholder="默认自己" type="text" ref='for_user' onChange={(e)=>this.change(e)}/>
                    </div>
                    {/* <div className={qifu.user}>
                        <div className={qifu.left}>
                            <label>短信通知</label>
                            <div className={qifu.iconbig}>
                                <Icon type="check-circle" theme="filled" />
                            </div> 
                            <span>是</span>
                        </div>
                        <input placeholder="请输入电话号码" type="number"/>
                    </div> */}
                    <div className={qifu.qiyuan}>
                        <p className={qifu.tit}>祈愿内容</p>
                        <ul>
                            {this.state.msg.content&&this.state.msg.content.map((v,i)=>
                                <li key={i}>
                                    <p className={this.state.currentIndex==i ? qifu.active : ''} onClick={(e)=>this.changeActive(i,e)} dangerouslySetInnerHTML={{__html:v}}> 
                                    </p>
                                </li>
                            )}
                        </ul>
                    </div>
                    <input type="button" value="敬香祈福" className={qifu.btn} onClick={()=>{this.gojingxiang()}}/> 
                </form>
            </div>
            <Footer></Footer>
        </div>
    }
    changeActive=(i,e)=>{      
        this.setState({
            currentIndex:i,
            user_note:e.target.innerHTML
        })
    }
    change=(e)=>{
        this.setState({
            bless_user:this.refs.bless_user.value,
            for_user:this.refs.for_user.value
        })
    }
    componentWillMount(){
        this.$http('/Bless/blessJxOrder/?jx_id='+this.state.id).then(res=>{
            const data=res.data.result
            this.setState({
                msg:data
            })
            // console.log(data);           
        })
    }
    gojingxiang=(id)=>{
        const bless_id=this.state.msg.bless_id
        const jx_id=this.state.msg.id
        const money=this.state.msg.money
        const bless_user=this.state.bless_user
        if(bless_user.trim().length<=0) return alert("请填写请香人姓名")

        let for_user=this.state.for_user
        if(for_user.trim().length<=0){
            for_user=this.state.bless_user
        }

        let user_note=this.state.user_note
        if(user_note.trim().length<=0){
            user_note=this.state.msg.content[0]
        }
        
        const opt={
            bless_id:bless_id,
            jx_id:jx_id,
            money:money,
            bless_user:bless_user,
            mobile:'',
            is_show:1, //0隐藏 1显示
            for_user:for_user,
            user_note:user_note
        }
        
        this.$http.post('/Bless/blessUpOrder',opt).then(res=>{
            // console.log(res);
            const dd=res.data.result
           this.props.history.push(`/home/homedetail/jingxiang/${this.state.id}/qifu/qian/${dd}`)           
        })
        
    }
}