

const appRoot = document.getElementById('app');
const IMAGE_API = 'https://dog.ceo/api/breed/akita/images/random';

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    }
    this.getImage = this.getImage.bind(this);
  }

  componentDidMount() {
    this.getImage();
  }

  getImage() {
      fetch(IMAGE_API)
        .then(response => response.json())
        .then(data => {
          this.setState({
            image: data.message
          });
        });
  }

  render() {
    const {image} = this.state;
    return React.createElement(
      'div',
      {
       className: "wrapper"
     },
      React.createElement(Image, {source: image}),
      React.createElement(Button, {action: this.getImage, content: 'Update Image'})
    )
  }
}

function Button(props) {
  return React.createElement(
    'button',
    {
      type: 'button',
      className: 'button',
      onClick: props.action
    },
    props.content
  )
}

class Image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: 'lazyImage'
    }
  }

  componentDidMount() {
    const {source} = this.props;
    if (source) {
      this.showImage(source);
    }
  }

  showImage(source) {
    const {image} = this.refs;

    this.hideImage();

    setTimeout(() => {
      image.src = source;
      this.setState({
        classes: 'fade_in'
      });
    }, 350);
  }

  hideImage() {
    this.setState({
      classes: 'fade_out'
    });
  }

  componentDidUpdate(lastProps, lastState) {
    const lastSource = lastProps.source;
    const currentSource = this.props.source;

    if (currentSource && lastSource !== currentSource) {
      this.showImage(currentSource);
    }
  }

  render() {
    const {state, props} = this;
    const {source} = props;
    const {classes} = state;

    return (
      React.createElement(
        'img',
        {
          className: 'lazyImage ' + classes,
          ref: "image"
        }
      )
    )


  }
}


ReactDOM.render(
  React.createElement(Wrapper),
  appRoot
)
