import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { Difficulty } from 'config';
import * as root from 'ducks/root';

@connect(state => state)
export default class UIContainer extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.user !== this.props.user;
  }

  onDifficultyChange = e => {
    this.props.dispatch(root.setDifficulty(e.target.value));
  };

  render() {
    return (
      <div>
        <select value={this.props.user.difficulty} onChange={this.onDifficultyChange}>
          <option value={Difficulty.EASY}>Easy</option>
          <option value={Difficulty.NORMAL}>Normal</option>
          <option value={Difficulty.HARD}>Hard</option>
        </select>
        <dl>
          <dt>
            <svg width="24" height="24">
              <use xlink:href="#link" />
            </svg>
            Streak
          </dt>
          <dd>{this.props.user.streak}</dd>

          <td>Best</td>
          <dd>{this.props.user.bests[this.props.user.difficulty]}</dd>
        </dl>
      </div>
    );
  }
}
