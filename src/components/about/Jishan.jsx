import React from 'react'
import jishan from '@/css/about/jishan.less'
import Footer from "@/Components/Footer"

export default class Jishan extends React.Component{
    constructor(){
        super()
        this.state={}
    }
    render(){
        return <div className={jishan.layout}>
            <table>
                <thead>
                    <tr>
                        <th>时间</th>
                        <th>修行</th>
                        <th>金额</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2019.06.05</td>
                        <td>供佛</td>
                        <td>￥998</td>
                    </tr>
                </tbody>
            </table>
        </div>
    }
}