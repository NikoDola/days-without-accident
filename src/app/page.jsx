export default function Home() {

  return (
    <div className="login">
      <img className="logo mx-auto " src="branding/logo/niks_logo.svg"/>
      <h3 className="mb-4">Login</h3>
      <form className="logInSignInForm">
        <div className="userName">
          <input placeholder="user name" className="loginInput"/>
          <img src="branding/logo/niks_user.png"></img>
        </div>

        <div className="password">
          <input placeholder="password" className="loginInput"/>
          <img src="branding/logo/niks_user.png"/>
        </div>

        <button className="mainButton"> Login</button>
       
      </form>
    </div>
  );
}
