import React, { Component } from "react";
import Window from "./Window";

export default class Windows extends Component {
  constructor() {
    super()

    this.state = {
      windowOntop: 2
    };
  }

  handleClick(index) {
    this.setState({
      windowOntop: index
    })
  }

  render() {
    return (
      <div className="windows">
        <Window
          left
          onTop={this.state.windowOntop === 1 ? true : false}
          onClick={() => {
            this.handleClick(1)
          }}
        >
          <p>
            $&gt;&nbsp;cd&nbsp;/users/<wbr />>eddietindame/<wbr />__PROJECTS__/<wbr />Stinger
          </p>
          <p>
            $&gt;&nbsp;I am creating a cross-platform mobile app using React
            Native for my final university project.
          </p>
          <p>
            $&gt;&nbsp;[URL](src="<wbr />
            <a href="https://github.com/eddietindame/Stinger" target="_blank">
              https://github.com/eddietindame/Stinger
            </a>
            <wbr />")
          </p>
          <p>
            $&gt; This will be a social experience based around tea / coffee
            rounds
          </p>
          <p>$&gt; Currently in progress</p>
        </Window>
        <Window
          centre
          onTop={this.state.windowOntop === 2 ? true : false}
          onClick={() => {
            this.handleClick(2)
          }}
        >
          <p>
            $&gt;&nbsp;cd&nbsp;/users/<wbr />eddietindame/<wbr />__LIL-LINK-69__
          </p>
          <p>
            $&gt;&nbsp;A simple url shortener powered by the{" "}
            <a href="http://mern.io" target="_blank">
              MERN
            </a>&nbsp;stack.
          </p>
          <p>
            $&gt;&nbsp;[URL](src="<wbr />
            <a href="https://lil-link-69.herokuapp.com" target="_blank">
              https://lil-link-69.herokuapp.com
            </a>
            <wbr />")
          </p>
          <p>
            $&gt;&nbsp;[URL](src="<wbr />
            <a href="https://github.com/eddietindame/lil-link-69" target="_blank">
              https://github.com/eddietindame/lil-link-69
            </a>
            <wbr />")
          </p>
          <p className="u-hide">
            $&gt;&nbsp;Click the windows{" "}
            <span className="u-red">beside this one </span>for my other latest
            projects.
          </p>
          <p>$&gt;&nbsp;_</p>
        </Window>
        <Window
          right
          onTop={this.state.windowOntop === 3 ? true : false}
          onClick={() => {
            this.handleClick(3)
          }}
        >
          <p>
            $&gt;&nbsp;cd&nbsp;/users/<wbr />eddietindame/<wbr />__PROJECTS__/<wbr />TwitchStreamsList
          </p>
          <p>
            $&gt;&nbsp;I'm teaching myself React by building an interface for
            Twitch.tv. This web-app will let you see when your favorite
            streamers are online; it will have filtering options and different
            view layouts.
          </p>
          <p>
            $&gt;&nbsp;[URL](src="<wbr />
            <a href="https://github.com/eddietindame/twitch-streams" target="_blank">
              https://github.com/eddietindame/twitch-streams
            </a>
            <wbr />")
          </p>
          <p>$&gt;&nbsp;Still in early stages, watch this space_</p>
        </Window>
      </div>
    );
  }
}
