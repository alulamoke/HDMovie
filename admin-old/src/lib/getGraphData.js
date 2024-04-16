export const getBestMoviesGraphData = (bestMovies = []) => {
  const graphData = bestMovies.map((item) => ({
    name: item.title,
    total: parseInt(item.views_count),
  }));

  return graphData;
};

export const getBestSeriesGraphData = (bestSeries = []) => {
  const graphData = bestSeries.map((item) => ({
    name: item.title,
    total: parseInt(item.views_count),
  }));

  return graphData;
};
