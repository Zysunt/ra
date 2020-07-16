import React from 'react'
import jingcss from '@/css/about/jing.less'
import Footer from "@/Components/Footer"

export default class Jing extends React.Component{
    constructor(props){
        super(props)
        this.state={
            mtype: props.match.params.type,
            type1: props.match.params.type1,
            list:[]
        }
    }
    render(){
        return <div className={jingcss.layout}>
            <ul className={jingcss.list}>
                {this.state.list&&this.state.list.map((v,i)=>
                     <li onClick={(e)=>this.gojingxiang(e)} key={i}>
                        <div>
                            <p>{v.bless_user}愿{v.for_user}{v.user_note}</p>
                            <span>{v.add_time}</span>
                        </div>
                        <div>
                            <p>准备中</p>
                            <button onClick={(e)=>this.gosee(e)}>实时观看</button>
                        </div>
                    </li>
                )}
                {/* <li onClick={(e)=>this.gojingxiang(e)}>
                    <div>
                        <p>***愿***身体健康</p>
                        <span>2019.04.06</span>
                    </div>
                    <div>
                        <p>准备中</p>
                        <button onClick={(e)=>this.gosee(e)}>实时观看</button>
                    </div>
                </li>
                <li onClick={(e)=>this.gojingxiang(e)}>
                    <div>
                        <p>***愿***身体健康</p>
                        <span>2019.04.06</span>
                    </div>
                    <div>
                        <button onClick={(e)=>{this.gojingxiang(e)}}>分享</button>
                        <button>回看</button>
                    </div>
                </li> */}
            </ul>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){
        this.$http.post('/User/bless',{p:'1'}).then(res=>{
            const data=res.data.result
            this.setState({
                list:data
            })
            // console.log(data);           
        })
    }
    gojingxiang=(e)=>{
        e.stopPropagation()
        this.props.history.push('/about/jing/jingxiang')
    }
    gosee=(e)=>{        
        e.stopPropagation()
        // this.props.history.push('/about/jing/jingxiang/see')
    }
}