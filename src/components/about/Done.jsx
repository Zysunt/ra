import React from 'react'
import { Icon } from 'antd';
import done from '@/css/about/done.less'
import Footer from "@/Components/Footer"

export default class Done extends React.Component {
    constructor() {
        super()
        this.state = {
            list:[]
        }
    }
    render() {
        return <div>
            {this.state.list==[]?
            this.state.list.map((v,i)=>
            <div>
                <div className={done.content}>
                <div className={done.time}>
                    <div className={done.left}>2017-06-24</div>
                    <div className={done.right}>
                        <span>待发货</span>
                        <Icon type="delete" />
                    </div>
                </div>
                <ul>
                    <li>
                        <img src={require('@/assets/images/goods3.png')} alt="" />
                        <div className={done.right}>
                            <p>
                                依恋精致服饰 尺寸** 属性**
                            </p>
                            <span className={done.price}>￥169.00</span>
                            <span className={done.num}>×2</span>
                        </div>
                    </li>
                </ul>
                <div className={done.money}>
                    共 2 件，应付总额：
                    <span>￥338</span>
                </div>
            </div>

            <div className={done.btn}>
                <button onClick={()=>this.gocheck()}>查看订单</button>
            </div>
            </div>
            ): <p style={{ padding: '10vw 0', fontSize: '5vw', textAlign: 'center' }}>暂无订单</p>}
            <Footer></Footer>
        </div>
    }
    componentWillMount() {
        this.$http.post('/User/getOrderList', { p: 1, order_status: 3 }).then(res => {
            const data = res.data.result.list
            this.setState({
                list: data
            })
            // console.log(data);
        })
    }
    gocheck=()=>{
        this.props.history.push('/about/jieyuan/check')
    }
}