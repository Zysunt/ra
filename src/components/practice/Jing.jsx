import React from 'react'
import {Icon} from 'antd'
import jing from '@/css/prac/jing.less'
import Footer from "@/Components/Footer"

export default class Connection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            artId:props.match.params.artId,
            id:props.match.params.id,
            msg:{}
        }
    }
    render() {
        return <div className={jing.layout}>
            <div className={jing.tit}>
                <span>【心经】</span>
                <Icon type="close"  onClick={()=>this.golist()}/>
            </div>
            <div className={jing.hao} dangerouslySetInnerHTML={{__html:this.state.msg.content}}>
            </div>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){
        this.$http('/Article/articleContent/?id='+this.state.artId).then(res=>{
            const data =res.data.result
            this.setState({
                msg:data
            })
            // console.log(data);           
        })
    }
    golist=()=>{
        this.props.history.push(`/practice/copy/${this.state.id}`)
    }
}
