import React from 'react'

export default class Connection extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:props.match.params.id,
            msg:{}
        }
    }
    render(){
        return <div>
            <p dangerouslySetInnerHTML={{__html:this.state.msg.content}} style={{padding:'5vw 6vw 0 4vw',lineHeight:'6vw',fontSize:'3.7vw',letterSpacing:'0.2vw',color:'black'}}>
            </p>
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
}