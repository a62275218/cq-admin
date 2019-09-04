<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>登陆</h1>
                  <p class="text-muted">登陆管理员账号</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-model="username" type="text" class="form-control" placeholder="用户名" autocomplete="username email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-model="password"  type="password" class="form-control" placeholder="密码" autocomplete="current-password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4" @click="this.handleLogin">登陆</b-button>
                    </b-col>
                    <!-- <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">忘记密码?</b-button>
                    </b-col> -->
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    handleLogin() {
      console.log(this);
      if (this.username === "cqservice" && this.password == "cqservice2019") {
        console.log("正确");
        window.sessionStorage.setItem("login", "true");
        this.$router.push("/bill");
      } else {
        this.$message({
          type: "error",
          message: "用户名或密码错误"
        });
      }
    }
  }
};
</script>
