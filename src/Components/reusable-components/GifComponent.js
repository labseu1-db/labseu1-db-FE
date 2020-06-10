import Picker from 'react-giphy-component';
import React, { Component } from 'react';

export default class GifComponent extends Component {
  addGif = gif => {
    this.props.onSelected(gif.downsized.url);
  };

  render() {
    return (
      <div aria-label="GifComponent">
        <Picker
          onSelected={this.addGif}
          apiKey="ve8cXwfS3byLJzq27IQP23LyFHAGshPZ"
        />
      </div>
    );
  }
}
