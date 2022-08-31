import './App.scss';
import React from 'react';
import { marked } from "marked";


marked.setOptions({
  breaks: true
})
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

const placeholder = `# my React Markdown Previewer Application!

# This is a Heading element (H1)
## This is a sub-heading element (H2)
### This is a sub-heading element (H3):

This is a [link](https://www.markdownguide.org/basic-syntax/) for more information about commands,


> Block Quotes!

         You can define lists that
- title of list.
  - sub-title of list.
     - sub-element of sub-title.
        - final element of the sub-element.

         list
1. first element of list
2. second element of list
3. third elemente of list

You can write some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can  make text **bold**...
Or _italic_.
Or... wait for it... **_both!_**
And you can do that crazy ~~crossing stuff out~~.

![freeCodeCamp Logo](https://i2.wp.com/www.ana2lp.mx/wp-content/uploads/2014/05/2014-06-26-HTML_CSS_JS_logo.png?fit=300%2C193&ssl=1)
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      maximizedEditor: false,
      maximizedPreviewer: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleMaximizeEditor = this.handleMaximizeEditor.bind(this);
    this.handleMaximizePreviewer = this.handleMaximizePreviewer.bind(this);

  }

  handleChange(event) {
    this.setState({
      markdown: event.target.value
    })
  }

  handleMaximizeEditor() {
    this.setState({
      maximizedEditor: !this.state.maximizedEditor
    })
  }

  handleMaximizePreviewer() {
    this.setState({
      maximizedPreviewer: !this.state.maximizedPreviewer
    })
  }

  render() {
    const classes = this.state.maximizedEditor
      ? ['minEditor max', 'minPreview hide', 'fa-solid fa-down-left-and-up-right-to-center']
      : this.state.maximizedPreviewer
        ? ['minEditor hide', 'minPreview max', 'fa-solid fa-down-left-and-up-right-to-center']
        : ['minEditor', 'minPreview', 'fa-solid fa-maximize'];
    return (
      <div>
        <div className={classes[0]}>
          <HeaderBox
            icon={classes[2]}
            onClick={this.handleMaximizeEditor}
            text="Editor">
          </HeaderBox>
          <Editor markdown={this.state.markdown}
            onChange={this.handleChange} />
        </div>
        <div className="previewer" />
        <div className={classes[1]}>
          <HeaderBox
            icon={classes[2]}
            onClick={this.handleMaximizePreviewer}
            text="Previewer"
          >
          </HeaderBox>
          <Previewer markdown={this.state.markdown} />
        </div>
      </div>



    );
  }
}

const HeaderBox = (props) => {
  return (
    <div className='headerBox'>
      <i className="fa-solid fa-cube"></i>
      {props.text}
      <i className={props.icon} onClick={props.onClick}></i>
    </div>
  );
};

const Editor = (props) => {
  return (
    <textarea
      id='editor'
      type='text'
      onChange={props.onChange}
      value={props.markdown}
    ></textarea>
  );
};

const Previewer = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer })
      }}
      id="preview">

    </div>
  );
};

export default App;
