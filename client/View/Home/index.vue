<template lang="html">
  <div class="Home">
    <div class="HomePageInfo">
      <svg class="twitterIcon-bird" viewBox="0 0 1208 982" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Generator: Sketch 45.2 (43514) - http://www.bohemiancoding.com/sketch -->
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Final-Horizon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Artboard" transform="translate(-286.000000, -117.000000)" fill-rule="nonzero" fill="#1B95E0">
            <path d="M1493.75308,233.195911 C1449.31783,252.922544 1401.56126,266.207828 1351.43951,272.19627 C1402.61804,241.549536 1441.92034,192.987798 1460.3889,135.116296 C1412.53168,163.498493 1359.49119,184.130942 1303.02874,195.252335 C1257.88897,147.093181 1193.42514,117 1122.16771,117 C962.190754,117 844.636121,266.258151 880.768067,421.202806 C674.896491,410.886582 492.324484,312.253414 370.089808,162.341063 C305.17308,273.705962 336.423691,419.391176 446.731805,493.16476 C406.171431,491.856361 367.925917,480.734968 334.561738,462.165765 C331.844294,576.95263 414.122472,684.342008 533.287442,708.245454 C498.413572,717.706186 460.218381,719.9204 421.368991,712.47259 C452.871217,810.904465 544.358512,882.514158 652.854997,884.52708 C548.686294,966.201382 417.443793,1002.68559 286,987.186091 C395.653915,1057.48739 525.940278,1098.50067 665.838342,1098.50067 C1125.89162,1098.50067 1385.81015,709.956437 1370.10936,361.469352 C1418.52012,326.494836 1460.53987,282.864756 1493.75308,233.195911 Z" id="bird"></path>
          </g>
        </g>
      </svg>
      <div class="InfoContainer">
        <div class="InfoContent">
          <div class="">
            <span><i class="fas fa-search"></i></span>
            <span>跟隨你感興趣的內容。</span>
          </div>
          <div class="">
            <span><i class="fas fa-users"></i></span>
            <span>聽聽大家在談論什麼話題。</span>
          </div>
          <div class="">
            <span><i class="far fa-comment"></i></span>
            <span>加入對話。</span>
          </div>
        </div>
      </div>
    </div>
    <div class="HomePageOperation">
      <div class="OperactionContainer">
        <div class="OperactionDesc">
          <div class="BirdImg">
            <!--<img src="/static/img/twitter-bird.png" alt="">-->
          </div>
          <div class="Title">
            看看世界上正在發生的新鮮事
          </div>
        </div>
        <div class="OperactionBtns">
          <div class="RegisterTitle">
            今天就加入。
          </div>
          <router-link class="btn regist" to="/regist" href="/regist">
            註冊
          </router-link >
          <router-link class="btn login" to="/login" href="/login">
            登入
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="css" scoped>
.Home {
  display: flex;
  height: 100vh;
}

.HomePageInfo {
  width: 50%;
  background: #1da1f2;
  overflow: hidden;
  position: relative;
}

.twitterIcon-bird {
  position: absolute;
  width: 100vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.InfoContainer {
  position: relative;
  display: inline-block;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.InfoContent {
  color: white;
  font-size: 18px;
  letter-spacing: 0.08em;
  line-height: 24px;
}

.InfoContent > div {
  margin: 48px 0;
}

.InfoContent i {
  width: 32px;
  font-size: 24px;
}

.HomePageOperation {
  width: 50%;
}

.OperactionContainer {
  display: inline-block;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.BirdImg img {
  width: 45px;
}

.Title {
  font-size: 32px;
  font-weight: 600;
}

.RegisterTitle {
  font-size: 18px;
  margin-top: 16px;
}

.OperactionBtns {
    margin-top: 48px;
}

.OperactionBtns .btn {
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  border-radius: 100px;
  border: 1px solid #1da1f2;
}

.OperactionBtns .btn.regist {
  background-color: #1da1f2;
  color: white;
  margin: 16px 0;
}

.OperactionBtns .btn.regist:hover {
  background-color: #006dbf;
  border-color: #006dbf;
}

.OperactionBtns .btn.login {
  color: #1da1f2;
}

.OperactionBtns .btn.login:hover {
  background-color: #eaf5fd;
}
</style>
