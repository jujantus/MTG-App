import axios from 'axios';

class WebService {
	quickSearch = (q) => {
		return axios.get('/cards/search', {
			params: {
				q: q
			}
		});
	};

	autoComplete = (q) => {
		return axios.get('/cards/autocomplete', {
			params: {
				q: q
			}
		});
	};
}

const webService = new WebService();

export default webService;
