import React from "react";
import {
	Box,
	Container,
	Row,
	Column,
	FooterLink,
	Heading,
} from "./FooterStyles";

const Footer = () => {
	return (
		<Box>
			<h1 style={{ color: "orange", textAlign: "center" }}>Shop to the Moon</h1>
			<Container>
				<Row>
					<Column>
						<Heading>About Us</Heading>
						<FooterLink href="#">Aim</FooterLink>
						<FooterLink href="#">Vision</FooterLink>
						<FooterLink href="#">Testimonials</FooterLink>
					</Column>
					<Column>
						<Heading>Services</Heading>
						<FooterLink href="#">Writing</FooterLink>
						<FooterLink href="#">Internships</FooterLink>
						<FooterLink href="#">Coding</FooterLink>
						<FooterLink href="#">Teaching</FooterLink>
					</Column>
					<Column>
						<Heading>Contact Us</Heading>
						<FooterLink href="#">Jeff Gomez</FooterLink>
						<FooterLink href="#">Mark Zuckerberg</FooterLink>
						<FooterLink href="#">Elon Musk</FooterLink>
						<FooterLink href="#">Manny Pacquiao</FooterLink>
					</Column>
					<Column>
						<Heading>Social Media</Heading>
						<FooterLink
							href="http://www.facebook.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fab fa-facebook-f">
								<span style={{ marginLeft: "10px" }}>Facebook</span>
							</i>
						</FooterLink>
						<FooterLink
							href="http://www.instagram.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fab fa-instagram">
								<span style={{ marginLeft: "10px" }}>Instagram</span>
							</i>
						</FooterLink>
						<FooterLink
							href="http://www.twitter.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fab fa-twitter">
								<span style={{ marginLeft: "10px" }}>Twitter</span>
							</i>
						</FooterLink>
						<FooterLink
							href="http://www.youtube.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fab fa-youtube">
								<span style={{ marginLeft: "10px" }}>Youtube</span>
							</i>
						</FooterLink>
					</Column>
				</Row>
			</Container>
		</Box>
	);
};
export default Footer;
