import React from "react";
import com from "@/css/comswipe.less";
import ReactSwiper from "reactjs-swiper";

export default class Comswipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      swiperOptions: {
        preloadImages: true,
        autoplay: 1000000000,
        autoplayDisableOnInteraction: false,
      },
      items:[]
    }   
  }
  render() {   
    let items=this.props.img
    let { swiperOptions } = this.state;
    
    return (
      <div className={com.lunbo}>
        {this.state.items?
        <div className="content">
        <ReactSwiper
          swiperOptions={swiperOptions}
          showPagination
          items={items}
          className="swiper-example"
        />
      </div>:''}
      </div>
    );
  }
}
