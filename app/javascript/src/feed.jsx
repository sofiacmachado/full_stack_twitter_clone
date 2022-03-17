import React from 'react'
import ReactDOM from 'react-dom'

import './feed.scss';

const Home = props => (
  <div>
    <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
        <a class="navbar-brand" href="#">
            <i class="fa fa-twitter"></i>
        </a>
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
            <input type="text" class="form-control search-input" placeholder="Search for..."></input>
            <span class="input-group-btn">
            <button class="btn btn-default search-btn" type="button">Go!</button>
            </span>
        </div>
        </div>
    </div>
    </nav>
    <div class="main container">
    <div class="row">
        <div class="col-xs-3 profile-trends">
        <div class="profileCard col-xs-12">
            <div class="profileCard-content">
            <div class="user-field col-xs-12">
                <a class="username" href="#">User</a><br></br>
                <a class="screenName" href="#">@User</a>
            </div>
            <div class="user-stats">
                <div class="col-xs-3">
                <a href="">
                    <span>Tweets<br></br></span>
                    <span class="user-stats-tweets">10</span>
                </a>
                </div>
                <div class="col-xs-4">
                <a href="">
                    <span>Following<br></br></span>
                    <span class="user-stats-following">0</span>
                </a>
                </div>
                <div class="col-xs-4">
                <a href="">
                    <span>Followers<br></br></span>
                    <span class="user-stats-followers">0</span>
                </a>
                </div>
            </div>
            </div>
        </div>
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
        </div>
        <div class="col-xs-6 feed-box">
        <div class="col-xs-12 post-tweet-box">
            <textarea type="text" class="form-control post-input" rows="3" placeholder="What's happening?"></textarea>
            <div class="pull-right">
            <span class="post-char-counter">140</span>
            <button class="btn btn-primary" disabled id="post-tweet-btn">Tweet</button>
            </div>
        </div>
        <div class="feed">
            <div class="tweet col-xs-12">
            <a class="tweet-username" href="#">User</a>
            <a class="tweet-screenName" href="#">@User</a>
            <p>This is an amazing tweet</p>
            <a class="delete-tweet" href="#">Delete</a>
            </div>
            <div class="tweet col-xs-12">
            <a class="tweet-username" href="#">User</a>
            <a class="tweet-screenName" href="#">@User</a>
            <p>This is an amazing tweet</p>
            </div>
            <div class="tweet col-xs-12">
            <a class="tweet-username" href="#">User</a>
            <a class="tweet-screenName" href="#">@User</a>
            <p>This is an amazing tweet</p>
            </div>
        </div>
        </div>
        <div class="col-xs-3 follow-suggest">
        </div>
    </div>
    </div>
  </div>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Feed />,
    document.body.appendChild(document.createElement('div')),
  )
})
