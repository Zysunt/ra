import React from "react"
import cssobj from "@/css/app.less"

import { HashRouter, Route, Link, Redirect, Switch } from "react-router-dom"

// import Footer from "@/Components/Footer"
import Home from "@/Components/Home"
import Bless from "@/Components/Bless"
import Practice from "@/Components/Practice"
import Fawu from "@/Components/Fawu"
import About from "@/Components/About"
import News from "@/Components/news/News"
import Newsdetail from "@/Components/news/Newsdetail"
import Blessdetail from "@/components/bless/Blessdetail"
import Blessaccount from "@/components/bless/Blessaccount"
import Blesssuc from "@/components/bless/Blesssuc"
import Fawudetail from "@/components/fawu/Fawudetail"
import Fawuaccount from "@/components/fawu/Fawuaccount"
import Fawusuc from "@/components/fawu/Fawusuc"
import Jing from "@/components/about/Jing"
import Jingxiang from "@/components/about/Jingxiang"
import See from "@/components/about/See"
import Qifu from "@/components/about/Qifu"
import Jishan from "@/components/about/Jishan"
import Jieyuan from "@/components/about/Jieyuan"
import Check from "@/components/about/Check"
import Collect from "@/components/about/Collect"
import Address from "@/components/about/Address"
import Addaddress from "@/components/about/Addaddress"
import Fude from "@/components/about/Fude"
import Userinfo from "@/components/about/Userinfo"
import Homedetail from "@/Components/Home/Homedetail"
import Homegongfo from "@/Components/Home/Homegongfo"
import Suixi from "@/Components/Home/Suixi"
import Homejing from "@/Components/Home/Homejing"
import Homeqifu from "@/Components/Home/Homeqifu"
import Hjingxiang from "@/Components/Home/Hjingxiang"
import Homesucc from "@/Components/Home/Homesucc"
import Music from "@/Components/Home/Music"

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render() {
    return <HashRouter>
      <div className={cssobj.layout}>
        {/* <header>
          <h1>万寿寺公众号</h1>
        </header> */}

        <div className={cssobj.content}>
          <Route path='/' render={() => <Redirect to='/home' />} exact />
          <Route path='/practice' component={Practice} />

          <Switch>
            <Route path='/home/homedetail/jingxiang/:id/qifu/qian/:dd/success' component={Homesucc} />
            <Route path='/home/homedetail/jingxiang/:id/qifu/qian/:dd' component={Hjingxiang} />
            <Route path='/home/homedetail/jingxiang/:id/qifu' component={Homeqifu} />
            <Route path='/home/homedetail/gongfo/:id/suixi' component={Suixi} />
            <Route path='/home/homedetail/jingxiang/:id' component={Homejing} />
            <Route path='/home/homedetail/gongfo/:id' component={Homegongfo} />
            <Route path='/home/news/detail/:id' component={Newsdetail} />
            <Route path='/home/homedetail/:id' component={Homedetail} />
            <Route path='/home/news/:id' component={News} />
            <Route path='/home/music' component={Music} />
            <Route path='/home' component={Home} />
          </Switch>

          <Switch>
            <Route path='/bless/detail/account/success' component={Blesssuc} />
            <Route path='/bless/detail/:id/account' component={Blessaccount} />
            <Route path='/bless/detail/:id' component={Blessdetail} />
            <Route path='/bless' component={Bless} />
          </Switch>

          <Switch>
            <Route path='/fawu/detail/account/success' component={Fawusuc} />
            <Route path='/fawu/detail/:id/account' component={Fawuaccount} />
            <Route path='/fawu/detail/:id' component={Fawudetail} />
            <Route path='/fawu' component={Fawu} />
          </Switch>

          <Switch>
            <Route path='/about/jing/jingxiang/see/qifu' component={Qifu} />
            <Route path='/about/jing/jingxiang/see' component={See} />
            <Route path='/about/address/add/:id' component={Addaddress} />
            <Route path='/about/address/add' component={Addaddress} />
            <Route path='/about/jing/jingxiang' component={Jingxiang} />
            <Route path='/about/jieyuan/check' component={Check} />
            <Route path='/about/jing' component={Jing} />
            <Route path='/about/jishan' component={Jishan} />
            <Route path='/about/jieyuan' component={Jieyuan} />
            <Route path='/about/collect' component={Collect} />
            <Route path='/about/address' component={Address} />
            <Route path='/about/fude' component={Fude} />
            <Route path='/about/userinfo' component={Userinfo} />
            <Route path='/about' component={About} />
          </Switch>
        </div>

        {/* <Footer></Footer> */}
      </div>
    </HashRouter>
  }
  componentWillMount(){
    this.getCode()
    // token     
    if(!localStorage.getItem("token")){
      this.$http.post('/User/thirdLogin',{openid:'15827379004',nickname:'lmy',head_pic:'lmy'}).then(res=>{
        localStorage.setItem("user_id",res.data.result.user_id)            
        localStorage.setItem("token",res.data.result.token)
      })
    }
    // console.log(localStorage.getItem("token"));    
  }
  // wechatAuth(nextState, replace, next) {
  //   const uri = new URI(document.location.href);
  //   const query = uri.query(true);
  //   const {code} = query;
  //   if(code) {
  //       this.getUser(code);
  //       next();
  //   } else {
  //       document.location = generateGetCodeUrl(document.location.href);
  //   }
  // }
  // generateGetCodeUrl=(redirectURL)=>{
    
  //   return new URI("https://open.weixin.qq.com/connect/oauth2/authorize")
  //       .addQuery("appid", appid)
  //       .addQuery("redirect_uri", redirectURL)
  //       .addQuery("response_type", "code")
  //       .addQuery("scope", "snsapi_userinfo")
  //       .addQuery("response_type", "code")
  //       .hash("wechat_redirect")
  //       .toString();
  // }
  getCode=()=>{
    const appid='wx793a3d05f69c7e6d'
    let url=location.href.split('#')[0]
    location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+url+'&response_type=code&scope=SCOPE&state=STATE#wechat_redirect'
  }
  getUser=()=>{
      location.href='http://wss.wh68.wanheweb.com/Api/Wxpay/getCode'
  }
}