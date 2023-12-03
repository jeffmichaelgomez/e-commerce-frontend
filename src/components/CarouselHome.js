import Carousel from "react-bootstrap/Carousel";
import carousel1 from "../logo/carousel-1.jpg";
import carousel2 from "../logo/carousel-2.jpg";
import carousel3 from "../logo/carousel-3.jpg";
import carousel4 from "../logo/carousel-4.jpg";
import carousel5 from "../logo/carousel-5.jpg";

export default function CarouselHome() {
	return (
		<Carousel className="d-block w-100">
			<Carousel.Item interval={2000}>
				<img
					className="d-block w-200"
					src={carousel1}
					alt="First slide"
				/>
				<Carousel.Caption></Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item interval={2000}>
				<img
					className="d-block w-200"
					src={carousel2}
					alt="Second slide"
				/>
				<Carousel.Caption></Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item interval={2000}>
				<img
					className="d-block w-200"
					src={carousel3}
					alt="Third slide"
				/>
				<Carousel.Caption></Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item interval={2000}>
				<img
					className="d-block w-200"
					src={carousel4}
					alt="Fourth slide"
				/>
				<Carousel.Caption></Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item interval={2000}>
				<img
					className="d-block w-200"
					src={carousel5}
					alt="Fourth slide"
				/>
				<Carousel.Caption></Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
}
