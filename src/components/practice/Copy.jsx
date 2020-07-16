import React from "react"
import mantra from "@/css/prac/mantra.less"
import { Icon } from 'antd'
import Footer from "@/Components/Footer"

export default class Copy extends React.Component {
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
                    <li onClick={()=>this.gowrite(v.article_id)} key={i}>
                        <p>【{v.title}】</p>
                        <div>
                            <div className={mantra.zi}>{v.description}</div>
                            <Icon type="right" />
                            <span>3%</span>
                        </div>
                    </li>
                )}                
            </ul>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){       
        // this.$http.post('/Article/practice',{type:5,date_time:0}).then(res=>{
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
    gowrite=(id)=>{
        this.props.history.push(`/practice/copy/${this.state.id}/write/${id}`)
    }
}