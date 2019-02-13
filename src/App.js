import React, { Component } from 'react';
import './App.css';
import Stackedit from 'stackedit-js';
import Button from '@material-ui/core/Button';

class App extends Component {
	state = {
		isOpenEditor: false
	};
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}
	componentDidUpdate() {
		this.initEditor();
	}
	handleEditorOpen = () => {
		this.setState({ isOpenEditor: true });
	};
	initEditor = () => {
		if (this.myRef.current) {
			const el = this.myRef.current;

			const stackedit = new Stackedit();

			stackedit.openFile({
				name: 'Filename',
				content: {
					text: el.value
				}
			});

			stackedit.on('fileChange', (file) => {
				el.value = file.content.text;
				this.handleEditorInput(file.content.text);
			});
			stackedit.on('close', () => {
				this.setState({ isOpenEditor: false });
			});
		}
	};
	handleEditorInput = (val) => {
		console.log(val);
	};
	render() {
		const { isOpenEditor } = this.state;
		return (
			<div className="App">
      <h1>MARKDOWN-EDITOR</h1>
      <h3>Please click on the below button to open editor</h3>
				<Button color="primary" variant="outlined" onClick={this.handleEditorOpen}>Open Editor</Button>
				{isOpenEditor && <div ref={this.myRef} />}
			</div>
		);
	}
}

export default App;
