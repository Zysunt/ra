import React from "react"
import newscss from "@/css/news/newsdetail.less"
import Footer from "@/Components/Footer"

export default class Newsdetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:props.match.params.id,
            msg:{}
        }
    }
    render(){
        return <div className={newscss.detail}>
            <div>
                <p dangerouslySetInnerHTML={{__html:this.state.msg.description}}></p>
            </div>
            <Footer></Footer>
    </div>
    }
    componentWillMount(){
        this.getmsg()
    }
    getmsg=()=>{
        const id=this.state.id
        this.$http('/Article/articleContent/?id='+id).then(res=>{  
            let data=res.data.result
            this.setState({
                msg:data
            })        
        }) 
    }
}