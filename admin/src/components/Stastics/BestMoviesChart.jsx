import Loading from '../Loading';
import GraphChart from './GraphChart';

import { useBestMovies } from '../../hooks/useMovie';
import { getBestMoviesGraphData } from '../../lib/getGraphData';

const BestMoviesChart = () => {
  const { isLoading, data } = useBestMovies('Single');
  const graphData = getBestMoviesGraphData(data);

  return (
    <div className="flex flex-col gap-8 overflow-x-auto bg-gray-50 rounded-md p-8 shadow-sm">
      <header className="text-[1.6rem] font-bold lg:text-3xl">
        Top 10 best streamed movies
      </header>
      {isLoading ? (
        <Loading className="grid place-content-center" />
      ) : (
        <GraphChart data={graphData} />
      )}
    </div>
  );
};

export default BestMoviesChart;
