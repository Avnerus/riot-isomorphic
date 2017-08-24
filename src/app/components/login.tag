<login>
    <div class="login">
    <form onsubmit="{ login }">
      <div>
        <span class="login-field">
            Email:
        </span>
        <span>
          <input type="text" name="email" ref="email">
        </span>
      </div>
      <div>
        <span class="login-field">
            Password:
        </span>
        <span>
            <input type="password" name="password" ref="password">
        </span>
      </div>
      <div>
          <span class="login-field">
             <input type="submit" value="Login">
          </span>
      </div>
    </form>
    <div if={errorMessage} class="login-error">
    {errorMessage}          
    </div>

    <p class="note"> * Default user/password: test@fruits.com/1234 * </p>
    </div>

    <style>
     .login {
         color: black;
     } 

     .login .login-field {
         width: 100px;
         display: inline-block;
         margin: 5px;
     }

     .login .note {
         font-size: 14px;
     }

     .login .login-error {
         color: red;
         font-weight: bold;
     }

    </style>
    <script>
    this.on('mount', () => {
        this.state.auth.on("login_error", this.loginError);
        this.state.auth.on("login_success", this.loginSuccess);
    })

    this.on('unmount', () => {
        this.state.auth.off("login_error", this.loginError);
        this.state.auth.off("login_success", this.loginSuccess);
    })

    login (e) {
        e.preventDefault();
        console.log("Logging in with: ", this.refs.email.value, "/", this.refs.password.value);
        this.state.auth.login({
            email: this.refs.email.value,
            password: this.refs.password.value
        });
    }

    loginError(message) {
        console.log("Received login error message: ", message);        
        this.errorMessage = message;
        this.update();
    }

    loginSuccess() {
        console.log("Logged in");        
        this.state.main.mall();
    }
    </script>
</login>
