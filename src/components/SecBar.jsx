import React from 'react'
import {Icon} from 'antd'
import secbar from '@/css/secbar.less'

export default class SecBar extends React.Component{
    constructor(props){
        super()
        this.state={}
    }
    render(){
        return <div>
            <div className={secbar.icon}>
                <Icon type="left"/>
                <Icon type="right" />
            </div>
        </div>
    }
}