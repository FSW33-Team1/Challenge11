//need to be guntingbatukertas
"use client";
import React from 'react'
import { Container } from "react-bootstrap";
import { asset_card } from "../../../public/images";
import { BsFillPlayFill } from "react-icons/bs";
import Image from 'next/image';

const Detail = () => {
	return (
		<>
			<section className='sect-1-detail'>
				<Container className='pt-5'>
					<div className="content-hero d-flex justify-content-center">
						<h1>Game Detail</h1>
					</div>
				</Container>
			</section>

			<section className='sect-2-detail'>
				<Container>
					<div className="w-75 mx-auto">
						<div className="image-cover text-center">
							<Image src={asset_card.imgPopularGame1} alt="iamge cover detail" className='img-fluid text-center' />

							<a href={'/game'} className=' mt-3 d-flex align-items-center justify-content-center gap-1'> <span className='d-flex align-items-center'><BsFillPlayFill /></span> Play Now</a>
						</div>
						<div className="items-text ">
							<div className="description">
								<h1>Title Game</h1>
								<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis est minus exercitationem quisquam esse vel, distinctio aliquam, ea doloribus iure incidunt tenetur consequuntur. Soluta deserunt reiciendis ullam aperiam quibusdam repudiandae at, doloremque esse exercitationem voluptatibus labore voluptas commodi aliquam tempore?</p>
								<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, error quibusdam. Dicta facilis nobis eveniet perspiciatis inventore aspernatur, unde sunt vero accusamus enim eos repudiandae hic culpa. Ad, nesciunt illum quod vitae, harum asperiores voluptates dolorum voluptatem voluptatibus, voluptate itaque quasi! Corporis sint facilis consequatur impedit nesciunt aut expedita aperiam cupiditate cum. Fugiat necessitatibus mollitia quis tenetur repellat, consequatur magni perspiciatis, iure est commodi odit corrupti rem, adipisci molestias modi quibusdam nulla velit reiciendis perferendis quisquam labore nam et culpa!</p>
							</div>
						</div>
					</div>
				</Container>
			</section>

		</>
	)
}

export default Detail
