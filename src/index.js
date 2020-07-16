import React from "react"
import ReactDom from "react-dom"

// import { Provider } from 'react-redux'
// import {persistor} from '@/redux/main'
// // // 引入创建好的store实例
// import store from '@/redux/main.js'
// import {PersistGate} from 'redux-persist/lib/integration/react';

// import fetchJSONP from 'fetch-jsonp'
// React.Component.prototype.baseURL = 'http://wss.wh68.wanheweb.com/Api'
// React.Component.prototype.$http = fetchJSONP
// require('es6-promise').polyfill();

import axios from 'axios'
React.Component.prototype.$http = axios
axios.defaults.baseURL = 'http://wss.wh68.wanheweb.com/Api'

if(!localStorage.getItem('token')){
  setTimeout(()=>{
    axios.defaults.headers.common['token']=localStorage.getItem("token");
  },500)
}else{
  axios.defaults.headers.common['token']=localStorage.getItem("token");
}

axios.defaults.transformRequest = [function (data, headers) {
  const arr = []
  for (let key in data) {
    arr.push(`${key}=${data[key]}`)
  }
  return arr.join('&')
}]

import "./css/index.css"
import 'semantic-ui-css/semantic.min.css'
import 'antd/dist/antd.css';

import App from "@/components/App"



ReactDom.render(<App />,document.getElementById("app"))