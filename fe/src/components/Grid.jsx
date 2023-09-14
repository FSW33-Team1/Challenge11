import React from 'react'
import { Row } from "react-bootstrap";
import Btn from './UI/Btn';
import imageGrid from "../assets/images/image-grid.png";

const Grid = () => {
	return (
		<div className='row'>
			<div className="col-md-6 d-flex align-items-center">
				<div className="items-text text-end">
					<h1>Marius Manolache, COO, interview.</h1>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero eaque quisquam numquam qui aut non.</p>
					<Btn title="See More" />
				</div>
			</div>
			<div className="col-md-6">
				<div className="item-image">
					<img src={imageGrid} alt='' className='img-fluid' />
				</div>
			</div>

			<div className="col-md-6">
				<div className="item-image">
					<img src={imageGrid} alt='' className='img-fluid' />
				</div>
			</div>
			<div className="col-md-6 d-flex align-items-center">
				<div className="items-text ">
					<h1>Marius Manolache, COO, interview.</h1>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero eaque quisquam numquam qui aut non.</p>
					<Btn title="See More" />
				</div>
			</div>

		</div>
	)
}

export default Grid
