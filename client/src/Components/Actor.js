import React from 'react';

function Actor({ actors = [] }) {
    if (!Array.isArray(actors) || actors.length === 0) {
        return <p>No actors found.</p>;
    }

    return (
        <div>
            <h4>Actors:</h4>
            <ul>
                {actors.map((actor, index) => (
                    <li key={index}>{actor}</li>
                ))}
            </ul>
        </div>
    );
}

export default Actor;