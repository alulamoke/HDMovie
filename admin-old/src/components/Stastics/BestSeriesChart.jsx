import Loading from '../Loading';
import GraphChart from './GraphChart';

import { useBestSeries } from '../../hooks/useMovie';
import { getBestSeriesGraphData } from '../../lib/getGraphData';

const BestSeriesChart = () => {
  const { isLoading, data } = useBestSeries('Series');
  const graphData = getBestSeriesGraphData(data);

  return (
    <div className="flex flex-col gap-8 overflow-x-auto bg-gray-50 rounded-md p-8 shadow-sm">
      <header className="text-[1.6rem] font-bold lg:text-3xl">
        Top 10 best streamed series
      </header>
      {isLoading ? (
        <Loading className="grid place-content-center" />
      ) : (
        <GraphChart data={graphData} />
      )}
    </div>
  );
};

export default BestSeriesChart;
