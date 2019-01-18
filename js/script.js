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
	render() {
		return (
			<div>
				<input type="text" placeholder="wpisz nazwę"/>
			</div>
		)
	}
}

class App extends React.Component {
	render() {
		return (
			<div>
				<Header title='wyszukiwarka gifów'/>
				<SearchForm />
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('App'));