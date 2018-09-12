<template lang="html">
  <div id="TopNavBar">
    <div class="Navbar">
      <div class="left-side">
        <router-link to="/" class="home-btn-link">
          <div class="link-wrapper">
            <span class="twitter-img">
              <img src="/static/img/twitter-bird.png" alt="">
            </span>
            <span>首頁</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopNavBar'
}
</script>

<style lang="css" scoped>
body {
  padding-top: 46px;
}

#TopNavBar {
  box-shadow: 0 0 6px rgba(0,0,0,0.2);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background-color: white;
}

#TopNavBar .Navbar {
  height: 46px;
  max-width: 865px;
  margin: 0 auto;
  display: flex;
}

#TopNavBar .twitter-img img {
  width: 23px;
}

#TopNavBar .home-btn-link {
  color: #66757f;
  text-decoration: none;
  height: 100%;
  display: block;
  position: relative;
  transition: 400ms;
}

#TopNavBar .home-btn-link:hover {
    color: #1da1f2;
}

#TopNavBar .home-btn-link:after {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  position: absolute;
  background-color: #1c94e0;
  bottom: 0;
  transition: 400ms ease;
  opacity: 0;
}

#TopNavBar .home-btn-link:hover:after {
  opacity: 1;
}

#TopNavBar .link-wrapper {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 12px;
}
</style>
