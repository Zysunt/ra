import React from 'react'
import music from '@/css/home/music.less'

export default class Connection extends React.Component{
    constructor(){
        super()
        this.state={}
    }
    render(){
        return <div className={music.layout}>
            <h1>音乐</h1>
        </div>
    }
}