import React from 'react'
import Comswipe from "@/components/swiper/Comswipe"
import homedetail from "@/css/home/homedetail.less"
import Footer from "@/Components/Footer"

export default class Homedetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mtype: props.match.params.type,
            type1: props.match.params.type1,
            message: {}
        }
    }
    render() {
        return <div className={homedetail.layout}>
            <Comswipe img={this.state.message.gallery}></Comswipe>
            <p className={homedetail.cont} dangerouslySetInnerHTML={{__html:this.state.message.position_desc}}>
            </p>
            <ul className={homedetail.list}>
            {this.state.message.bless_list && this.state.message.bless_list.map(item=>
                <li onClick={() => this.gofo(item.type_id,item.id)} key={item.id}>
                    <img src={item.cover_img} alt="" />
                    <div>
                        <h3>{item.title}</h3>
                        <p dangerouslySetInnerHTML={{__html:item.desc}}>
                        </p>
                    </div>
                </li>
                    )}
            </ul>
            <Footer></Footer>
        </div>
    }
    componentWillMount() {
        this.getmsg()
    }
    getmsg = () => {
        this.$http('/Index/buildContent/?position_id=' + this.props.match.params.id).then(res => {
            const data = res.data.result
            // console.log(data);
            this.setState({
                message: data
            })
        })
    }
    gofo = (type,id) => {
        if(type==2){
            //敬香
            this.props.history.push('/home/homedetail/jingxiang/'+id)            
        }else{
            this.props.history.push('/home/homedetail/gongfo/'+id)
        }       
    }
}