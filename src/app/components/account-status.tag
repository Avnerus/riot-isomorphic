 <account-status>
 <p>Account status:
    <span if="{!state.auth.user}">
         <a href="/login">Please Login</a>
    </span>
    <span if="{state.auth.user}">
        Logged in as {state.auth.user.email}
    </span>
 </p>
 <style>
     account-status p {
         color:red;
         font-size:20px;
     }
     account-status a {
         font-size:16px;
     }
 </style>
 <script>
    this.state.auth.on("login_success", (user) => {
        this.update();
    });
</script>
 </account-status>


