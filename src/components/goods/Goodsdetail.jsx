import React from "react"
import newscss from "@/css/news/newsdetail.less"

export default class Goodsdetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:props.match.params.id,
            msg:{}
        }
    }
    render(){
        return <div className={newscss.detail}>
            <div dangerouslySetInnerHTML={{__html:this.state.msg.goods_content}}>

            </div>
    </div>
    }
    componentWillMount(){
        this.getmsg()
    }
    getmsg=()=>{
        let id=this.state.id
        let user_id=''
        this.$http('/Goods/goodsInfo/?id='+id+'&&user_id='+user_id).then(res=>{
            // console.log(res);   
            let data=res.data.result.goods
            this.setState({
                msg:data
            })        
        }) 
    }
}