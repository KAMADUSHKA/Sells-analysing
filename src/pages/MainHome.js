import React from 'react';
import '../style_sheet/MainHome.css' ;
import axios from 'axios';
import { useState, useEffect } from 'react';
import * as icons from "react-icons/ai";
import { LineChart,PieChart, Line,Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Cell } from 'recharts';
import { IconContext } from 'react-icons';

export default function MainHome() {

    

    // const data = [
    //   { name: 'Jan', value: 4000 },
    //   { name: 'Feb', value: 3000 },
    //   { name: 'Mar', value: 2000 },
    //   { name: 'Apr', value: 2780 },
    //   { name: 'May', value: 1890 },
    //   { name: 'Jun', value: 2390 },
    //   { name: 'Jul', value: 3490 },
    // ];


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1E2D', '#A2D729'];


     const [startDate, setStartDate] = useState('');
     const [endDate, setEndDate] = useState('');
     const [totalProfit,setTotalProfit] = useState(0);
     const [totalSels,setTotalSels] = useState(0);
     const [lineChartDataDates,setLineChartDataDates] =useState([]);
     const [piChartDatavalue,setPiChartDatavalue] =useState([]);

     

     const startDateChange = (e) => {
        setStartDate(e.target.value);
      };
    
      const endDateChange = (e) => {
        setEndDate(e.target.value);
      };



      ////////
      useEffect(() => {
        const url = 'https://rv0kj.wiremockapi.cloud/dashboard?from=2023-04-11&to=2023-05-11';
    
        axios.get(url)
          .then(function(response) {
            
              let profit = 0;
              let sales = 0;
              let dataSeles = response.data.data.dateSales;
              let dataSelesArry = [];
              let dataPlaces = response.data.data.routeList;
              let dataPlaceCount = response.data.data.routeSales;
              
          //     let lineChartDates = dataSeles.map(function(element) {
          //       return element[0]; // extract the date component
          //   })

            let lineChartValue = dataSeles.map(function(element) {
              return element[1]; // extract the date component
          })
          
             
    
              for (let i = 0; i < response.data.data.profit[0].length; i++) {
                profit += response.data.data.profit[0][i];
              }
    
              for (let j = 0; j < response.data.data.dateSales.length; j++) {
                sales += response.data.data.dateSales[j][1];
              }
///lineChart data
              for(let k = 0; k<dataSeles.length; k++){
                let obj1 = { date:dataSeles[k][0], value:dataSeles[k][1]};
                dataSelesArry.push(obj1)
              }

///piChart data
              let piChartData = dataPlaceCount.map(([id, val]) => {
                let obj = dataPlaces.find(o => o.id === id);
                return {name:[obj.route_name], value:val};
              });

              
            



             
              setTotalProfit(profit);
              setTotalSels(sales);
              setLineChartDataDates(dataSelesArry);
              setPiChartDatavalue(piChartData);
            
          })
          .catch(function(error) {
            console.log(error);
          });
      }, []);
      
      console.log(piChartDatavalue)
   

  return (
    <div>
      <IconContext.Provider value={{color:'#fff'}}>
        <div id='navBar'>
            <div id='icon'>
              <icons.AiOutlineMenuUnfold id='icon-icon'/>
            </div>
        </div>
      </IconContext.Provider>
      <br/>
        <form>
            <div id='input-plc'>
                <input type = "date" id='start-date' value={startDate} onChange={startDateChange}  />
                <input type = "date" id='end-date' value={endDate} onChange={endDateChange}/>
                <button id='start-btn' >START</button>
            </div>
        </form>
        <br/>


            <div id='outputs'>
                  <fieldset id='fieldset-selse'>
                      <div>
                        <span>totale seles</span>
                        <icons.AiFillLock />
                      </div>
                      <br/><br/>
                      <span id='selse-output-profit'>LKR {totalSels} </span>
                  </fieldset>
                  

                  <fieldset id='fieldset-profit'>
                      <div>
                        <span>totale profit</span>
                        <icons.AiFillDollarCircle id='totale-profit-icon'/>
                      </div>
                      <br/><br/>
                      <span >LKR {totalProfit} </span>
                  </fieldset>
            </div>



        <br/><br/>



            <div id='chart-aria'>
                <div id='line-chrt-aria'>
                        <span>seles Performance (Seles Rounds to Rs.1000)</span>
                    <LineChart id='line-chart' width={600} height={300} data={lineChartDataDates}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="number" dataKey="value" stroke="#8884d8" />
                        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                        <Tooltip />
                        <Legend />
                    </LineChart>
                </div>
                <div id='pi-chart-aria'>
                      <span>Route Vise Seles</span>
                    <PieChart width={500} height={400}>
                        <Pie
                          data={piChartDatavalue}
                          cx={200}
                          cy={200}
                          innerRadius={90}
                          outerRadius={110}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {
                            piChartDatavalue.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))
                          }
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" align="right" iconSize={18} wrapperStyle={{ lineHeight: '45px' }}  />
                    </PieChart>
                </div>
            </div>


    </div>
  )
}


