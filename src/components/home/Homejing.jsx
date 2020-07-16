import React from 'react'
import seecss from '@/css/about/see.less'
import Footer from "@/Components/Footer"

export default class Homejing extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:props.match.params.id,
            msg:{}
        }
    }
    render(){
        return <div className={seecss.layout}>
            <div className={seecss.content}>
                <div className={seecss.title}>
                    <p>正教正信&nbsp;&nbsp;&nbsp;爱党敬国</p>
                </div>
                {this.state.msg.cover_video?
                    <div className={seecss.video}>
                        <video src={this.state.msg.cover_video} controls></video>
                    </div> :
                    <img src={this.state.msg.cover_img} alt=""/>
                }                
            </div>
            <h4>点击观看敬香演示</h4>
            <ul className={seecss.list}>
                {this.state.msg.jx_list&&this.state.msg.jx_list.map((v,i)=>
                    <li onClick={()=>this.goqifu(v.id)} key={i}>
                        <img src={v.cover_img} alt=""/>
                        <div>
                            <h3 dangerouslySetInnerHTML={{__html:v.title}}>
                            </h3>
                            <p dangerouslySetInnerHTML={{__html:v.desc}}>
                            </p>
                        </div>
                    </li>
                )}
            </ul>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){
        this.getMsg()
    }
    getMsg=()=>{        
        this.$http('/Bless/BlessContent/?bless_id='+this.state.id).then(res=>{
            const data=res.data.result
            this.setState({
                msg:data
            })
            // console.log(data);           
        })
    }
    goqifu=(id)=>{
        this.props.history.push(`/home/homedetail/jingxiang/${id}/qifu`)
    }
}