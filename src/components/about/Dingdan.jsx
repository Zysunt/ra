import React from 'react'
import { Icon } from 'antd';
import dingdan from '@/css/about/dingdan.less'
import Footer from "@/Components/Footer"

export default class Dingdan extends React.Component {
    constructor() {
        super()
        this.state = {
            displayone: "none",
            displaytwo: "none",
            list: []
        }
    }
    render() {       
        return <div style={{marginBottom:'17vw'}}>
            {this.state.list?
                this.state.list.map((v, i) =>
                    <div key={i} style={{marginBottom:'4vw'}}>
                        <div className={dingdan.content}>
                            <div className={dingdan.time}>
                                <div className={dingdan.left}>{v.create_time}</div>
                                <div className={dingdan.right}>
                                    <span>待发货</span>
                                    <Icon type="delete" />
                                </div>
                            </div>
                            <ul>
                                <li>
                                    <img src={v.goods_image} alt="" />
                                    <div className={dingdan.right}>
                                        <p>
                                            {v.goods_name} 
                                        </p>
                                        <span className={dingdan.price}>￥{v.integral} </span>
                                        <span className={dingdan.num}>×{v.order_num}</span>
                                    </div>
                                </li>
                            </ul>
                            <div className={dingdan.money}>
                                共 {v.order_num} 件，应付总额：
                                <span>￥{v.total_amount}</span>
                            </div>
                        </div>

                        <div className={dingdan.btn}>
                            <button onClick={() => this.canceljie()}>取消结缘</button>
                            <button onClick={() => this.ti()}>提醒发货</button>
                        </div>

                        <div className={dingdan.markone} style={{ display: this.state.displayone }}>
                            <div>
                                <p>您确定取消结缘吗？</p>
                                <button onClick={() => this.sure()}>确定</button>
                                <button onClick={() => this.cancel()}>取消</button>
                            </div>
                        </div>

                        <div className={dingdan.marktwo} style={{ display: this.state.displaytwo }}>
                            <p>已提醒卖家发货</p>
                        </div>
                    </div>
                ): <p style={{ padding: '10vw 0', fontSize: '5vw', textAlign: 'center' }}>暂无订单</p>}
            <Footer></Footer>
        </div>
    }
    componentWillMount() {
        this.$http.post('/User/getOrderList', { p: 1, order_status: 1 }).then(res => {
            const data = res.data.result.list
            this.setState({
                list: data
            })
            console.log(data);
        })
    }
    canceljie = () => {
        this.setState({
            displayone: "block"
        })
    }
    cancel = () => {
        this.setState({
            displayone: "none"
        })
    }
    sure = () => {
        this.setState({
            displayone: "none"
        })
    }
    ti = () => {
        this.setState({
            displaytwo: "block"
        })
        setTimeout(() => {
            this.setState({
                displaytwo: "none"
            })
        }, 1000);
    }
}