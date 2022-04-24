import React from 'react'
import ReactDOM from 'react-dom'

import './Feed.scss';

const NavBar = props => (
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="#"><i class="fa fa-twitter"></i></a>
            </div>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span id="user-icon">User</span></a>
                    <ul class="dropdown-menu row" role="menu">
                        <li ><a href="#" class="username">User</a></li>
                        <li role="presentation" class="divider"></li>
                        <li ><a href="#">Lists</a></li>
                        <li role="presentation" class="divider"></li>
                        <li ><a href="#">Help</a></li>
                        <li ><a href="#">Keyboard shortcuts</a></li>
                        <li role="presentation" class="divider"></li>
                        <li ><a href="#">Settings</a></li>
                        <li ><a id="log-out" href="#">Log out</a></li>
                    </ul>
                </li>
            </ul>
            <div class="search-bar col-xs-3 nav navbar-right">
                <div class="input-group">
                    <input type="text" class="form-control search-input" placeholder="Search for..." />
                    <span class="input-group-btn">
                        <button class="btn btn-default search-btn" type="button">Go!</button>
                    </span>
                </div>
            </div>
        </div>
    </nav>
);

const ProfileCard = props => (
    <div class="profileCard col-xs-12">
        <div class="profileCard-content">
            <div class="user-field col-xs-12">
                <a class="username" href="#">User</a><br/>
                <a class="screenName" href="#">@User</a>
            </div>
            <div class="user-stats">
                <div class="col-xs-3">
                    <a href="">
                        <span>Tweets</span><br/>
                        <span class="user-stats-tweets">10</span>
                    </a>
                </div>
                <div class="col-xs-4">
                    <a href="">
                        <span>Following</span><br/>
                        <span class="user-stats-following">0</span>
                    </a>
                </div>
                <div class="col-xs-4">
                    <a href="">
                        <span>Followers</span><br/>
                        <span class="user-stats-followers">0</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
);

const Trends = props => (
    <div class="trends col-xs-12">
        <div class="col-xs-12">
            <div class="trends-header">
                <span>Trends</span><span> &#183; </span><small><a href="">Change</a></small>      
            </div>
            <ul class="trends-list">
                <li><a href="#">#Hongkong</a></li>
                <li><a href="#">#Ruby</a></li>
                <li><a href="#">#foobarbaz</a></li>
                <li><a href="#">#rails</a></li>
                <li><a href="#">#API</a></li>
            </ul>
        </div>
    </div>
);

const TweetBox = props => (
    <div class="col-xs-12 post-tweet-box">
        <textarea type="text" class="form-control post-input" rows="3" placeholder="What's happening, <%= @myself %>?"></textarea>
        <div class="pull-right">
            <span class="post-char-counter">140</span>
            <button class="btn btn-primary" id="post-tweet-btn">Tweet</button>
        </div>
    </div>
);

function Tweet(props) {
    const username = props.tweet.username;
    const userURL = `/${username}`;
    let image = null;
    if (props.tweet.image != null) {
        image = <img src={props.tweet.image} />;
    }
    let deleteButton = null;
    if (props.currentUser === props.tweet.username) {
        deleteButton = <a class="delete-tweet" href="#">Delete</a>;
    }
    return (
        <div class="tweet col-xs-12">
            <a class="tweet-username" href={userURL}>@{username}</a>
            <p>{props.tweet.message}</p>
            {image}
            {deleteButton}
        </div>
    );
}

const MainContainer = props => (
    <div class="main container">
        <div class="row">
            <div class="col-xs-3 profile-trends">
                <ProfileCard />
                <Trends />
            </div>
            <div class="col-xs-6 feed-box">
                <TweetBox />
                <div class="feed">
                    {props.tweets.map(tweet => (
                        <Tweet username={tweet.username} message={tweet.message} image={tweet.image} currentUser={props.currentUser} />
                    ))}
                </div>
            </div>
            <div class="col-xs-3 follow-suggest">
            </div>
        </div>
    </div>
);

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isLoaded: false,
            error: null,
            tweets: []
        };
    }

    componentDidMount() {
        // TODO: ajax
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
                <NavBar />
                <MainContainer tweets={this.state.tweets} currentUser={this.state.currentUser} />
            </div>
        );
    }
}

export default Feed
