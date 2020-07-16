import React from 'react';
import blessshan from "@/css/bless/blessshan.less"

export default class Homeliuyan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id:props.match.params.id,
            list:[]
        }
    }
    render() {
        return <div className={blessshan.layout} style={{paddingBottom:'19.2vw',borderTop:0}}>
            <ul>
                {this.state.list?this.state.list.map((v,i)=>
                    <li key={i}>
                    <img src={v.head_pic} alt="" />
                    <div>
                        <p>
                            <span>{v.nickname}</span>
                            <span>行善<span style={{color:'#A0261B',fontWeight:600}}>{v.money}</span>元</span>
                        </p>
                        <p dangerouslySetInnerHTML={{__html:v.user_note}}>
                        </p>
                    </div>
                </li>
                ):"暂无留言"}
                
            </ul>
        </div>
    }
    componentWillMount(){
        this.getMsg()
    }
    getMsg=()=>{        
        this.$http('/Bless/BlessContent/?bless_id='+this.state.id).then(res=>{
            const data=res.data.result.note
            this.setState({
                list:data
            })
            // console.log(data);           
        })
    }
}