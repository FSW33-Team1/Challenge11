"use client";
import React, {useRef} from 'react'
import { Container, Row, Form, Button } from "react-bootstrap";
import { asset_home } from "../../../public/images";
import Image from "next/image";
import axios from "../../lib/axios";

const Signup = () => {
	const refUsername = useRef();
	const refEmail = useRef();
	const refPassword = useRef();
	const refPasswordRepeat = useRef();

	const handleSignUp = (e) => {
		e.preventDefault();
		if(refPassword.current.value === refPasswordRepeat.current.value){
			const dataPlayer = {
				username: refUsername.current.value,
				email: refEmail.current.value,
				password: refPassword.current.value,
			};
			axios
			.post("/register", dataPlayer)
			.then((data) => {
				console.log(data);
				if (data.status != 201) {
					alert("failed to save data");
				}
			})
			.catch((err) => {
				console.log(err);
			});
		}
	}

	return (
		<>
			<section className="sect-login">
				<Container>
					<Row>
						<div className="col-md-4">
							<Image src={asset_home.imgLogin} alt="img login" className="img-fluid" />
						</div>

						<div className="col-md-5">
							<div className="block-login">
								<h3 className="text-center">Register</h3>

								<Form onSubmit={(e) => {handleSignUp(e)}}>
									<div className="form-group">
										<Form.Control
											type="text"
											className="form-control"
											name="username"
											ref={refUsername}
											placeholder="Your Username"
										/>
									</div>
						
									<div className="form-group">
										<Form.Control
											type="email"
											className="form-control"
											name="email"
											ref={refEmail}
											placeholder="Your Email"
										/>
									</div>

									<div className="form-group">
										<Form.Control
											type="password"
											className="form-control"
											name="password"
											ref={refPassword}
											placeholder="Your Password"
										/>
									</div>

									<div className="form-group">
										<Form.Control
											type="password"
											className="form-control"
											name="passwordRepeat"
											ref={refPasswordRepeat}
											placeholder="Repeat Password"
										/>
									</div>

									<button type="submit" className="btn-login">
										Sign Up
									</button>
								</Form>
								<p>
									Already have account, <a href={"/login"} >Login here</a>
								</p>
							</div>
						</div>
					</Row>
				</Container>

			</section >
		</>
	)
}

export default Signup
