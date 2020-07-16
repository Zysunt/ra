import React from 'react'
import { Switch } from 'antd'
import addcss from '@/css/about/add.less'
import Footer from "@/Components/Footer"
// import AddReceive from '@/Components/AddReceive'

export default class Addaddress extends React.Component{
    constructor(props){
        super(props)
        this.state={
            checked:true,
            province:[],
            city:[],
            area:[],
            value:"",
            cvalue:'',
            avalue:'',
            is_default:1,
            msg:'',
            consignee:'',
            mobile:'',
            address:''
        }
    }
    render(){
        let province=this.state.province
        let city=this.state.city
        let area=this.state.area
        let msg=this.state.msg  
           
        return <div className={addcss.layout}>
            <form>
                <div className={addcss.user}>
                    <label>收货人</label>
                    <input placeholder="请输入姓名" type="text" value={this.state.consignee} ref='consignee' onChange={(e)=>this.change(e)}/>
                </div>
                <div className={addcss.user}>
                    <label>联系电话</label>
                    <input placeholder="请输入联系电话" type="number" value={this.state.mobile} ref='mobile' onChange={(e)=>this.change(e)}/>
                </div>
                <div className={addcss.user}>
                    <span>所在地区</span>
                    <div className={addcss.sel}>
                        <select value={this.state.value} onChange={this.chooseP} ref='province'>
                            <option>{msg?msg.provinceName:'省份'}</option>
                            {province.length>0&&province.map((item,i)=>
                                <option key={i} value={item.id}>{item.name}</option>
                            )}
                        </select>
                        <select value={this.state.cvalue} onChange={this.chooseC} ref='city'>
                            <option value="">{msg? msg.cityName:'城市'}</option>
                            {city.length>0&&city.map((item,i)=>
                                <option key={i} value={item.id}>{item.name}</option>
                            )}
                        </select>
                        <select name="" id="" value={this.state.avalue} onChange={this.chooseA} ref='area'>
                            <option value="">{msg? msg.districtName:'县区'}</option>
                            {area.length>0&&area.map((item,i)=>
                                <option key={i} value={item.id}>{item.name}</option>
                            )}
                        </select>
                    </div>
                </div>
                <textarea placeholder="请填写详细地址" ref='address' value={this.state.address} onChange={(e)=>this.change(e)}></textarea>
                <div className={addcss.place}>
                    <div>
                        <p>设为默认地址</p>
                        <span>每次下单时会提醒</span>
                    </div>
                    <Switch defaultChecked={true} onChange={()=>this.onChange(this.state.checked)} style={{marginTop:"12px"}}/>
                </div>
                <input type="button" value="确认" className={addcss.btn} onClick={()=>this.goaddress()}/>
            </form>
            <Footer></Footer>
        </div>
    }
    componentWillMount(){  
        this.changeAddress()
        this.setProvince()    
    }
    //修改地址
    changeAddress=async()=>{
        const address_id=this.props.match.params.id
        if(address_id){
            const {data}=await this.$http.post('/User/getAddressInfo',{address_id:address_id})
                const msg=data.result
                this.setState({
                    msg:msg,
                    consignee:msg.consignee,
                    mobile:msg.mobile,
                    address:msg.address,
                    value:msg.province,
                    cvalue:msg.city,
                    avalue:msg.district
                })               
        }                  
    }
    //省
    setProvince=()=>{
        this.$http.post('/Api/get_province').then(res=>{
            let data=res.data
            // console.log(data);  
            this.setState({
                province:data
            })
        })
    }
    //市
    setCity=(id)=>{            
        this.$http.post('/Api/get_city',{parent_id:id}).then(res=>{
            let data=res.data
            // console.log(data);  
            this.setState({
                city:data
            })
        })
    }
    //区
    setArea=(id)=>{            
        this.$http.post('/Api/get_area',{parent_id:id}).then(res=>{
            let data=res.data
            // console.log(data);  
            this.setState({
                area:data
            })
        })
    }
    chooseP = e => {
        this.setState({
            value: e.target.value
        }) 
        this.setCity(e.target.value)       
    }
    chooseC= e => {
        this.setState({
            cvalue: e.target.value
        }) 
        this.setArea(e.target.value)       
    }
    chooseA= e => {
        this.setState({
            avalue: e.target.value
        })       
    }
    //默认按钮
    onChange=(checked)=>{   
        this.setState({
            checked:!checked
        })     
        if(checked){
            this.setState({
                is_default:1
            })
        }else{
            this.setState({
                is_default:0
            })
        }         
        console.log(this.state.is_default);
    }
    change=(e)=>{
        this.setState({
            consignee:this.refs.consignee.value,
            mobile:this.refs.mobile.value,
            address:this.refs.address.value
        })
    }
    //添加地址
    goaddress=()=>{
        const address_id =this.props.match.params.id
        const consignee=this.state.consignee
        if(consignee.trim().length<=0) return alert("请填写收货人")

        const mobile=this.state.mobile
        const regular = /^[1][3,4,5,7,8,9,6][0-9]{9}$/
        if(!regular.test(mobile)) return alert("请填写正确的手机号码")

        const province = this.state.value
        const city = this.state.cvalue
        const district = this.state.avalue

        const address=this.state.address
        if(address.trim().length<=0) return alert("请填写详细地址")

        const user_id=localStorage.getItem('user_id')
        const is_default = this.state.is_default
        // console.log(this.state.is_default);
                
        const opt={
            address_id:'' || address_id,
            user_id:user_id,
            consignee:consignee,
            mobile:mobile,
            province:province,
            city:city,
            district:district,
            address:address,
            is_default:is_default
        }

        this.$http.post('/User/addAddress',opt).then(res=>{
            // console.log(res);           
            this.props.history.push('/about/address')            
        })
        
    }
}