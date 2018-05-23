import React from "react"
import "./css/app.css";
import { FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import Profile from "./Profile";
import Gallery from "./Gallery";
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            artist: null,
            tracks: []
        }
        this.search = this.search.bind(this)
    }

    search() {
        const BASE_URL = "https://api.spotify.com/v1/search";
        let FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;
        const ALBUMN_URL = "https://api.spotify.com/v1/artists/"
        fetch(FETCH_URL, {
            method: "GET",
            headers: {
                "Authorization": "Bearer  " + process.env.REACT_APP_ACCESS_TOKEN
            },
            mode: "cors",
            cache: "default"
        })
            .then(res => res.json())
            .then(json => {
                const artist = json.artists.items[0];
                this.setState({ artist })

                FETCH_URL = `${ALBUMN_URL}${artist.id}/top-tracks?country=US&`
                fetch(FETCH_URL, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer  " + process.env.REACT_APP_ACCESS_TOKEN
                    },
                    mode: "cors",
                    cache: "default"
                }).then(res => res.json())
                    .then(json => {
                        const tracks = json.tracks;
                        this.setState({ tracks })
                    })
            })
        this.setState({
            query: ""
        })
    }
    render() {
        return (
            <div className="App">
                <div className="App-title">Spotify Testing</div>
                <FormGroup>
                    <InputGroup>


                        <FormControl
                            type="text"
                            value={this.state.query}
                            placeholder="Search for an Artist"
                            onChange={event => { this.setState({ query: event.target.value }) }}
                            onKeyPress={event => {
                                if (event.key === "Enter") {
                                    this.search();
                                }
                            }}
                        />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null
                        ?
                        <div>
                            <Profile
                                artist={this.state.artist}
                            />
                            <Gallery
                                tracks= {this.state.tracks}
                            />
                        </div>
                        : <div></div>
                }
            </div >
        )
    }
}