import * as React from 'react';

import {Card} from './Card';
import {Infinite} from './Infinite';
import {Tags} from './Tags';

export function Cards({cards, fetchNext}) {
    return (
        <Infinite fetchNext={fetchNext}>
            <Tags />

            <div className="cards">
                {cards.map((card) =>
                    <Card card={card} key={card.id}/>
                )}
            </div>
        </Infinite>
    );
}
