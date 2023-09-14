import { useRef, useEffect, useState } from "react";

const Login = () => {
  const userRef = useRef();
  const errRef = errRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSucess] = useState(false);

  useEffect(() => {
    useRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser("");
    setPwd("");
    setSucess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You Are Logged In!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username :</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password :</label>
            <input
              type="text"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account ?<br />
            <span className="line">
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};
export default Login;
