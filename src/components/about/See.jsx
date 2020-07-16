import React from 'react'
import seecss from '@/css/about/see.less'
import Footer from "@/Components/Footer"

export default class See extends React.Component{
    constructor(){
        super()
        this.state={}
    }
    render(){
        return <div className={seecss.layout}>
            <div className={seecss.content}>
                <div className={seecss.title}>
                    <p>正教正信&nbsp;&nbsp;&nbsp;爱党敬国</p>
                </div>
                <img src={require('@/assets/images/shipin.png')} alt=""/>
            </div>
            <h4>点击观看敬香演示</h4>
            <ul>
                <li>
                    <img src={require('@/assets/images/qifu.png')} alt=""/>
                    <div>
                        <h3>礼佛祈福</h3>
                        <p>每天最简单增加光大福德的方法</p>
                    </div>
                </li>
                <li onClick={()=>this.goqifu()}>
                    <img src={require('@/assets/images/qifu.png')} alt=""/>
                    <div>
                        <h3>财神保佑</h3>
                        <p>每天最简单增加光大福德的方法</p>
                    </div>
                </li>
            </ul>
            <Footer></Footer>
        </div>
    }
    // goqifu=()=>{
    //     this.props.history.push('/about/jing/jingxiang/see/qifu')
    // }
}