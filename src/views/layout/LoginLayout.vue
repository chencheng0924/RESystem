<script setup>
import { ref,reactive ,onMounted} from 'vue';
const datas = reactive([
  { title: '累積用電量', count: 122022, unit: '千瓦'},
  { title: '綠電使用率', count: 23, unit: '%' },
  { title: '碳排減少量', count: 1023, unit: '公噸' }
])
const duration = 5000
const theFormat = (number) => {
  return number
}

</script>
<template>
  <div class="videoZone">
    <!-- <video width="2170" height="1220" autoplay="true" muted="true" preload="auto" loop="true">
      <source src="@/assets/video/login.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video> -->
    <div class="w-full h-full overflow-hidden">
        <img src="@/assets/loginbg.jpg" alt="滿版圖片" class="h-screen w-screen object-cover">
    </div>
  </div>
  <div class="loginContent">
    <div class="leftSide w-1/4 max-md:!hidden">
      <div class="title"></div>

    </div>
    <div class="rightSide w-1/4 max-md:w-full">
      <div class="inner">
        <router-view></router-view>
        <div class="cert">
          <span>Powered by Honhai CityGPT</span>
          <span class="tm">TM</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">

.videoZone {
  position: fixed;
  // // top: 0;
  // // left: 0;
  // top: -150px;
  // left: -150px;
  z-index: 1000;
}
.loginContent {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 100000;
  .leftSide {
 
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 0 120px;
    // justify-content: center;
    background: linear-gradient(91.22deg, rgba(11, 14, 19, 0.7) 25.06%, rgba(11, 14, 19, 0) 98.94%);
    .title {
      // font-family: 'Nunito Sans', sans-serif;
      font-family: 'Hind', sans-serif;
      font-size: 40px;
      margin-top: 150px;
      // margin-bottom: 60px;
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 40px;
      .showData {
        display: flex;
        flex-direction: column;
        gap: 4px;
        .dataTitle {
          font-family: 'Noto Sans TC';
          font-weight: 400;
        }
        >div {
          display: flex;
          align-items: center;
          gap: 8px;
          >span {
            font-family: 'Noto Sans TC';
          }
          .unit {
            font-weight: 700;
          }
          .counter {
            font-family: 'Martian Mono';
            font-weight: 700;
            font-size: 32px;
          }
        }
      }
    }
  }
  .rightSide {
  
    height: 100vh;
    background-color: rgba(11, 14, 19, 0.7);
    padding: 0 10px 0px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .inner {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-top: 260px;
      width: 100%;
      .title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 48px;
        width: 100%;
        justify-content: center;
        >span {
          font-family: 'Noto Sans TC';
          font-weight: 700;
          font-size: 24px;
        }
      }
      .loginZone {
        >span {
          font-family: 'Noto Sans TC';
          margin-bottom: 24px;
        }
        .loginInput {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 24px 0 32px 0;
        }
        .loginBtn {
          text-align: center;
          border-radius: 8px;
          cursor: pointer;
          width: 100%;
          background-color: #4C37CD;
          padding: 12px 0;
          font-family: 'Noto Sans TC';
          font-weight: 700;
          // font-size: 1px;
        }
        .select {
          width: 100%;
          justify-content: center;
          margin-top: 40px;
          display: flex;
          align-items: center;
          gap: 4px;
          >span {
            font-size: 14px;
          }
        }
      }
      .cert {
        display: flex;
        align-items: flex-start;
        font-size: 14px;
        line-height: 22px;
        gap: 2px;
        width: 100%;
        justify-content: center;
        .tm {
          font-size: 10px;
          line-height: 15px;
          margin-top: 2px;
        }
      }
    }
  }
}

</style>
