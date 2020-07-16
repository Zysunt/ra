export function setTime (data) {
    return (dispatch, getState) => {
      dispatch({ type: 'SET_TIME', data: data })
    }
  }
  
// export function saveToken(token) {
//   return (dispatch, getState) => {
//     this.$http('/User/thirdLogin/?openid=15827379004&nickname=lmy&head_pic=lmy').then(res=>{
//         let token=res.result.token
//         dispatch({ type: 'SAVE_TOKEN', token: token })
//     })
//   }
// }
    