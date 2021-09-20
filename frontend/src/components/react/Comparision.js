import React from "react";
import { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../styles/carousel_styles.css";
import { Carousel } from "react-responsive-carousel";

export default function Comparison(props) {
	const [value, setValue] = useState("");

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	// Order: 0 <- first | 1 <- second
	const getImage = (order) => {
		if (props.ids.length === 0) {
			return <div></div>;
		} else {
			return (
				<div>
					<img
						src={
							require("../../assets/dataset_screenshots/" +
								props.ids[props.stage * 2 - 2 + order] +
								".png").default
						}
						alt=""
					/>
					<p className="legend">
						{order === 0 ? "Submission A" : "Submission B"}
					</p>
				</div>
			);
		}
	};

	return (
		<>
			<Grid item>
				<Typography variant="h6">
					Which of these pieces of handwriting is more legible in your
					opinion?
				</Typography>
			</Grid>
			<Grid item>
				<FormControl component="fieldset">
					<RadioGroup
						aria-label="text"
						name="Text"
						value={value}
						onChange={handleChange}
						row
					>
						<FormControlLabel
							value="a"
							control={<Radio />}
							label="Submission A"
						/>
						<FormControlLabel
							value="b"
							control={<Radio />}
							label="Submission B"
						/>
					</RadioGroup>
				</FormControl>
			</Grid>
			<Grid
				container
				item
				direction="row"
				alignItems="center"
				justifyContent="center"
			>
				<Grid item>
					<Carousel
						width="90%"
						showThumbs={false}
						autoPlay={true}
						interval={10000}
						infiniteLoop={true}
					>
						{getImage(0)}
						{getImage(1)}
					</Carousel>
				</Grid>
			</Grid>{" "}
		</>
	);
}
