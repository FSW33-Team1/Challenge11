import React from 'react'
import { Container } from "react-bootstrap";

const Banner = ({ text }) => {
	return (
		<section className='sect-banner d-flex justify-content-center align-items-center'>
			<Container>
				<div className="content-hero text-center">
					<h1>{text}</h1>

					<nav aria-label="breadcrumb d-flex text-center justify-content-center">
						<ol class="breadcrumb d-flex text-center justify-content-center">
							<li class="breadcrumb-item">
								<a href="/">Home</a>
							</li>
							<li class="breadcrumb-item active" aria-current="page">Games</li>
						</ol>
					</nav>
				</div>
			</Container>

		</section>
	)
}

export default Banner
