import React from 'react'
import { Icon } from 'antd';
import check from '@/css/about/check.less'
import Footer from "@/Components/Footer"

export default class Check extends React.Component{
    constructor(){
        super()
        this.state={}
    }
    render(){
        return <div className={check.layout}>
            <div className={check.address}>
                <img src={require('@/assets/images/dw.gif')} alt="" />
                <div className={check.info}>
                    <p>
                        <span>收货人：麟游军</span>
                        <span>15823968290</span>
                    </p>
                    <p>
                        江苏省苏州市相城区 元和街道 嘉元广场1903苏州万禾网络科技
                    </p>
                </div>
                <Icon type="right" />
            </div>
            <div className={check.yun}>
                <span>默认快递公司</span>
                <span style={{"color":"#A0261B"}}>中通快递</span>
            </div>
            <ul>
                <li>
                    <img src={require('@/assets/images/goods3.png')} alt="" />
                    <div className={check.right}>
                        <p>
                            依恋精致服饰 尺寸** 属性**
                        </p>
                        <span className={check.price}>￥169.00</span>
                        <span className={check.num}>×2</span>
                    </div>
                </li>
            </ul>
            <ul>
                <li>
                    <span>商品合计</span>
                    <span>￥ 338.00</span>
                </li>
                <li>
                    <span>运费</span>
                    <span>￥ 0.00</span>
                </li>
                <li>
                    <span>物流单号</span>
                    <span>JDSELGE14967893</span>
                </li>
            </ul>
            <div className={check.money}>
                共 2 件，实付：
                <span>￥338</span>
            </div>
            <Footer></Footer>
        </div>
    }
}