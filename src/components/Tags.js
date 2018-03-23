import * as React from 'react';
import {connect} from 'react-redux';

const TAGS = [
    {title: 'Каньоны', slug: 'kanony'},
    {title: 'Леса', slug: 'les'},
    {title: 'Пещеры', slug: 'peschery'},
    {title: 'Природа Европы', slug: 'priroda-evropy'},
    {title: 'Природа Азии', slug: 'priroda-azii'}
];

const stateToProps = (state) => ({
    current: state.tags.current
});

export const Tags = connect(stateToProps)(
    function Tags({current, dispatch}) {
        return (
            <div className="tags">
                <div className="tags__scroll">
                    <div className="tags__wrap">
                        {TAGS.map(({title, slug}, index) => (
                            <button
                                key={slug}
                                className={`tag tag_color_${index % 5} ${slug === current ? 'tag_active' : ''}`}
                                onClick={() => dispatch({
                                    type: 'SET_TAG',
                                    tag: slug
                                })}
                            >
                                {title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
);

