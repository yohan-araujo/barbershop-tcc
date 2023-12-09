import LineChartFaturamento from './LineChartFaturamento';
import PieChartFP from './PieChartFP';
import PieChartTS from './PieChartTS';

const Dashboard = () => {
  return (
    <div className="flex justify-center bg-black min-h-screen">
      <div className="w-2/3 h-[72rem] bg-[#1D1D1D]">
        <div className="flex justify-center my-12 ">
          <span className="text-[#E29C31] text-5xl font-merriweather uppercase">
            Dashboard
          </span>
        </div>
        <div className="grid grid-cols-2">
          <div className="">
            <PieChartFP />
          </div>
          <div>
            <PieChartTS />
          </div>
        </div>
        <div className="flex flex-col text-center mt-12">
          <span className="text-[#E29C31] text-5xl font-merriweather uppercase">
            Faturamento
          </span>
          <div className="my-12">
            {' '}
            <LineChartFaturamento />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
