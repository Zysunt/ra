import React from 'react'
import { Icon } from 'antd';
import qifu from '@/css/about/qifu.less'
import Footer from "@/Components/Footer"

export default class Qifu extends React.Component{
    constructor(){
        super()
        this.state={}
    }
    render(){
        return <div className={qifu.layout}>
            <div className={qifu.content}>
                <div className={qifu.title}>
                    <p>正教正信&nbsp;&nbsp;&nbsp;爱党敬国</p>
                </div>
                <form>
                    <div className={qifu.user}>
                        <label>请香人</label>
                        <input placeholder="请输入请香人姓名" type="text"/>
                    </div>
                    <div  className={qifu.user}>
                        <label>祈愿对象(选填)</label>
                        <input placeholder="默认自己" type="text"/>
                    </div>
                    {/* <div className={qifu.user}>
                        <div className={qifu.left}>
                            <label>短信通知</label>
                            <div className={qifu.iconbig}>
                                <Icon type="check-circle" theme="filled" />
                            </div> 
                            <span>是</span>
                        </div>
                        <input placeholder="请输入电话号码" type="number"/>
                    </div> */}
                    <div className={qifu.qiyuan}>
                        <p className={qifu.tit}>祈愿内容</p>
                        <ul>
                            <li>
                                <p className={qifu.active}>阖家欢乐</p>
                                <p>金榜题名</p>
                                <p>前程似锦</p>
                                <p>出入平安</p>
                            </li>
                            <li>
                                <p>阖家欢乐</p>
                                <p>金榜题名</p>
                                <p>前程似锦</p>
                                <p>出入平安</p>
                            </li><li>
                                <p>阖家欢乐</p>
                                <p>金榜题名</p>
                                <p>前程似锦</p>
                                <p>出入平安</p>
                            </li>
                        </ul>
                    </div>
                    <input type="button" value="敬香祈福" className={qifu.btn} onClick={()=>{this.gojingxiang()}}/> 
                </form>
            </div>
            <Footer></Footer>
        </div>
    }
    gojingxiang=()=>{
        this.props.history.push('/about/jing/jingxiang')
    }
}