<template lang="html">
  <div id="RegistPage">
    <div class="RegistFormContainer">
      <div class="Wrapper">
        <div class="RegistText">
          <span>建立你的帳戶</span>
        </div>
        <div class="RegistInput">
          <div class="username">
            <input type="text" name="" value="" placeholder="使用者名稱">
          </div>
          <div class="password">
            <input type="password" name="" value="" placeholder="密碼">
          </div>
          <div class="password-confirm">
            <input type="password" name="" value="" placeholder="密碼確認">
          </div>
        </div>
        <div class="Submit">
          <button class="btn submit" type="button">註冊</button>
        </div>
      </div>
    </div>
    <div class="LoginHint">
      <div class="Wrapper">
        <div class="hint">
          <span>已加入 Twitter?</span>
          <router-link to="/login">立即登入 »</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistPage',
  components: {}
}
</script>

<style lang="css" scoped>
#RegistPage {
  height: calc(100vh - 46px);
  margin-top: 46px;
  padding-top: 10px;
  background-color: #e6ecf0;
}

.RegistFormContainer {
  max-width: 840px;
  padding: 15px;
  margin: 0 auto;
}

.RegistFormContainer {
  background-color: white;
}

.Wrapper {
  max-width: 585px;
  padding: 0 10px;
  margin: 0 auto;
}

.RegistText {
  font-size: 24px;
  font-weight: 600;
  margin: 40px 0 20px;
}

.RegistInput input {
  width: 97%;
  max-width: 280px;
  padding: 4px;
  border: 1px solid #e6ecf0;
  border-radius: 3px;
  outline: none;
  font-size: 14px;
  line-height: 20px;
}

.RegistInput input:focus {
  outline: 0;
  color: #14171a;
  border-color: rgba(0,132,180,0.5);
}

.RegistInput .username,
.RegistInput .password {
  margin-bottom: 15px;
}

.Submit {
  margin-top: 30px;
}

.Submit button {
  background-color: #1da1f2;
  border: 1px solid #1da1f2;
  color: #fff;
  border-radius: 100px;
  box-shadow: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  white-space: nowrap;
}

.Submit button:hover {
  border-color: #1da1f2;
  background-color: #006dbf;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #71c9f8;
}

.LoginHint {
  padding: 20px 10px;
  background-color: #f5f8fa;
  font-size: 14px;
  line-height: 20px;
  color: #657786;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  max-width: 840px;
  margin: 0 auto;
}
</style>
