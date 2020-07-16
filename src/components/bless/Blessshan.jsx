import React from 'react';
import blessshan from "@/css/bless/blessshan.less"

export default class Blesshan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id:props.match.params.id,
            list:[]
        }
    }
    render() {
        return <div className={blessshan.layout}>
            <ul style={{paddingBottom:"30vw"}}>
                {this.state.list?this.state.list.map((v,i)=>
                <li key={i}>
                <img src={v.head_pic} alt="" />
                <div>
                    <p>
                        <span>{v.nick_name}</span>
                        <span>{v.desc}</span>
                    </p>
                    <p>
                        {v.user_note}
                    </p>
                </div>
            </li>):'暂无留言'}
            </ul>
        </div>
    }
    componentWillMount(){
        this.$http('/Goods/getOrderNote/?goods_id='+this.state.id+'&p=1').then(res=>{
            const arr=res.data.result
            this.setState({
                list:arr
            })
            // console.log(arr);           
        })
    }
}