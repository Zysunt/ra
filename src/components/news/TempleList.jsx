import React from "react"
import listscss from "@/css/news/newslist.less"
import {Route, Link, Redirect } from 'react-router-dom'
import { Icon } from 'antd'

export default class TempleList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:props.match.params.type,
            list:[]
        }
    }
    render(){
        return <div className={listscss.list}>
            <div className="ui celled list" style={{overflowY:"auto"}}>
                {this.state.list&&this.state.list.map((v,i)=>
                    <a className="item" key={i} style={{borderTop:0,display:"flex",padding:0,marginLeft:"4vw",padding:"4vw 6vw 4vw 0",borderBottom:"0.5vw solid #BFA76B"}} tag="div" onClick={()=>this.toDel(v.article_id)}>
                        <img className="ui avatar image" className={listscss.newspic} src={require('@/assets/images/news.png')}/>
                        <div className="content" style={{marginLeft:"3vw"}}>
                            <div className="header" style={{fontSize:"4.2vw",margin:"2vw 0",color:"#585858"}}>{v.title}</div>
                            <p className={listscss.content} dangerouslySetInnerHTML={{__html:v.description}}>

                            </p>
                        </div>
                    </a>    
                )}                           
            </div>
        </div>
    }
    componentWillMount(){
        this.getList()      
    }
    getList=()=>{
        
        
        this.$http('/Article/articleList/?cat_id='+this.state.id).then(res=>{
            const data=res.data.result
            // console.log(data);
            this.setState({
                list:data
            })
        })
    }
    toDel=(id)=>{
        this.props.history.push(`/home/news/detail/${id}`)
    }
}