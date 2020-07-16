import React from "react"
import mantradet from "@/css/prac/mantradet.less"
import Footer from "@/Components/Footer"

export default class Mantradet extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {
        return <div className={mantradet.layout}>
            <div className={mantradet.fo}>
                <img src={require('@/assets/images/400557965@2x.png')} alt="" />
                <p>准提神咒</p>
            </div>
            <div className={mantradet.hao}>
                南无阿弥陀佛，南无阿弥陀佛。南无阿弥陀佛南无阿弥陀佛南无阿弥陀佛
            </div>
            <div className={mantradet.muyu}>
                <div>
                    <p>3</p>
                    <span>念诵遍数</span>
                </div>
                <img src={require('@/assets/images/muyu.png')} alt=""/>
            </div>
            <Footer></Footer>
        </div>
    }
}