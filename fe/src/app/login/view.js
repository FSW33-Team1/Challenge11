"use client"
import React, { useEffect, useState } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch, connect } from 'react-redux';


const SignIn = () => {
  // let navigate = useNavigate();
  const router = useRouter();
  const {status, data} = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(()=>{
    if (status === 'authenticated'){
      router.push('/home')
    }
  }, [status])

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = async (e) => {
    // e.preventDefault();

    const res = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    })

    if (!res.ok){
      setMessage(res.error)
    } else {
      dispatch({ type: 'LOGGEDIN'});
    }
  };

 


  return (

    <section className="sect-login">
      <Container>
        <Row>
          <div className="col-md-4">
            <img src={'/images/home/img-login.webp'} alt="img login" className="img-fluid" />
          </div>

          <div className="col-md-5">
            <div className="block-login">
              <h3 className="text-center">Login</h3>

              <Form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Form.Control
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                  />
                </div>

                <div className="form-group">
                  <Button 
                  className="btn btn-primary btn-block" 
                  disabled={loading} 
                  onClick={()=>{
                    handleLogin();
                    
                    console.log(isLoggedIn);
                  }}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </Button>
                </div>

                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
              </Form>
              <p>
                Don't have any account, <a href={"/register"} >Signup here</a>
              </p>
            </div>
          </div>
        </Row>
      </Container>

    </section >
  )
};
export default connect()(SignIn);
