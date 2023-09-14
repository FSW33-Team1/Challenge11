//not integrated to be
"use client";

import React, { useState, useEffect } from 'react'
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import { apiGames, apiPlayer } from "../../utils/api";
import { asset_games } from "../../../public/images";
import { BsFillPlayFill } from "react-icons/bs";
import Banner from '../../components/Banner';

const Games = () => {

	const [dataGames, setDataGames] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)


	const getAllGames = async () => {
		try {
			const resGames = await axios.get(`${apiGames}`)
			setDataGames(resGames.data)
			console.log(resGames.data)

		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getAllGames()
	}, [])

	return (
		<>


			<Banner text="All Games" />

			<section className='sect-2-games'>
				<Container>
					<div className="title text-center">
						<h1>Discover your next favorite game</h1>
					</div>

					<Row>
						{dataGames.map((item) => (
							<div className="col-md-4" key={item.id}>
								<div className="card">
									<div className="header">

										<a href={`/detail/:${item.id}`}>
											<img src={asset_games.img_1} alt="" className='img-fluid border-0' />
										</a>
									</div>
									<div className="card-body">
										<h3>{item.name}</h3>
									</div>

									<a href={`/detail/:${item.id}`} className='d-flex align-items-center gap-1 justify-content-center link'> <span className='d-flex align-items-center  justify-content-center'><BsFillPlayFill /></span>Play Now</a>
								</div>
							</div>
						))}
					</Row>
				</Container>
			</section >

		</>
	)
}

export default Games
