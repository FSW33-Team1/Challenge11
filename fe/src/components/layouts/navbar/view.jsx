import React from 'react'
import { asset_home } from "../../../../public/images";
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react"
import { useSelector, useDispatch, connect } from 'react-redux';


const Navbar = ({ user, logOut }) => {
	const isLoggedIn = useSelector(state => state.isLoggedIn);
	const dispatch = useDispatch();
	console.log(isLoggedIn)

	function logout(){
		dispatch({type: 'NOTLOGGEDIN'});
	}

	const itemLinks = [
		{
			name: "Home",
			url: "/"
		},
		{
			name: "Games",
			url: "/game-list"
		},
	]

	

	return (
		<nav className="navbar navbar-expand-lg sticky-top">
			<div className="container">
				<a className="navbar-brand" href="/">
					<Image src={asset_home.logo} alt="logo" className='img-fluid' />
				</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse " id="navbarSupportedContent">
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">

						{itemLinks.map((item, i) => (
							<li className="nav-item" key={i}>
								<a className="nav-link" href={item.url}	>{item.name}</a>
							</li>
						))}

					</ul>
					{isLoggedIn === "LOGGEDIN"? 
						<span><a href={"/profile"}>{user?.username}</a> 
							<a 
							href="/login" 
							className="nav-link" 
							onClick={()=>{{logout}; signOut()}}>
							Logout
							</a>
						</span> : 
						<a href={"/register"} className='btn-regiter'>Register</a>}
				</div>
			</div>
		</nav>
	)
}

export default connect()(Navbar);
