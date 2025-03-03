// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useEffect, useState } from "react";
import { generateClient } from "@aws-amplify/api";

let listJobs: string;

const client = generateClient({ authMode: "userPool" });

export const useTranslationJobs = () => {
	const [jobs, updateJobs] = useState([]);
	const [loading, setLoading] = useState<Boolean>(true);

	// Function to fetch jobs
	const fetchJobs = async () => {
		setLoading(true); // Set loading to true while fetching data
		try {
		const response = await client.graphql({
			query: listJobs,
		});
		let data: any;
		if ("data" in response) {
			data = response.data.translationListJobs.items;
		}
		updateJobs(data); // Update the jobs state
		} catch (error) {
		console.error("Error fetching jobs:", error); // Log any errors
		} finally {
		setLoading(false); // Set loading to false once data is fetched
		}
	};

	 // Fetch jobs initially when the component mounts
  	useEffect(() => {
    	fetchJobs();
  	}, []);

	return { jobs, loading, fetchJobs };
};
