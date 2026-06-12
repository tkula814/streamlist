import { GoogleLogin } from "@react-oauth/google";

function Login({ setUser }) {
  const handleSuccess = (credentialResponse) => {
    const userData = {
      isLoggedIn: true,
      credential: credentialResponse.credential,
      loginTime: new Date().toISOString(),
    };

    localStorage.setItem("streamListUser", JSON.stringify(userData));
    setUser(userData);
  };

  const handleError = () => {
    alert("Google login was unsuccessful. Please try again.");
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>StreamList Login</h1>
        <p>
          Sign in with Google to access the StreamList customer system,
          subscriptions, cart, and credit card management area.
        </p>

        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />

        <p className="login-note">
          Authentication is required before accessing the main application.
        </p>
      </section>
    </main>
  );
}

export default Login;