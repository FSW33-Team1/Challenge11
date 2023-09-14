import React from 'react';
import Image from 'next/image';

const Card = ({ item }) => {
	return (
		<>
			<div className="col-md-3">
				<div className='card'>
					<div className="card-header">
						<Image src={item.imgUrl} alt="card" className='img-fluid' />
					</div>
					<div className="card-body">
						<h5>{item.title}</h5>
					</div>
					<a href="/game-detail" className=' d-flex justify-content-center'>View Detail</a>
				</div>
			</div>
		</>
	)
}

export default Card
