import React from 'react'
import userinfo from '@/css/about/userinfo.less'
import {pageInputScroll} from '@/pageInput.js'
import Footer from "@/Components/Footer"

export default class Userinfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            msg:{},
            imageUrl:'',
            nickname:'',
            sex:'',
            mobile:'',
            address:'',
            signature:'',
            head_pic:'',
            value:''
        }
    }
    render(){   
        let that=this 
        let msg=this.state.msg 
        let sex=this.state.sex 
        let txt
        if(sex==0){
            txt=''
        }else if(sex==1){
            txt='男'
        }else if(sex==2){
            txt='女'
        }
        return <div className={userinfo.layout}>
            <div className={userinfo.content}>
                <form action="">
                    <div className={userinfo.pic}>
                        <label>头像</label> 
                        {this.state.imageUrl ? 
                        <div className={userinfo.file}>
                            <img src={this.state.imageUrl} alt=""/>
                            <input type="file" onChange={(e)=>this.imgChange(e)} ref='img'/>
                        </div> : 
                        <div className={userinfo.file}>
                            <img src={msg.head_pic} alt=""/>
                            <input type="file" onChange={(e)=>this.imgChange(e)} ref='img'/>
                        </div>}
                    </div>
                    <div className={userinfo.user}>
                        <label>昵称</label>
                        <input value={this.state.nickname} onChange={(e)=>this.change(e)} type="text" ref='nickname'/>
                    </div>
                    <div className={userinfo.user}>
                        <label>性别</label>
                        <input value={txt} type="text" ref='sex' onChange={(e)=>this.change(e)}/>
                    </div>
                    <div className={userinfo.user}>
                        <label>手机号</label>
                        <input value={this.state.mobile?this.state.mobile:'无'} onChange={(e)=>this.change(e)} type="number" ref='mobile' pattern="[0-9]*"/>
                    </div>
                    <div className={userinfo.user}>
                        <label>地址</label>
                        <input value={this.state.address?this.state.address:'无'} onChange={(e)=>this.change(e)} type="text" ref='address'/>
                    </div>
                    <div className={userinfo.self}>
                        <p>个性签名</p>
                        <textarea value={this.state.signature?this.state.signature:''} onChange={(e)=>this.change(e)} ref='signature'></textarea>
                    </div>
                    <input type="button" value="确定" onClick={()=>this.sendMsg()} className={userinfo.btn}/>
                </form>
            </div>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){
        this.getMsg()
        pageInputScroll()
    }
    change=(e)=>{
        this.setState({
            nickname:this.refs.nickname.value,
            sex:this.refs.sex.value,
            mobile:this.refs.mobile.value,
            address:this.refs.address.value,
            signature:this.refs.signature.value,
        })
    }
    imgChange=(e)=>{
        let that=this
        var reader = new FileReader();
        reader.onload = (function (file) {
            return function (e) {
                that.sendImg(this.result)
            };
        })(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);

        
    }
    getMsg=()=>{
        this.$http.post('/User/userInfo').then(res=>{
            let data=res.data.result
            this.setState({
                msg:data,
                head_pic:data.head_pic,
                nickname:data.nickname,
                sex:data.sex,
                mobile:data.mobile,
                address:data.address,
                signature:data.signature
            })
            // console.log(data);
        })
    }
    sendImg=(cover_img)=>{
        this.$http.post('/Personal/upload_json',{cover_img:cover_img}).then(res=>{
            const url=res.data.result            
            this.setState({
                imageUrl:url
            })               
        })
    }
    sendMsg=()=>{
        const nickname=this.state.nickname     
        const sex=this.state.sex
        const mobile=this.state.mobile
        const address=this.state.address
        const signature=this.state.signature
        const regular = /^[1][3,4,5,7,8,9,6][0-9]{9}$/
        if(nickname.trim().length<=0) return alert("请填写昵称")
        if(sex.trim().length<=0) return alert("请填写性别")
        if(!regular.test(mobile)) return alert("请填写正确的手机号码")
        if(address.trim().length<=0) return alert("请填写地址")

        let num
        if(sex=='保密'){
            num=0
        }else if(sex=='男'){
            num=1
        }else if(sex=='女'){
            num=2
        }

        const opt={
            nickname:nickname,
            head_pic:this.state.imageUrl || this.state.head_pic,
            sex:num,
            mobile:mobile,
            address:address,
            signature:signature
        }
        
        this.$http.post('/User/updateUserInfo',opt).then(res=>{
            // console.log(res);            
            this.props.history.push('/about')            
        })
        
    }
}