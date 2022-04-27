import React from 'react'
import * as requests from '../src//requests';

//--------------- Post Tweet Char Counter ----------------

function charCount() {
    let char = $('.post-input').val().length;
    $('.post-char-counter').text(140-char);
    if(char > 0 && char <= 140) {
        $("#post-tweet-btn").removeAttr('disabled');
    } else {
        $("#post-tweet-btn").attr('disabled','disabled');
    }
}

// ------------------ React Components ---------------------


class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.doLogout = this.doLogout.bind(this);
        this.doSearch = this.doSearch.bind(this);
    }

    doLogout(e) {
        e.preventDefault();
        requests.logoutUser(() => {
            requests.authenticate(
                response => {
                    if(!response.authenticated) {
                        window.location.replace("/");
                    }
                },
                error => console.log(error)
            );
        });
    }

    doSearch(e) {
        e.preventDefault();
        const keyword = $('.search-input').val();
        requests.searchTweets(keyword, this.props.updateTweets);
    }

    render() {
        let link = '#';
        let username = 'User';
        if (this.props.username != null) {
            username = this.props.username;
            link = `/${this.props.username}`;
        }

        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand" href='/feeds'><i className="fa fa-twitter"></i></a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span id="user-icon">{username}</span></a>
                            <ul className="dropdown-menu row" role="menu">
                                <li ><a href={link} className="username">{username}</a></li>
                                <li role="presentation" className="divider"></li>
                                <li ><a href="#">Lists</a></li>
                                <li role="presentation" className="divider"></li>
                                <li ><a href="#">Help</a></li>
                                <li ><a href="#">Keyboard shortcuts</a></li>
                                <li role="presentation" className="divider"></li>
                                <li ><a href="#">Settings</a></li>
                                <li ><a id="log-out" onClick={this.doLogout}>Log out</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div className="search-bar col-xs-3 nav navbar-right">
                        <div className="input-group">
                            <input type="text" className="form-control search-input" placeholder="Search for..." />
                            <span className="input-group-btn">
                                <button className="btn btn-default search-btn" type="button" onClick={this.doSearch}>Go!</button>
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

const ProfileCard = props => {
    let link = '#';
    let username = 'User';
    if (props.username != null) {
        username = props.username;
        link = `/${props.username}`;
    }

    return (
        <div className="profileCard col-xs-12">
            <div className="profileCard-content">
                <div className="user-field col-xs-12">
                    <a className="username" href={link}>{username}</a><br/>
                    <a className="screenName" href={link}>@{username}</a>
                </div>
                <div className="user-stats">
                    <div className="col-xs-3">
                        <a href="">
                            <span>Tweets</span><br/>
                            <span className="user-stats-tweets">0</span>
                        </a>
                    </div>
                    <div className="col-xs-4">
                        <a href="">
                            <span>Following</span><br/>
                            <span className="user-stats-following">0</span>
                        </a>
                    </div>
                    <div className="col-xs-4">
                        <a href="">
                            <span>Followers</span><br/>
                            <span className="user-stats-followers">0</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Trends = props => (
    <div className="trends col-xs-12">
        <div className="col-xs-12">
            <div className="trends-header">
                <span>Trends</span><span> &#183; </span><small><a href="">Change</a></small>      
            </div>
            <ul className="trends-list">
                <li><a href="#">#Hongkong</a></li>
                <li><a href="#">#Ruby</a></li>
                <li><a href="#">#foobarbaz</a></li>
                <li><a href="#">#rails</a></li>
                <li><a href="#">#API</a></li>
            </ul>
        </div>
    </div>
);

class TweetBox extends React.Component {
    constructor(props) {
        super(props);

        this.postTweet = this.postTweet.bind(this);
    }

    postTweet(e) {
        e.preventDefault();
        console.log('hoooo');
        const message = $('.post-input').val();
        const currentUser = this.props.currentUser;
        const getTweetsAndPost = this.props.getTweetsAndPost;
        requests.postTweet(message, result => {
            if (result.success) {
                $('.post-input').val('');
                getTweetsAndPost();
                charCount();
                requests.getUserTweets(currentUser, function (response) {
                    $('.user-stats-tweets').text(response.length);
                });
            } else {
                alert('Something went wrong while posting your tweet.');
                console.log(result.reason);
            }
        });
    }

    render() {
        const placeholder = `What's happening, ${this.props.currentUser}?`;
        return (
            <div className="col-xs-12 post-tweet-box">
                <textarea type="text" className="form-control post-input" rows="3" placeholder={placeholder} onKeyUp={charCount}></textarea>
                <div className="pull-right">
                    <span className="post-char-counter">140</span>
                    <button className="btn btn-primary" id="post-tweet-btn" onClick={this.postTweet}>Tweet</button>
                </div>
            </div>
        );
    }
}

class Tweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: props.currentUser,
            tweet: props.tweet
        };

        this.deleteOneTweet = this.deleteOneTweet.bind(this);
    }

    deleteOneTweet(e) {
        e.preventDefault();
        const tweetID = this.state.tweet.id;
        requests.deleteOneTweet(tweetID, this.props.getTweetsAndPost);
    }

    render() {
        const tweet = this.state.tweet;
        const userURL = `/${tweet.username}`;

        let image = null;
        if (tweet.image != null) {
            image = <img src={tweet.image} />;
        }

        let deleteButton = null;
        if (this.state.currentUser === tweet.username) {
            deleteButton = <a className="delete-tweet" onClick={this.deleteOneTweet}>Delete</a>;
        }
        return (
            <div className="tweet col-xs-12">
                <a className="tweet-username" href={userURL}>@{tweet.username}</a>
                <p>{tweet.message}</p>
                {image}
                {deleteButton}
            </div>
        );
    }
}

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isLoaded: false,
            error: null,
            tweets: []
        };

        this.authenticateResponse = this.authenticateResponse.bind(this);
        this.getTweetsAndPost = this.getTweetsAndPost.bind(this);
        this.updateTweets = this.updateTweets.bind(this);
    }

    authenticateResponse(response) {
        console.log('authenticate response', response.authenticated);
        if (response.authenticated) {
            const currentUser = response.username;
            this.setState({
                error: null,
                isLoaded: true,
                currentUser: currentUser
            });
            //$('#user-icon').text(currentUser);
            //profileCardChanger(currentUser);
            requests.getUserTweets(currentUser, tweets => {
                $('.user-stats-tweets').text(tweets.length);
            });
        } else {
            window.location.replace('/');
        }
    }

    getTweetsAndPost() {
        requests.getAllTweets(this.updateTweets);
    }

    updateTweets(tweets) {
        this.setState({
            error: null,
            isLoaded: true,
            tweets: tweets
        });
    }

    componentDidMount() {
        requests.authenticate(this.authenticateResponse, console.log);
        let username = window.location.pathname;
        if (username) {
            if (username.startsWith('/')) {
                username = username.substring(1);
            }
            if (username === 'feeds') {
                requests.getAllTweets(this.updateTweets);
            } else {
                requests.getUserTweets(username, this.updateTweets);
            }
        } else {
            requests.getAllTweets(this.updateTweets);
        }
    }

    render() {
        if (this.state.error) {
            return <div>Error: {error.reason}</div>;
        }
        if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <NavBar getTweetsAndPost={this.getTweetsAndPost} updateTweets={this.updateTweets} username={this.state.currentUser} />
                <div className="main container">
                    <div className="row">
                        <div className="col-xs-3 profile-trends">
                            <ProfileCard username={this.state.currentUser} />
                            <Trends />
                        </div>
                        <div className="col-xs-6 feed-box">
                            <TweetBox currentUser={this.state.currentUser} getTweetsAndPost={this.getTweetsAndPost} />
                            <div className="feed">
                                {this.state.tweets.map(tweet => (
                                    <Tweet key={tweet.id} tweet={tweet} currentUser={this.state.currentUser} getTweetsAndPost={this.getTweetsAndPost} />
                                ))}
                            </div>
                        </div>
                        <div className="col-xs-3 follow-suggest">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Feed
