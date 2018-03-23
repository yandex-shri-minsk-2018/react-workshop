export function fetchNext({tag}) {
    return async function (dispatch, getState) {
        dispatch({
            type: 'FEED_LOADING',
            loading: true
        });

        try {
            // Loading

            let next = getState().feed.next;

            let params = Object.keys(next)
                .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(next[key])}`)
                .join('&');

            let response = await fetch(`/collections/api/cards/channels/${encodeURIComponent(tag)}/?${params}`, {credentials: 'same-origin'});
            let json = await response.json();

            dispatch({
                type: 'FEED_APPEND_CARDS',
                cards: json.results,
                next: json.next
            });
        } catch (error) {
            dispatch({
                type: 'FEED_ERROR',
                error
            });
        } finally {
            dispatch({
                type: 'FEED_LOADING',
                loading: false
            });
        }

    };
}
