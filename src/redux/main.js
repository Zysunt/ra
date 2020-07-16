import { applyMiddleware, createStore } from 'redux'
// 中间件，作用：如果不使用该中间件，当我们dispatch一个action时，需要给dispatch函数传入action对象；但如果我们使用了这个中间件，那么就可以传入一个函数，这个函数接收两个参数:dispatch和getState。这个dispatch可以在将来的异步请求完成后使用，对于异步action很有用
import thunk from 'redux-thunk'
// 引入reducer
import reducers from '@/redux/reducers.js'
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
 
const persistConfig = {
 key: 'app',
 storage: storage,
 stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
};
 
const myPersistReducer = persistReducer(persistConfig, reducers)
 
const store = createStore(myPersistReducer,applyMiddleware(thunk))
 
export const persistor = persistStore(store)
export default store

// // 创建store实例
// let store = createStore(
//   reducers,
//   applyMiddleware(thunk)
// )

// export default store