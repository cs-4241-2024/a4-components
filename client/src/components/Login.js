import { API } from '../config';

function Login() {
  return (
    <div className="container">
      <h1>Login</h1>
      <a href={`${API}auth/github`}>
        <button>Login with GitHub</button>
      </a>
    </div>
  )
}

export default Login;
