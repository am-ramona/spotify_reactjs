import React, { Component } from 'react'
import * as $ from 'jquery'
import { authEndpoint, clientId, redirectUri, scopes, state } from '../../config'
import hash from '../../hash'
import Responsive from 'react-responsive'
import './styles.css'

const Desktop = props => <Responsive {...props} minWidth={600} />
const Tablet = props => <Responsive {...props} minWidth={400} maxWidth={599} />
const Mobile = props => <Responsive {...props} maxWidth={399} />
// const Default = props => <Responsive {...props} minWidth={400} />

export default class UserLogin extends Component {

 constructor() {
    super();
    this.state = {
      token: null
    }
    this.loginWithSpotify = this.loginWithSpotify.bind(this)
  }

  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      })
      this.loginWithSpotify(_token)
    }
  }

  loginWithSpotify(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token)
      },
      success: (data) => {
        console.log("success")
      }
    });
  }

  render() { 
     return (
       <div className="spotifyArtistSearchApp">

          <Desktop>
              <a className="login loginWithSpotifyWeb"
                 href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                         "%20")}&response_type=token&state=${state}&show_dialog=true`}>
                Login
              </a>
          </Desktop>

          <Tablet>
              <a className="login loginWithSpotifyTabletMobile"
                 href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                       "%20")}&response_type=token&state=${state}&show_dialog=true`}>
                Login
              </a>
          </Tablet>

          <Mobile>
              <a className="login loginWithSpotifyTabletMobile"
                 href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                       "%20")}&response_type=token&state=${state}&show_dialog=true`}>
                Login
              </a>
          </Mobile>

       </div>
     )
  }
}
