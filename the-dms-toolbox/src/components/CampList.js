import React from 'react';
import { Link } from 'react-router-dom';

export default function CampList(props) {
    
    return (
        <div>
            <h1> Your Campaigns!</h1>
            {props.camps.map((camp) => {
                return (
                  <div key={camp.id}>
                    <Link to={`/dm/${camp.id}`}>{camp.name}</Link>
                  </div>
                );
            })}
        </div>
    )
}
