import React from 'react';
import { Link } from 'react-router';

const studios =[{
  id: 1,
  name: 'The Red Room'
  },{
  id: 2,
  name: 'Studio 54'
}];

const Studios = React.createClass({
  render() {
    return <div className="card studios">
      <div className="card-content">
        <span className="card-title">Enter a Studio</span>
        <div>
          <ul>
            {studios.map((element, index) => {
              return <li key={index}>
                <Link key={index} to={`/Studio/${element.name}`}>
                  {`${element.name}`}
                </Link>
              </li>
            })}
          </ul>
        </div>
      </div>
    </div>;
  }
});

export default Studios;
