const GIPHY_LOAD = 'http://www.ifmo.ru/images/loader.gif';

class Header extends React.Component {
	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
				<p>Znajdź gifa na <a href='http://giphy.com'>giphy</a></p>
			</div>
		)
	}
}

class SearchForm extends React.Component {

	state = {
		searchText: ''
	}

	changeSearchText = event => {

		let text =  event.target.value;
		this.setState({searchText: text})

		if(this.state.searchText.length > 2) {
			this.props.onSearch(this.state.searchText);
		}
	}

	handleKeyUp = event => {

    	if (event.keyCode === 13) {
      		this.props.onSearch(this.state.searchText);
    	}
  	}

	render() {
		return (
			<div>
				<input type='text' value = {this.state.searchText} onChange={this.changeSearchText} onKeyUp={this.handleKeyUp} placeholder='wpisz nazwę'/>
			</div>
		)
	}
}

class Gif extends React.Component {

	getUrl = () => {
		return this.props.sourceUrl || GIPHY_LOAD;
	}

	render() {
		const url = this.props.loading ?  GIPHY_LOAD : this.props.url;

		return (
			<div>
				<a href={this.getUrl} title='zobacz na giphy' target='new'>
					<img id='gif' src={url} />
				</a>
			</div>
		)
	}
}

class App extends React.Component {

	state = {
		loading: false,
		searchText: '',
		gif: {}
	};

	handleSearch = () => {
		this.setState({loading: true});

		this.getGif(this.state.searchText, function(gif) {
			this.setState({
				loading: false,
				gif: gif,
				searchText: this.state.searchText
			});
		}.bind(this));
	};

	getGif = (searchText, callback) => {

		const GIPHY_API_URL = 'https://api.giphy.com';
		const GIPHY_PUB_KEY = 'Ux1WPuyyAmLjFOXw3J3u1hPqVppNYkLm';

	    const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchText;
	    const xhr = new XMLHttpRequest();

	    xhr.open('GET', url);
	    xhr.onload = function() {
	        if (xhr.status === 200) {
	           const data = JSON.parse(xhr.responseText).data;
	           const gif = {
	                url: data.fixed_width_downsampled_url,
	                sourceUrl: data.url
	            };
	            callback(gif);
	        }
	    };
	    xhr.send();
	}

	render() {
		return (
			<div>
				<Header title='wyszukiwarka gifów'/>
				<SearchForm onSearch={this.handleSearch} />
				<Gif loading={this.state.loading} url={this.state.gif.url} sourceUrl={this.state.gif.sourceUrl} />
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('App'));