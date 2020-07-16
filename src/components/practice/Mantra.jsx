import React from "react"
import mantra from "@/css/prac/mantra.less"
import { Icon } from 'antd'
import Footer from "@/Components/Footer"

export default class Mantra extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id:props.match.params.id
        }
    }
    render() {
        return <div className={mantra.layout}>
            <ul className={mantra.jing}>
                {this.state.list&&this.state.list.map((v,i)=>
                    <li onClick={()=>this.godetail(v.article_id)} key={i}>
                        <p>【{v.title}】</p>
                        <div>
                            <div className={mantra.zi}>{v.description}</div>
                            <Icon type="right" />
                        </div>
                    </li>
                )}   
                {/* <li onClick={()=>this.godetail()}>
                    <p>【准提神咒】</p>
                    <div>
                        <div className={mantra.zi} style={{width:"100%"}}>满九万遍，无量劫早十恶五念满九万遍，无量劫早十恶五念满九万遍，无量劫早十恶五念</div>
                        <Icon type="right" />
                    </div>
                </li> */}
            </ul>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){       
        // this.$http.post('/Article/practice',{type:3,date_time:0}).then(res=>{
        //     console.log(res);            
        // })
        this.getList()
    }
    getList=()=>{
        this.$http('/Article/articleList/?cat_id='+this.state.id+'&p=1').then(res=>{
            // console.log(res);            
        })
    }
    godetail=(id)=>{
        this.props.history.push(`/practice/mantra/${this.state.id}/mantradet/${id}`)
    }
}