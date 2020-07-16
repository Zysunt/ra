import React from "react"
import pray from "@/css/prac/pray.less"
import Footer from "@/Components/Footer"

export default class Pray extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id:props.match.params.id
        }
    }
    render() {
        return <div className={pray.layout}>
            <div className={pray.fo}>
                <img src={require('@/assets/images/400557965@2x.png')} alt="" />
                <p>释迦牟尼佛</p>
            </div>
            <div className={pray.hao}>
                <div className={pray.left}>
                    <img src={require('@/assets/images/fo-left.gif')} alt=""/>
                    <p>释迦牟尼佛</p>
                </div>
                <p className={pray.fahao}>
                    南无本师释迦牟尼佛
                </p>
                <div>
                    <img src={require('@/assets/images/fo-right.gif')} alt=""/>
                    <p>释迦牟尼佛</p>
                </div>
            </div>
            <div className={pray.muyu}>
                <div>
                    <p>3</p>
                    <span>念诵遍数</span>
                </div>
                <img src={require('@/assets/images/muyu.png')} alt=""/>
                <audio src=""></audio>
            </div>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){       
        // this.$http.post('/Article/practice',{type:2,date_time:0}).then(res=>{
        //     console.log(res);
            
        // })
        // this.getMsg()
    }
    getMsg=()=>{
        this.$http('/Article/articleList/?cat_id='+this.state.id+'&p=1').then(res=>{
            console.log(res);            
        })
    }
}