import React from "react";
import { useState, useEffect } from "react";
import { Grid, makeStyles, useTheme } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import NavBarMark from "../components/react/NavBarMark";
import Comparison from "../components/react/Comparision";
import FourPointScale from "../components/react/FourPointScale";
import { Link } from "react-router-dom";

import fire from "../config/firebase";

const db = fire.firestore();

const useStyles = makeStyles((theme) => ({
	root: {
		color: theme.palette.text.primary,
		width: "100%",
	},
	toolbar: theme.mixins.toolbar,
}));

export default function Mark() {
	const theme = useTheme();
	const classes = useStyles(theme);

	const [stage, setStage] = useState(1);
	const [comparisonIds, setComparisonIds] = useState([]);

	const handleNext = () => {
		setStage(stage + 1);
	};

	// Generates a random doc id and then uses it to do a query on the collection via doc_id
	// Guaranteed to work if there exists 1 or more docs in the collection
	const getRandomDocument = async (collection) => {
		let datasetsRef = db.collection(collection);

		let random = datasetsRef.doc().id;

		let query_a = datasetsRef
			.where("__name__", ">=", random)
			.orderBy("__name__")
			.limit(1);

		let query_b = datasetsRef
			.where("__name__", "<=", random)
			.orderBy("__name__")
			.limit(1);

		let querySnapshot = await query_a.get().catch((error) => {
			console.log("Error getting documents: ", error);
		});

		if (querySnapshot.empty) {
			querySnapshot = await query_b.get().catch((error) => {
				console.log("Error getting documents: ", error);
			});
		}

		return querySnapshot.docs[0].get("name");
	};

	useEffect(() => {
		const getComparisonIds = async () => {
			var promises = [];

			for (let i = 0; i < 10; i++) {
				promises.push(getRandomDocument("datasets"));
			}

			let randomIds = await Promise.all(promises).catch((e) => {
				console.alert("Error getting random docs from database");
			});

			setComparisonIds(randomIds);
		};

		getComparisonIds();
	}, []);

	const renderSurveyQuestion = () => {
		if (stage <= 5) {
			return <Comparison stage={stage} ids={comparisonIds} />;
		} else {
			return <FourPointScale />;
		}
	};

	const renderButton = () => {
		if (stage === 10) {
			return (
				<Link
					to="/"
					style={{ textDecoration: "none", color: "inherit" }}
				>
					<Fab
						// color="secondary"
						variant="extended"
						className={classes.button}
					>
						Finish and Submit
					</Fab>
				</Link>
			);
		} else {
			return (
				<Fab
					color="secondary"
					variant="extended"
					onClick={handleNext}
					className={classes.button}
				>
					Next
				</Fab>
			);
		}
	};

	return (
		<>
			<NavBarMark progress={stage * 10} />
			<Grid
				container
				direction="column"
				alignItems="center"
				justifyContent="space-evenly"
				spacing={2}
				className={classes.root}
			>
				<div className={classes.toolbar} />
				<br />
				{renderSurveyQuestion()}
				<Grid item>{renderButton()}</Grid>
			</Grid>
		</>
	);
}
