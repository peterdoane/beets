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
    return <div>
      {studios.map((element, index) => {
        return <Link key={index} to={`/Studio/${element.name}`}>
        {`${element.name}`}
        </Link>;
      })};
    </div>;
  }
});

export default Studios;
