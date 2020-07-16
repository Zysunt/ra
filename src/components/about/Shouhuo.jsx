import React from 'react'
import { Icon } from 'antd';
import shouhuo from '@/css/about/shouhuo.less'
import Footer from "@/Components/Footer"

export default class Shouhuo extends React.Component {
    constructor() {
        super()
        this.state = {
            display: "none",
            list: []
        }
    }
    render() {
        return <div>
            {this.state.list==[]?
                this.state.list.map((v, i) =>
                    <div>
                        <div className={shouhuo.content}>
                            <div className={shouhuo.time}>
                                <div className={shouhuo.left}>2017-06-24</div>
                                <div className={shouhuo.right}>
                                    <span>待发货</span>
                                    <Icon type="delete" />
                                </div>
                            </div>
                            <ul>
                                <li>
                                    <img src={require('@/assets/images/goods3.png')} alt="" />
                                    <div className={shouhuo.right}>
                                        <p>
                                            依恋精致服饰 尺寸** 属性**
                                        </p>
                                        <span className={shouhuo.price}>￥169.00</span>
                                        <span className={shouhuo.num}>×2</span>
                                    </div>
                                </li>
                            </ul>
                            <div className={shouhuo.money}>
                                共 2 件，应付总额：
                                <span>￥338</span>
                            </div>
                        </div>

                        <div className={shouhuo.btn}>
                            <button onClick={() => this.cancelshou()}>确认收货</button>
                        </div>

                        <div className={shouhuo.mark} style={{ display: this.state.display }}>
                            <div>
                                <p>您确定收到货品吗？</p>
                                <button onClick={() => this.sure()}>确定</button>
                                <button onClick={() => this.cancel()}>取消</button>
                            </div>
                        </div>
                    </div>
                ) : <p style={{ padding: '10vw 0', fontSize: '5vw', textAlign: 'center' }}>暂无订单</p>}
            <Footer></Footer>
        </div>
    }
    componentWillMount() {
        this.$http.post('/User/getOrderList', { p: 1, order_status: 2 }).then(res => {
            const data = res.data.result.list
            this.setState({
                list: data
            })
            // console.log(data);
        })
    }
    cancelshou = () => {
        this.setState({
            display: "block"
        })
    }
    cancel = () => {
        this.setState({
            display: "none"
        })
    }
    sure = () => {
        this.setState({
            display: "none"
        })
    }
}