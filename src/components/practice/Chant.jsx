import React from "react"
import mantra from "@/css/prac/mantra.less"
import { Icon } from 'antd'

export default class Chant extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id:props.match.params.id,
            list:[]
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
            </ul>
        </div>
    }
    componentWillMount(){       
        // this.$http.post('/Article/practice',{type:4,date_time:0}).then(res=>{
        //     console.log(res);
            
        // })
        this.getList()
    }
    getList=()=>{
        this.$http('/Article/articleList/?cat_id='+this.state.id+'&p=1').then(res=>{
            const data = res.data.result
            this.setState({
                list:data
            })
            // console.log(data);            
        })
    }
    godetail=(id)=>{
        this.props.history.push(`/practice/chant/${this.state.id}/chantcont/${id}`)
    }
}