/*
TODO:
- something with online ratings
- incorporate category
- better visualization
- click to seek video clip
*/

const setupGraph = (csv) => {
    const traces = {}

    for (const line of csv.split('\n').slice(1)) {
        const [episode, category, flavor, rhett, link] = line.split(',');
        const traceIdentifier = episode;
        if (typeof traces[traceIdentifier] === 'undefined') { // Make new trace
            traces[traceIdentifier] = {
                x: [], y: [],
                name: traceIdentifier,
                mode: 'markers',
                marker: { size: 12 },
                text: []
            };
        }
        traces[traceIdentifier].x.push(rhett);
        traces[traceIdentifier].y.push(link);
        traces[traceIdentifier].text.push(flavor);
    }

    const layout = {
        margin: { t: 10 },
        hovermode: 'closest',
        xaxis: { range: [0, 100], title: 'Rhett' },
        yaxis: { range: [0, 100], title: 'Link' }
    };

    Plotly.newPlot('graph', Object.values(traces), layout)
}

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQRLkTktY3C5H9kunrWfk3fNhLoN1VdzdmzHWszvW29yww1HNMtsbLttwmmBT7_uHO3ufP_v12s_A9T/pub?gid=0&single=true&output=csv'
axios.get(url).then((response) => {
    setupGraph(response.data);
});
