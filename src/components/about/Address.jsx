import React from 'react'
import address from '@/css/about/address.less'
import { Icon } from 'antd';
import Footer from "@/Components/Footer"

export default class Address extends React.Component {
    constructor() {
        super()
        this.state = {
            list: [],
            is_default: '',
        }
    }
    render() {
        const list = this.state.list
        return <div className={address.layout}>
            {list?list.map((item,i)=>
                <div key={i} className={address.list}>
                <ul>
                    <li>
                        <p>
                            <span>{item.consignee}</span>
                            <span>{item.mobile}</span>
                        </p>
                        <p>
                        {item.provinceName}{item.cityName}{item.districtName} {item.address}
                    </p>
                    </li>
                </ul>
                <div className={address.def}>
                    <div>
                        <div onClick={()=>this.setDef(item.address_id)}>
                            {item.is_default==1 ? <Icon type="check-circle" theme="filled" /> : ''}
                        </div>
                        <p>设为默认</p>
                    </div>
                    <div>
                        <a href="javascript:;" onClick={()=>this.edit(item.address_id)}>编辑</a>
                        <a href="javascript:;" onClick={()=>this.del(item.address_id)}>删除</a>
                    </div>
                </div>

                <button onClick={() => this.goadd()}>新增收货地址</button>
            </div>):'您还没添加收货地址哦'}
            <Footer></Footer>
        </div>
    }
    componentWillMount() {
        this.getList()
    }
    getList = () => {
        this.$http.post('/User/getAddressList').then(res => {            
            let data = res.data.result;
            // console.log(data);
            this.setState({
                list: data
            })
        })
    }
    setDef=(address_id)=>{
        this.$http.post('/User/setDefaultAddress',{address_id:address_id}).then(res=>{
            this.setState({
                is_default: 1
            })               
            this.getList()
        })       
    }
    edit = (id) => {
        this.props.history.push('/about/address/add/'+id)
    }
    del = (id) => {
        this.$http.post('/User/del_address',{address_id:id}).then(res=>{
            this.getList()
        })
    }
    goadd = () => {
        this.props.history.push('/about/address/add')
    }
}