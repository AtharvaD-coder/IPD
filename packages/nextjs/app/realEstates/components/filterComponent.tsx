'use client'

import { useDispatch, useSelector } from 'react-redux';
import ToggleButtonSizes from './selectToggle';
import RangeSlider from '~~/components/custom_components/rangeSlider';
import NumberInput from '~~/app/listRealEstate/components/numberInputs';
import { setFilterValues } from '../../redux/actions';
import { RootState } from '../../redux/reducers'; 

interface FilterComponentProps {}

const function FilterComponent: React.FC<FilterComponentProps> = () => {
  const dispatch = useDispatch();
  const filterValues = useSelector((state: RootState) => state.filterValues);

  const handleFilterChange = (keyValue: string, value: any) => {
    dispatch(setFilterValues({ ...filterValues, [keyValue]: value }));
  };

  return (
    <div className="w-[20vw] h-[85vh] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      <div className="horizontal-1 p-3">
        <div className="text-sm">Purpose :</div>
        <ToggleButtonSizes
          keyValue={'purpose'}
          setFilterValues={handleFilterChange}
          filterValues={filterValues}
          options={[{ text: 'Buy', value: 'for-sale' }, { text: 'Rent', value: 'for-rent' }]}
        />
      </div>
      <div className="horizontal-1 p-3 ">
        <div className="text-sm">Property Type :</div>
        <ToggleButtonSizes
          keyValue={'type'}
          setFilterValues={handleFilterChange}
          filterValues={filterValues}
          options={[
            { value: 'house', text: 'House' },
            { value: 'commercial', text: 'Commercial' },
            { value: 'appartment', text: 'Appartment' },
            { value: 'landplot', text: 'LandPlot' },
          ]}
        />
      </div>
      <div className="horizontal-1 p-3 ">
        <div className="text-sm">Price :</div>
        <RangeSlider value={filterValues.price} SetValue={(value) => handleFilterChange('price', value)} keyValue={'price'} />
      </div>
      <div className="horizontal-1 p-3 ">
        <div className="text-sm">Area :</div>
        <RangeSlider value={filterValues.area} SetValue={(value) => handleFilterChange('area', value)} keyValue={'area'} />
      </div>
      <div className="horizontal-1 p-4 ">
        <NumberInput label={'Minimum Rooms'} labelStyle={'text-sm'} />
      </div>
    </div>
  );
}


export default FilterComponent;














// "use client";

// import ToggleButtonSizes from "./selectToggle";
// import { motion } from "framer-motion";
// import NumberInput from "~~/app/listRealEstate/components/numberInputs";
// import RangeSlider from "~~/components/custom_components/rangeSlider";

// export default function FilterComponent({filterValues,setFilterValues}:any) {

  
//   return (
//     <div className="w-[20vw] h-[85vh] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
//       <div className="horizontal-1 p-3">
//         <div className="text-sm">Purpose :</div>
//         <ToggleButtonSizes keyValue={'purpose'} setFilterValues={setFilterValues} filterValues={filterValues}  options={[{text:"Buy",value:"for-sale"}, {text:"Rent",value:"for-rent"}]} />
//       </div>
//       <div className="horizontal-1 p-3 ">
//         <div className="text-sm">Property Type :</div>
//         <ToggleButtonSizes keyValue={'type'} setFilterValues={setFilterValues} filterValues={filterValues} options={[{value:"house",text:"House"}, {value:"commercail",text:"Commercial"}, {value:"appartment",text:"Appartment"}, {value:"landplot",text:"LandPlot"}]}  />
//       </div>
//       <div className="horizontal-1 p-3 ">
//         <div className="text-sm">Price :</div>
//         <RangeSlider value={filterValues.price} SetValue={setFilterValues} keyValue={'price'} />
//       </div>
//       <div className="horizontal-1 p-3 ">
//         <div className="text-sm">Area :</div>
//         <RangeSlider value={filterValues.area} SetValue={setFilterValues} keyValue={'area'} />
//       </div>
//       <div className="horizontal-1 p-4 ">
//         <NumberInput label={"Minimum Rooms"} labelStyle={'text-sm'} />
//       </div>
//     </div>
//   );
// }
