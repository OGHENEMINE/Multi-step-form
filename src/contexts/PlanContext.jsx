import React, { createContext, useState } from "react";

export const PlanContext = createContext(null);

export function PlanProvider({ children }) {
   const [plan, setPlan] = useState({
    name: '',
    pricing: []
   })
   const [selectedAddOns, setSelectedAddOns] = useState([])
  return <PlanContext.Provider value={{plan, setPlan, selectedAddOns, setSelectedAddOns}}>{children}</PlanContext.Provider>;
}

export default PlanProvider


