import React from "react";

export default class Profile extends React.Component {

    render() {
        let artist = { name: "", followers: { total: "" }, images: [{ url: "" }], genres: [] };
        if (this.props.artist !== null) {
            artist = this.props.artist;
        }
        return (
            
            <div className="profile">
                <img
                    alt="Artist Profile"
                    className="profile-img"
                    src={artist.images[0].url}
                />
                <div className="profile-info">
                    <div className="profile-name">{artist.name}</div>
                    <div className="profile-followers">{artist.followers.total} Followers</div>
                    <div className="profile-genres">
                        {
                            artist.genres.map((genre, i) => {
                                genre = genre !== artist.genres[artist.genres.length - 1] ? `${genre},` : `${genre}`

                                return <span key={i}>{genre}</span>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}