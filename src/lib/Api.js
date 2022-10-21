const getMovies = async(url) => {
    const response = await fetch(url,
		{
			method: 'GET',
			headers: {
                'Authorization' : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDEyNTUzN2QyODkzODk1NWM0YjY2MmRkN2I3YzUyMyIsInN1YiI6IjYyMGI1NTQxNGU2NzQyMDA0NDkzNGRmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3T35H154y1wZYdoRf9bzgJ3yLKE_S-TqYaAIIzrm2AE`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
			}
		}
	);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
    return data
}

export default getMovies