import React from 'react';
import Image from 'next/image';
import { Row } from "react-bootstrap";
import { logo } from '../../../../public/images/home';
import "./footer.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {

	const linkFooter = [
		{
			title: "Content",
			links: [
				{
					item: "Copywriting",
				},
				{
					item: "Social Media",
				},
				{
					item: "Interactive Media",
				},
				{
					item: "Motion Design",
				},
			]
		},
	]

	return (
		<footer>
			<div className="container">
				<div className='row'>
					<div className="col-md">
						<Image src={logo} alt='logo' className='mb-2' />
						<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam corrupti provident hic eligendi! Dolorum, eaque quis! Et, explicabo?</p>
					</div>
					<div className='col-md'>
						{linkFooter.map((item, i) => (
							<div className="" key={i}>
								<h3 className='h3-footer'>{item.title}</h3>
								<ul>
									{item.links.map((link, i) => (
										<li key={i}><a href="#">{link.item}</a></li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
				<hr />
				<div className="text-copyright text-center">
					<p>	&#169; Copyright 2023. All Rights Reserved</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
