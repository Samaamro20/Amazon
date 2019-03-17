import React, { Component } from 'react';
import axios from 'axios';


class FileUpload extends Component {
  constructor () {
    super();
    this.state = {
      file: null,
      loc:'smiley.gif'
    };
  }

  submitFile = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    axios.post(`/test-upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(({data}) => {
      this.setState({
        loc:data.Location
      })
    }).catch(error => {
      // handle your error
    });
  }
  update = ()=>{
  console.log("ssss",this.state.loc);
}

  handleFileUpload = (event) => {
    this.setState({file: event.target.files});
  }

  render () {
    return (
      <form onSubmit={this.submitFile}>
        <input label='upload file' type='file' onChange={this.handleFileUpload} />
        <button type='submit' onClick={this.update}> Send </button>
        <br/>
        <img id="logo" src={this.state.loc} alt="Smiley face" height="300" width="300"/>
      </form>
    );
  }
}

export default FileUpload;
