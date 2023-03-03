import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { buy_state, sell_state } from "../state/actions/exchange";
// import { portfolio_update } from "../state/actions/portfolio";

import "./Exchange.css";

function Exchange() {

  const isDark = useSelector((state) => state.themereducer);
  // const portfolio = useSelector((state) => state.portfolio_reducer);
  const sell = useSelector((state) => state.sell_reducer);
  const buy = useSelector((state) => state.buy_reducer);
  const buyList = useSelector((state) => state.marketCap);
  const sellList=useSelector((state)=> state.marketCap)
  const dispatch = useDispatch();

  const [text, setText]=useState("")
  const [output, setOutput]=useState(0)

  

  const convert=()=>{

    let result =( buy_state / sell_state)*text;
  
    setOutput(result)
  }

  return (
    <>
      <div
        className={`flex flex-col h-full w-full rounded-lg ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        } p-4 gap-2`}
      >
        <div className="text-xl font-bold">Exchange Coins</div>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="w-[55%]"></div>
            <div className="h-full w-fit">
              <div className="w-full h-full text-black-100 text-sm">
                  Enter Amount:
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <h4 className="text-orange-600 font-semibold text-xl h-fit my-auto w-[25%] justify-center pl-[10%]">
              Sell
            </h4>
            <div className="flex w-[30%]">
              <select
                name="currency"
                className="bg-slate-200 w-36 h-8 text-center text-lg font-semibold rounded-md list-item"
                value={sell}
                onChange={(event) => dispatch(sell_state(event.target.value))}
              >
                <option value="" selected="true" hidden>
                  Select
                </option>
                {sellList.map(({ name }) =>
                buy !==name && (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-full w-fit mx-2">
              <input
                type="number"
                min="0"
                value={text ||""}
                onChange={(e)=>setText(e.target.value)}
                disabled={sell === "Select"}
                placeholder={
                  sell === "Select"
                    ? "Select to Sell"
                    : "Avl Bal :" +
                      sellList.find((data) => data.name === sell)
                }
                className="w-full h-full rounded-md border-2 pl-3"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <h4 className="text-green-600 font-semibold text-xl h-fit my-auto w-[25%] justify-center pl-[10%]">
              Buy
            </h4>
            <div className="flex w-[30%]">
              <select
                name="currency"
                className="bg-slate-200 w-36 h-8 text-center text-lg font-semibold rounded-md list-item"
                value={buy}
                onChange={(event) => dispatch(buy_state(event.target.value))}  
              >
                {/* <option>INR</option>
                <option>USD</option> */}
                <option value="" selected="true" hidden>
                  Select
                </option>
                {buyList.map(
                  ({ name }) =>
                    sell !== name && (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    )
                )}
              </select>
            </div>
            <div className="h-full w-fit">
              <div className="w-full h-full text-green-400 mx-2">{parseFloat(output).toFixed(1)}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center h-full items-center">
          <button
            className="hover:scale-105 duration-300 bg-gradient-to-tr from-cyan-400 to-blue-600 via-cyan-500 rounded-lg text-lg font-bold h-12 w-32"
            // onClick={()=>dispatch(portfolio_update({name:buy,amount:5}))}
            onClick={()=>convert()}
          >
            Exchange
          </button>
        </div>
      </div>
    </>
  );
}
export default Exchange;
