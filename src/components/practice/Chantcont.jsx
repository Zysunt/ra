import React from "react"
import chantcont from "@/css/prac/chantcont.less"
import Footer from "@/Components/Footer"

export default class Chantcont extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id:props.match.params.artId,
            msg:{}
        }
    }
    render() {
        return <div className={chantcont.layout}>
            <div className={chantcont.hao} dangerouslySetInnerHTML={{__html:this.state.msg.content}}>
            </div>
            <div className={chantcont.muyu}>
                <div>
                    <p>3</p>
                    <span>念诵遍数</span>
                </div>
                <img src={require('@/assets/images/muyu.png')} alt="" />
                <audio src={this.state.msg.file_url}></audio>
            </div>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){
        this.$http('/Article/articleContent/?id='+this.state.id).then(res=>{
            const data =res.data.result
            this.setState({
                msg:data
            })
            // console.log(data);           
        })
    }
}