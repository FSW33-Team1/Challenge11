import React from 'react'
import Card from "./UI/Card";

const Listing = ({ data }) => {
	return (
		<>
			{data.map((item, i) => (
				<Card item={item} key={i} />
			))}
		</>
	)
}
export default Listing;
