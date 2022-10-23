// const Notification = ({ message, style }) => {
//   if (message === null) {
//     return null
//   }
//   return <div className={style}>{message}</div>
// }

import { useSelector } from 'react-redux'

const Notification = ({ notification, style }) => {
  notification = useSelector((state) => state.notification)
  style = useSelector((state) => state.notification)

  // const style = {
  //   color: (0, 128, 0),
  //   background: (211, 211, 211),
  //   fontSize: 20,
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 10,
  // }

  if (notification === null) {
    return null
  }
  return <div className={style}>{notification}</div>
}

export default Notification
