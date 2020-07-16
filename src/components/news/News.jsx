import React from "react"
import { Route, Link, Redirect } from "react-router-dom"
import Comswipe from "@/components/swiper/Comswipe"
import Newslist from "@/components/news/Newslist"
import TempleList from "@/components/news/TempleList"
import newscss from "@/css/news/news.less"
import Footer from "@/Components/Footer"

export default class News extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isShow1:true,
            isShow2:false,
            message:{},
            id:props.match.params.id,
            cat_id:[]
        }
    }
    render(){
        return <div style={{height:'100%',backgroundColor:'#fff',boxSizing:'border-box'}}>          
            <Comswipe img={this.state.message.gallery}></Comswipe>
            <div className={newscss.news}>
                <a className={this.state.isShow1 ? newscss.active : ''} onClick={()=>this.change1()}>寺庙</a>
                <a className={this.state.isShow2 ? newscss.active : ''} onClick={()=>this.change2()}>新闻</a>
            </div>
            <Route path='/home/news/:id/introduce/:type' component={TempleList} exact/>
            <Route path='/home/news/:id/newslist/:type' component={Newslist} exact/>
            <Footer></Footer>
        </div>
    }
    componentWillMount() { 
        this.change1()  
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
    change1=()=>{
        this.$http('/Article/articleCat/?cat_id=2').then(res=>{
            const type=res.data.result[0].cat_id
            this.props.history.push(`/home/news/${this.state.id}/introduce/${type}`)
        })          
        this.setState({
            isShow1:true,
            isShow2:false
        })
    }
    change2=()=>{
        this.$http('/Article/articleCat/?cat_id=2').then(res=>{
            const type=res.data.result[1].cat_id           
            this.props.history.push(`/home/news/${this.state.id}/newslist/${type}`)
        })        
        this.setState({
            isShow1:false,
            isShow2:true,
        })
    }
}